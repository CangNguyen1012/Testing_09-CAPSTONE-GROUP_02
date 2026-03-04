# Playwright Test Automation Framework

This repository contains an end-to-end test automation framework built with [Playwright](https://playwright.dev/) and TypeScript. It is designed to test the functionality of the [Cybersoft Demo Application](https://demo4.cybersoft.edu.vn) and serves as a robust template for web UI testing. The framework follows the Page Object Model (POM) design pattern for maintainability and scalability.

## Features

-   **Test Runner**: Uses Playwright for fast, reliable, and capable cross-browser testing.
-   **Language**: Written entirely in TypeScript for type safety and enhanced developer experience.
-   **Design Pattern**: Implements the Page Object Model (POM) to create reusable and maintainable test code.
-   **Data-Driven Testing**: Includes a generic CSV reader utility to easily parameterize tests with external data.
-   **Custom Utilities**: Features a custom screenshot helper that highlights elements before capturing images for clearer, more intuitive failure analysis.
-   **CI/CD Integration**: A pre-configured GitHub Actions workflow automatically runs tests on pushes and pull requests to the `main` branch.
-   **Reporting**: Generates detailed HTML reports with traces, videos, and screenshots for each test run.

## Project Structure

```
.
├── .github/workflows/    # GitHub Actions CI workflow configuration
├── data/                 # Test data files (e.g., CSV files)
├── pages/                # Page Object Model (POM) classes
├── screenshot/           # Directory for custom screenshots (auto-generated)
├── tests/                # Test specification files
├── utils/                # Helper functions and custom utilities
├── package.json          # Project dependencies and npm scripts
└── playwright.config.ts  # Core Playwright configuration
```

## Getting Started

### Prerequisites

You need to have [Node.js](https://nodejs.org/) (version 18 or later) and npm installed on your machine.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/cangnguyen1012/testing_09-capstone-group_02.git
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd testing_09-capstone-group_02
    ```

3.  **Install the required dependencies:**
    ```bash
    npm install
    ```

4.  **Install Playwright's browsers and their dependencies:**
    ```bash
    npx playwright install --with-deps
    ```

### Configuration

The framework uses `dotenv` to manage environment variables. Create a `.env` file in the root of the project to store environment-specific configurations. The primary variable used is `BASE_URL`.

Example `.env` file:
```
BASE_URL="https://demo4.cybersoft.edu.vn"
```

## Running Tests

Several npm scripts are available to execute the tests in different modes.

-   **Run all tests headlessly:**
    ```bash
    npm test
    ```

-   **Run tests with the Playwright UI Mode for an interactive experience:**
    ```bash
    npm run test:ui
    ```

-   **Run tests specifically on the Chromium browser:**
    ```bash
    npm run test:chrome
    ```
-   **Run a specific test suite (e.g., `home.spec.ts`) in headed mode on Chromium:**
    ```bash
    npm run test:home
    ```

-   **Run tests in debug mode:**
    ```bash
    npm run test:debug
    ```

## Viewing the Test Report

After a test run completes, an HTML report is generated in the `playwright-report` directory. You can open it to view detailed results, including traces, videos, and screenshots.

To launch the report locally, run:
```bash
npm run test:report
```

## Core Utilities

### Custom Screenshot (`utils/screenshot.ts`)

The `highLightAndScreenshot` function enhances debugging by visually highlighting a specified element on the page before taking a screenshot. It draws a red border and a yellow background on the element, making it easy to identify in the resulting image. Screenshots are saved to the `screenshot/` directory, organized by test name.

### CSV Reader (`utils/csvReader.ts`)

The `readCsvFile` function provides a generic way to read and parse data from CSV files located in the `data/` directory. This utility is ideal for implementing data-driven tests, allowing you to separate test logic from test data.

## Continuous Integration

This project is configured with a GitHub Actions workflow defined in `.github/workflows/playwright.yml`. The workflow automatically triggers on every push or pull request to the `main` and `master` branches.

The CI pipeline performs the following steps:
1.  Checks out the source code.
2.  Sets up Node.js v18.
3.  Installs all project dependencies from `package.json`.
4.  Installs the necessary Playwright browsers.
5.  Executes the entire test suite.
6.  Uploads the generated `playwright-report` as a workflow artifact, which can be downloaded for 30 days for detailed analysis.
