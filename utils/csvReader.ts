import { readFile } from "fs/promises";
import { join } from "path";
import { parse } from "csv-parse/sync";
import { Options } from "csv-parse";


const defaultParseOptions: Options = {
  columns: true,
  skip_empty_lines: true,
  trim: true, 
};

export async function readCsvFile<T = Record<string, string>>(
  filePath: string,
  parseOptions?: Options
): Promise<T[]> {
  try {
    const resolvedPath =
      filePath.startsWith("/") || filePath.match(/^[A-Z]:/i)
        ? filePath
        : join(__dirname, "..", filePath);

    const fileContent = await readFile(resolvedPath, "utf-8");

    const data = parse(fileContent, {
      ...defaultParseOptions,
      ...parseOptions,
    }) as T[];

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `Failed to read CSV file "${filePath}": ${error.message}`
      );
    }
    throw error;
  }
}

export function readCsvFileSync<T = Record<string, string>>(
  filePath: string,
  parseOptions?: Options
): T[] {
  const { readFileSync } = require("fs");
  const resolvedPath =
    filePath.startsWith("/") || filePath.match(/^[A-Z]:/i)
      ? filePath
      : join(__dirname, "..", filePath);

  try {
    const fileContent = readFileSync(resolvedPath, "utf-8");
    const data = parse(fileContent, {
      ...defaultParseOptions,
      ...parseOptions,
    }) as T[];

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `Failed to read CSV file "${filePath}": ${error.message}`
      );
    }
    throw error;
  }
}

