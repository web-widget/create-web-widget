const PnpmGenerator = require("../PnpmGenerator");
const validate = require("../validate-naming");

const generators = {
  2: "../vue2/index.js",
  3: "../vue3/index.js",
};

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
    this.option("frameworkVersion", {
      type: String,
    });
  }

  async getOptions() {
    const answers = await this.prompt([
      {
        type: "list",
        name: "frameworkVersion",
        message: "Which version of Vue do you want to use?",
        choices: [
          {
            name: "Vue2",
            value: "2",
          },
          {
            name: "Vue3",
            value: "3",
          },
        ],
        when: !this.options.frameworkVersion,
        validate,
      },
    ]);

    Object.assign(this.options, answers);
  }

  async create() {
    const options = this.options;
    await this.composeWith(
      {
        Generator: require(generators[options.frameworkVersion]),
        path: require.resolve(generators[options.frameworkVersion]),
      },
      options
    );
  }
};
