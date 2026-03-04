import { Locator, Page } from "@playwright/test"
import { mkdirSync } from "fs"
import { join } from "path"

async function highlightElement(locator: Locator): Promise<void> {
    await locator.evaluate((el) => {
        const htmlEl = el as HTMLElement
        htmlEl.style.border = "4px solid red"
        htmlEl.style.backgroundColor = "yellow"
        htmlEl.style.color = "black"
    })
}

async function removeHighlight(locator: Locator): Promise<void> {
    await locator.evaluate((el) => {
        const htmlEl = el as HTMLElement
        htmlEl.style.border = ""
        htmlEl.style.backgroundColor = ""
        htmlEl.style.color = ""
    })
}

function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

function sanitizeFileName(name: string): string {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9-_]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "")
}

export async function highLightAndScreenshot(
    page: Page,
    locator: Locator,
    testName: string,
    stepName: string,
): Promise<void> {
    try {
        const folderName = sanitizeFileName(testName)
        const screenshotDir = join(__dirname, "..", "screenshot", folderName)
        mkdirSync(screenshotDir, { recursive: true })

        await locator.waitFor({ state: "visible", timeout: 10000 })

        await locator.scrollIntoViewIfNeeded()

        await highlightElement(locator)

        await delay(1000)

        const filePath = join(
            screenshotDir,
            `${sanitizeFileName(stepName)}.png`,
        )

        await page.screenshot({ path: filePath })

        await removeHighlight(locator)
    } catch (error) {
        try {
            await removeHighlight(locator)
        } catch {}

        if (error instanceof Error) {
            throw new Error(
                `Failed to take screenshot for "${testName}/${stepName}": ${error.message}`,
            )
        }
        throw error
    }
}
