// B1: highlight element trên trang web
// B2: chụp ảnh toàn bộ trang (full page) với highlight
// B3: remove highlight sau khi chụp ảnh

import { Locator, Page } from "@playwright/test"
import { mkdirSync } from "fs"
import { join } from "path"

/**
 * Highlight element với border đỏ, background vàng và chữ đen
 */
async function highlightElement(locator: Locator): Promise<void> {
    await locator.evaluate((el) => {
        const htmlEl = el as HTMLElement
        // thêm màu viền: đỏ
        htmlEl.style.border = "4px solid red"
        // thêm màu nền: vàng
        htmlEl.style.backgroundColor = "yellow"
        // Thêm màu chữ: đen
        htmlEl.style.color = "black"
    })
}

/**
 * Remove highlight từ element
 */
async function removeHighlight(locator: Locator): Promise<void> {
    await locator.evaluate((el) => {
        const htmlEl = el as HTMLElement
        htmlEl.style.border = ""
        htmlEl.style.backgroundColor = ""
        htmlEl.style.color = ""
    })
}

/**
 * Delay helper (thay thế waitForTimeout deprecated)
 */
function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Sanitize tên file để tránh ký tự không hợp lệ
 */
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
    // elementOnly = false,
): Promise<void> {
    try {
        const folderName = sanitizeFileName(testName)
        const screenshotDir = join(__dirname, "..", "screenshot", folderName)
        mkdirSync(screenshotDir, { recursive: true })

        await locator.waitFor({ state: "visible", timeout: 10000 })

        // ✅ Scroll element into view (extra safety)
        await locator.scrollIntoViewIfNeeded()

        // Highlight
        await highlightElement(locator)

        // Wait for highlight to render
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
