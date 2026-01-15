import { readFile } from "fs/promises";
import { join } from "path";
import { parse } from "csv-parse/sync";
import { Options } from "csv-parse";

// Định nghĩa dữ liệu cócó trong file csv
// export interface LoginData {
//   username: string;
//   password: string;
//   expected_result: string;
//   description: string;
// }

/**
 * Default CSV parse options
 */
const defaultParseOptions: Options = {
  columns: true, // lấy dòng đầu làm header, làm key
  skip_empty_lines: true, // bỏ qua những line data bị trống
  trim: true, // bỏ khoảng trắng thừa
};

/**
 * Generic function to read and parse CSV files
 * @param filePath - Path to the CSV file (can be relative or absolute)
 * @param parseOptions - Optional CSV parsing options (defaults to standard options)
 * @returns Promise that resolves to an array of parsed CSV data
 * @throws Error if file cannot be read or parsed
 */
export async function readCsvFile<T = Record<string, string>>(
  filePath: string,
  parseOptions?: Options
): Promise<T[]> {
  try {
    // B1: Resolve file path (handle both relative and absolute paths)
    const resolvedPath =
      filePath.startsWith("/") || filePath.match(/^[A-Z]:/i)
        ? filePath
        : join(__dirname, "..", filePath);

    // B2: Read file asynchronously
    const fileContent = await readFile(resolvedPath, "utf-8");

    // B3: Parse CSV data
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

/**
 * Synchronous version of readCsvFile (for backward compatibility)
 * @param filePath - Path to the CSV file
 * @param parseOptions - Optional CSV parsing options
 * @returns Array of parsed CSV data
 */
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

// /**
//  * Convenience function for reading login data CSV (backward compatibility)
//  * @param filePath - Optional path to login data CSV (defaults to "data/login-data.csv")
//  * @returns Promise that resolves to LoginData array
//  */
// export async function readLoginDataFromCsv(
//   filePath: string = "data/login-data.csv"
// ): Promise<LoginData[]> {
//   return readCsvFile<LoginData>(filePath);
// }

// /**
//  * Synchronous convenience function for reading login data CSV (backward compatibility)
//  * @param filePath - Optional path to login data CSV (defaults to "data/login-data.csv")
//  * @returns LoginData array
//  */
// export function readFileFromCsv(
//   filePath: string = "data/login-data.csv"
// ): LoginData[] {
//   return readCsvFileSync<LoginData>(filePath);
// }
