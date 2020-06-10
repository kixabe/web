const { minify } = require("html-minifier");
const { dirname, extname } = require("path");
const { copySync, removeSync } = require("fs-extra");
const { readFileSync, writeFileSync } = require("fs");

process.chdir(dirname(__dirname));

const htmlMinOpts = JSON.parse(readFileSync(".htmlminrc", "utf8"));

removeSync("public");
copySync("src", "public", {
  filter(src, out) {
    if (extname(src) == ".html")
      return writeFileSync(
        out,
        minify(readFileSync(src, "utf8"), htmlMinOpts),
        "utf8"
      );
    return true;
  },
});
