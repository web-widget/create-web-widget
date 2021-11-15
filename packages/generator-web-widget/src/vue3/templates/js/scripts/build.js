import { createRequire } from "module";

const require = createRequire(import.meta.url);

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

export default ({ dir, externals = {} }) => {
  const {
    name,
    source,
    main,
    module,
    system,
    unpkg,
    libraryName,
  } = require(`${dir}/package.json`);

  const output = {
    umd: unpkg,
    esm: module,
    system,
    cjs: main,
  };

  const sourcemap = true;

  return {
    input: source,
    external: Object.keys(externals),
    output: [
      {
        format: "umd",
        file: output["umd"],
        name: libraryName || getLibraryName(name),
        sourcemap,
        globals: externals,
      },
      {
        format: "esm",
        file: output["esm"],
        sourcemap,
      },
      {
        format: "system",
        file: output["system"],
        sourcemap,
      },
      {
        format: "cjs",
        file: output["cjs"],
        sourcemap,
      },
    ],
  };
};
