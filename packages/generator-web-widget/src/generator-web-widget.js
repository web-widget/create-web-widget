const path = require("path");
const Generator = require("yeoman-generator");

// https://github.com/yeoman/generator/releases/tag/v5.0.0
Object.assign(
  Generator.prototype,
  require("yeoman-generator/lib/actions/install")
);

const generators = {
  vanilla: "./vanilla/index.js",
  lit: "./lit/index.js",
  react: "./react/index.js",
  vue: "./vue/index.js",
  util: "./util/index.js",
  router: "./router/index.js",
};

const versionUpdateCheck = require("./version-update-check");
const { version } = require("../package.json");

module.exports = class WebWidgetGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.option("dir", {
      type: String,
    });

    this.option("type", {
      type: String,
    });

    this.option("framework", {
      type: String,
    });

    this.option("skipInstall", {
      type: Boolean,
    });

    if (args.length > 0 && !this.options.dir) {
      this.options.dir = args[0];
    }

    Object.keys(this.options).forEach((optionKey) => {
      if (this.options[optionKey] === "false") this.options[optionKey] = false;
    });
  }

  initializing() {
    const { stdout } = this.spawnCommandSync(
      "npm",
      ["view", "@web-widget/create@latest", "version"],
      { stdio: "pipe" }
    );

    const remoteVersion =
      stdout && stdout.toString && stdout.toString("utf8").trim();

    if (remoteVersion) versionUpdateCheck(version, remoteVersion);
  }

  async chooseDestinationDir() {
    if (!this.options.dir) {
      const response = await this.prompt([
        {
          type: "input",
          name: "dir",
          message: "Directory for new project",
          default: ".",
        },
      ]);

      this.options.dir = response.dir;
    }
  }

  async composeChildGenerator() {
    const options = this.options;

    if (!options.type) {
      // options.type = (
      //   await this.prompt([
      //     {
      //       type: "list",
      //       name: "type",
      //       message: "Select type to generate",
      //       choices: [
      //         { name: "Application", value: "application" },
      //         {
      //           name: "Utility: in-browser utility module (styleguide, api cache, etc)",
      //           value: "util",
      //         },
      //         { name: "Root router config", value: "router" },
      //       ],
      //     },
      //   ])
      // ).type;
      options.type = "application";
    }

    if (options.type !== "application") {
      options.framework = options.type;
    }

    if (!options.framework) {
      options.framework = (
        await this.prompt([
          {
            type: "list",
            name: "framework",
            message: "Which framework do you want to use?",
            choices: ["vanilla", "lit", "vue", "react"],
          },
        ])
      ).framework;
    }

    if (this.options.dir) {
      const root = path.isAbsolute(this.options.dir)
        ? this.options.dir
        : path.resolve(process.cwd(), this.options.dir);
      this.destinationRoot(root);
    }

    this.composeWith(
      {
        Generator: require(generators[options.framework]),
        path: require.resolve(generators[options.framework]),
      },
      options
    );
  }
};
