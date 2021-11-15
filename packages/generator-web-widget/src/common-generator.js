const path = require("path");
const PnpmGenerator = require("./PnpmGenerator");
// const ejs = require("ejs");
const fs = require("fs").promises;
// const chalk = require("chalk");
const validate = require("./validate-naming");

// function getLibraryName(pkgName) {
//   return pkgName
//     .replace(/^@[^/]+\//, '')
//     .split('-')
//     .reduce((previous, part) => previous + part.charAt(0).toUpperCase() + part.slice(1), '');
// }

module.exports = class extends PnpmGenerator {
  constructor(args, opts) {
    super(args, opts);

    this.option("packageManager", {
      type: String,
    });
    // this.option("typescript", {
    //   type: Boolean,
    // });
    // this.option("packageName", {
    //   type: String,
    // });
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
      // {
      //   type: "confirm",
      //   name: "typescript",
      //   message: "Will this project use Typescript?",
      //   default: false,
      //   when: this.options.typescript === undefined,
      // },
      // {
      //   type: "input",
      //   name: "packageName",
      //   message: "Project name",
      //   suffix: " (can use letters, numbers, dash or underscore)",
      //   when: !this.options.packageName,
      //   default: path.basename(this.options.dir),
      //   validate,
      // },
    ]);

    Object.assign(this.options, answers);
  }
  async createPackageJson() {
    const baseDir = this.options.typescript ? "ts" : "js";
    // const packageName = this.options.packageName;
    // const libraryName = getLibraryName(packageName);

    const packageJsonTemplate = await fs.readFile(
      this.templatePath(`${baseDir}/package.json`),
      { encoding: "utf-8" }
    );

    // const packageJson = JSON.parse(packageJsonTemplate);
    // Object.assign(packageJson, {
    //   name: packageName,
    //   libraryName
    // });

    // const ignoreFile = await fs.readFile(
    //   this.templatePath(`${baseDir}/.gitignore`),
    //   { encoding: "utf-8" }
    // );
    // const ignore = ignoreFile.split('\n');

    // this.fs.extendJSON(this.destinationPath("package.json"), packageJson);
    this.fs.copyTpl(
      this.templatePath(baseDir),
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
