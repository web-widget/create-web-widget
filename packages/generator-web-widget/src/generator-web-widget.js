const path = require("path");
const Generator = require("yeoman-generator");

// https://github.com/yeoman/generator/releases/tag/v5.0.0
Object.assign(
  Generator.prototype,
  require("yeoman-generator/lib/actions/install")
);

const WebWidgetReactGenerator = require("./react/generator-web-widget-react");
const WebWidgetRootConfigGenerator = require("./root-config/generator-root-config");
const WebWidgetVueGenerator = require("./vue/generator-web-widget-vue");
const WebWidgetAngularGenerator = require("./angular/generator-web-widget-angular");
const WebWidgetUtilModuleGenerator = require("./util-module/generator-web-widget-util-module");
const WebWidgetSvelteGenerator = require("./svelte/generator-web-widget-svelte");
const versionUpdateCheck = require("./version-update-check");
const { version } = require("../package.json");
const ReactUtilModuleGenerator = require("./util-module/generator-react-util-module");

module.exports = class WebWidgetGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.option("dir", {
      type: String,
    });

    this.option("framework", {
      type: String,
    });

    this.option("moduleType", {
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
      ["view", "create-web-widget@latest", "version"],
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
    let moduleType = this.options.moduleType;

    if (!moduleType && this.options.framework) {
      moduleType = "app-parcel";
    }

    if (!moduleType) {
      moduleType = (
        await this.prompt([
          {
            type: "list",
            name: "moduleType",
            message: "Select type to generate",
            choices: [
              { name: "web-widget application / parcel", value: "app-parcel" },
              {
                name: "in-browser utility module (styleguide, api cache, etc)",
                value: "util-module",
              },
              { name: "web-widget root config", value: "root-config" },
            ],
          },
        ])
      ).moduleType;
    }

    if (moduleType === "root-config") {
      this._setDestinationDir();

      this.composeWith(
        {
          Generator: WebWidgetRootConfigGenerator,
          path: require.resolve("./root-config/generator-root-config.js"),
        },
        this.options
      );
    } else if (moduleType === "app-parcel") {
      await runFrameworkGenerator.call(this);
    } else if (moduleType === "util-module") {
      this._setDestinationDir();

      if (!this.options.framework) {
        const answers = await this.prompt([
          {
            type: "list",
            name: "framework",
            message: "Which framework do you want to use?",
            choices: ["none", "react", "vue", "angular", "svelte", "other"],
          },
        ]);
        this.options.framework = answers.framework;
      }

      switch (this.options.framework) {
        case "none":
          this.composeWith(
            {
              Generator: WebWidgetUtilModuleGenerator,
              path: require.resolve(
                "./util-module/generator-web-widget-util-module.js"
              ),
            },
            this.options
          );
          break;
        case "react":
          this.composeWith(
            {
              Generator: ReactUtilModuleGenerator,
              path: require.resolve(
                "./util-module/generator-react-util-module.js"
              ),
            },
            this.options
          );
          break;
        default:
          throw Error(
            `Framework '${this.options.framework}' is not yet supported for utility microfrontends. Try creating a vanilla utility module (no framework) in the meantime, which are usable by all frameworks.`
          );
      }
    } else {
      throw Error(
        `unknown moduleType option ${moduleType}. Valid values are root-config, app-parcel, util-module`
      );
    }
  }
  _setDestinationDir() {
    if (this.options.dir) {
      const root = path.isAbsolute(this.options.dir)
        ? this.options.dir
        : path.resolve(process.cwd(), this.options.dir);
      this.destinationRoot(root);
    }
  }
};

async function runFrameworkGenerator() {
  if (!this.options.framework) {
    const answers = await this.prompt([
      {
        type: "list",
        name: "framework",
        message: "Which framework do you want to use?",
        choices: ["react", "vue", "angular", "svelte", "other"],
      },
    ]);

    this.options.framework = answers.framework;
  }

  switch (this.options.framework) {
    case "svelte":
      this._setDestinationDir();

      this.composeWith(
        {
          Generator: WebWidgetSvelteGenerator,
          path: require.resolve("./svelte/generator-web-widget-svelte.js"),
        },
        this.options
      );

      break;
    case "react":
      this._setDestinationDir();

      this.composeWith(
        {
          Generator: WebWidgetReactGenerator,
          path: require.resolve("./react/generator-web-widget-react.js"),
        },
        this.options
      );
      break;
    case "vue":
      this.composeWith(
        {
          Generator: WebWidgetVueGenerator,
          path: require.resolve("./vue/generator-web-widget-vue.js"),
        },
        this.options
      );
      break;
    case "angular":
      this.composeWith(
        {
          Generator: WebWidgetAngularGenerator,
          path: require.resolve("./angular/generator-web-widget-angular.js"),
        },
        this.options
      );
      break;
    case "other":
      console.log(
        `Check https://github.com/web-widget/create-web-widget/issues for updates on new frameworks being added to create-web-widget. Feel free to create a new issue if one does not yet exist for the framework you're using.`
      );
      break;
    default:
      throw Error(`Unsupported framework '${this.options.framework}'`);
  }
}
