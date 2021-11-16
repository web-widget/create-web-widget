const path = require("path");
const PnpmGenerator = require("./PnpmGenerator");
const ejs = require("ejs");
const fs = require("fs").promises;
const chalk = require("chalk");
const validate = require("./validate-naming");

function getLibraryName(pkgName) {
  return pkgName
    .replace(/^@[^/]+\//, "")
    .split("-")
    .reduce(
      (previous, part) =>
        previous + part.charAt(0).toUpperCase() + part.slice(1),
      ""
    );
}

module.exports = class extends PnpmGenerator {
  constructor(args, opts) {
    super(args, opts);

    this.option("packageManager", {
      type: String,
    });
    this.option("typescript", {
      type: Boolean,
    });
    this.option("packageName", {
      type: String,
    });
  }

  async getOptions() {
    const answers = await this.prompt([
      {
        type: "list",
        name: "packageManager",
        message: "Which package manager do you want to use?",
        choices: ["yarn", "npm", "pnpm"],
        when: !this.options.packageManager,
      },
      {
        type: "list",
        name: "typescript",
        message: "Will this project use Typescript?",
        choices: [
          {
            name: "No",
            value: false,
          },
          {
            name: "Yes",
            value: true,
          },
        ],
        default: false,
        when: this.options.typescript === undefined,
      },
      {
        type: "input",
        name: "packageName",
        message: "Project name",
        suffix: " (can use letters, numbers, dash or underscore)",
        when: !this.options.packageName,
        default: path.basename(this.options.dir),
        validate,
      },
    ]);

    Object.assign(this.options, answers);
  }

  async createPackageJson() {
    const langType = this.options.typescript ? "ts" : "js";
    const baseDir = langType;
    const packageName = this.options.packageName;
    const commonTemplates = path.resolve(__dirname, "./common-templates");

    const commonPackageJsonTemplate = await fs.readFile(
      `${commonTemplates}/package.json`,
      { encoding: "utf-8" }
    );
    const packageJsonTemplate = await fs.readFile(
      this.templatePath(`${baseDir}/package.json`),
      { encoding: "utf-8" }
    );

    this.fs.extendJSON(this.destinationPath("package.json"), {
      ...JSON.parse(commonPackageJsonTemplate),
      ...JSON.parse(packageJsonTemplate),
      name: packageName,
      source: `src/main.${langType}`,
    });

    this.fs.copyTpl(
      this.templatePath(`${commonTemplates}/.gitignore.ejs`),
      this.destinationPath(`.gitignore`),
      this.options
    );

    this.fs.copyTpl(
      this.templatePath(`${commonTemplates}/vite.config.js.ejs`),
      this.destinationPath(`vite.config.${langType}`),
      this.options
    );

    this.fs.copyTpl(
      this.templatePath(`${commonTemplates}/index.html.ejs`),
      this.destinationPath(`index.html`),
      this.options
    );

    this.fs.copyTpl(
      this.templatePath(`${baseDir}/static/`),
      this.destinationPath(`./`),
      this.options
    );
  }

  install() {
    if (!this.skipInstall) {
      this.installDependencies({
        npm: this.options.packageManager === "npm",
        yarn: this.options.packageManager === "yarn",
        pnpm: this.options.packageManager === "pnpm",
        bower: false,
      });
    }
  }
};
