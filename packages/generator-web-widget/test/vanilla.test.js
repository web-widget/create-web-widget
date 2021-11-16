const generator = require("../src/generator-web-widget");
const helpers = require("yeoman-test");

describe("generator-web-widget-vanilla", () => {
  const runGenerator = (prompts) =>
    helpers
      .create(generator)
      .withOptions({
        framework: "vanilla",
        skipInstall: true,
      })
      .withPrompts({
        packageManager: "npm",
        projectName: "vanilla-project",
        ...prompts,
      })
      .run();

  it("handles yarn option properly", async () => {
    const runResult = await runGenerator({
      packageManager: "yarn",
    });

    runResult.assertFile("package.json");
  });

  it("handles npm option properly", async () => {
    const runResult = await runGenerator();

    runResult.assertFile("package.json");
  });

  it("handles pnpm option properly", async () => {
    const runResult = await runGenerator({
      packageManager: "pnpm",
    });

    runResult.assertFile("package.json");
  });
});
