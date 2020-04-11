const nixt = require("nixt");
const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");

const packagesToLink = [
  "webpack-config-single-spa",
  "webpack-config-single-spa-react",
];

beforeAll(() => {
  console.log("setting up yarn links");
  Promise.all(packagesToLink.map(linkPackage));
});

function linkPackage(packageName) {
  return new Promise((resolve, reject) => {
    nixt()
      .cwd(path.join(process.cwd(), `packages/${packageName}`))
      .run(`yarn link`)
      .code(0)
      .end((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
  });
}

exports.createFixtureIfDoesntExist = function (name, args) {
  if (!fs.existsSync(path.join(__dirname, `./fixtures/${name}/package.json`))) {
    const cwd = path.join(__dirname, "./fixtures");
    mkdirp.sync(cwd);

    it(`can successfully generate the '${name}' fixture`, (done) => {
      const argsStr = args.replace(/\s+/g, " ");

      console.log(`Creating '${name}' fixture. This could take a while...`);

      nixt()
        .cwd(cwd)
        .run(
          `node ../../packages/create-single-spa/bin/create-single-spa.js --dir ${name} ${argsStr}`
        )
        .stdout(/Project setup complete!/)
        .code(0)
        .end((err) => {
          if (err) {
            fail(err);
          } else {
            console.log(
              `Linking create-single-spa packages to ${name} fixture`
            );
            nixt()
              .cwd(path.join(cwd, name))
              .run(`yarn link ${packagesToLink.join(" ")}`)
              .code(0)
              .end(done);
          }
        });
    });
  } else {
    console.log(`Reusing existing fixture for ${name}`);
  }

  return path.join(__dirname, `./fixtures/${name}`);
};
