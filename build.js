const execSync = require("child_process").execSync;
const join = require("path").join;

execSync("npm i", {
  windowsHide: true,
  cwd: join(__dirname, "./data"),
  stdio: "inherit",
  env: {
    ...process.env,
    NODE_ENV: process.argv[2] || "development"
  }
});

console.log("done installing modules");

execSync("npx webpack", {
  windowsHide: true,
  cwd: join(__dirname, "./data"),
  stdio: "inherit",
  env: {
    ...process.env,
    NODE_ENV: process.argv[2] || "development"
  }
});

console.log("webpack build done");

execSync('go-bindata-assetfs -prefix "data/"  data/dist/...', {
  windowsHide: true,
  cwd: __dirname,
  stdio: "inherit"
});

console.log("bindata done");

execSync("go build", {
  windowsHide: true,
  cwd: __dirname,
  stdio: "inherit"
});

console.log("build done");
