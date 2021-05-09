import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import progress from "rollup-plugin-progress";
import { sizeSnapshot } from "rollup-plugin-size-snapshot";
import del from "rollup-plugin-delete";
import { terser } from "rollup-plugin-terser";
import serve from "rollup-plugin-serve";
import copy from "rollup-plugin-copy";
import livereload from "rollup-plugin-livereload";

const isDev = process.env.NODE_ENV !== "production";
const isProd = !isDev;

export default {
  input: "src/main.js",
  output: {
    file: "dist/js/bundle.js",
    format: "iife",
  },
  plugins: [
    del({ targets: "dist/*" }),
    copy({
      targets: [{ src: "public/*", dest: "dist/" }],
    }),
    commonjs(),
    resolve(),
    progress(),
    isDev && sizeSnapshot(),
    isProd && terser(),
    isDev &&
      serve({
        open: true,
        contentBase: "dist",
        port: 3000,
      }),
    isDev && livereload(),
  ],
};
