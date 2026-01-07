#!/usr/bin/env node
// Run ESLint programmatically on a small set of files to avoid triggering npm lifecycle scripts.
// ASSISTANT_FINAL: true
const { ESLint } = require("eslint");

async function run() {
  const files = [
    "src/lib/categoryData.ts",
    "src/app/vendor/add-service/page.tsx",
    "monjaz120/src/app/vendor/add-service/page.tsx",
  ];

  const eslint = new ESLint({ fix: true });

  try {
    const results = await eslint.lintFiles(files);
    await ESLint.outputFixes(results);

    const formatter = await eslint.loadFormatter("stylish");
    const resultText = formatter.format(results);

    if (resultText) {
      console.log(resultText);
    } else {
      console.log("ESLint: no issues found or all fixed.");
    }
  } catch (err) {
    console.error("ESLint run failed:", err);
    process.exitCode = 2;
  }
}

run();
