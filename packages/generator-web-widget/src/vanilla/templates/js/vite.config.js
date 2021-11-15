import path from "path";
import { defineConfig } from "vite";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const cwd = process.cwd();
const { source, main, module, system } = require(`${cwd}/package.json`);

const outDir = "dist/";
const formats = {
  cjs: main,
  esm: module,
  system,
};

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir,
    lib: {
      entry: path.resolve(cwd, source),
      formats: Object.keys(formats),
      fileName: (format) => {
        const normalize = formats[format].replace(/\.\//, "");
        return normalize.startsWith(outDir)
          ? normalize.replace(outDir, "")
          : normalize;
      },
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {},
      },
    },
  },
});
