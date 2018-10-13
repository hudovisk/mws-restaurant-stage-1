// Karma configuration
// Generated on Sat Oct 13 2018 00:09:13 GMT-0300 (-03)
var webpackConfig = require("./webpack.dev");

module.exports = function(config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: __dirname,
    browsers: ["puppeteer"],
    browserConsoleLogOptions: {
      level: "log",
      terminal: true
    },
    client: {
      mocha: {
        reporter: "html", // change Karma's debug.html to mocha web reporter
        ui: "bdd"
      }
    },
    coverageReporter: {
      reporters: [{ type: "lcov", dir: "coverage", subdir: "." }],
      includeAllSources: true
    },
    customLaunchers: {
      puppeteer: {
        base: "ChromeHeadless",
        flags: [
          "--disable-setuid-sandbox",
          "--no-sandbox",
          // Avoid "Maximum call stack size exceeded" errors on CircleCI
          "--stack-trace-limit 200000"
        ]
      }
    },
    files: ["test/tests.bundle.js"],
    frameworks: ["mocha"],
    reporters: ["mocha", "coverage"],
    reportSlowerThan: 100,
    singleRun: process.env.CI === "true",

    formatError: function(msg) {
      // filter out empty lines and node_modules
      if (!msg.trim() || /~/.test(msg) || /node_modules\//.test(msg)) return "";

      // indent the error beneath the it() message
      let newLine = `  ${msg}`;

      if (newLine.includes("webpack:///")) {
        // remove webpack:///
        newLine = newLine.replace("webpack:///", "");

        // remove bundle location, showing only the source location
        newLine = newLine.slice(0, newLine.indexOf(" <- "));
      }

      return `${newLine}\n`;
    },

    preprocessors: {
      "test/tests.bundle.js": ["webpack", "sourcemap"]
    },
    webpack: {
      entry: "./test/tests.bundle.js",
      externals: webpackConfig.externals,
      devtool: "inline-source-map",
      module: webpackConfig.module,
      plugins: webpackConfig.plugins,
      resolve: webpackConfig.resolve
    },
    webpackServer: {
      progress: false,
      stats: {
        hash: false, // the hash of the compilation
        version: false, // webpack version info
        timings: true, // timing info
        assets: true, // assets info
        chunks: false, // chunk info
        colors: true, // with console colors
        chunkModules: false, // built modules info to chunk info
        modules: false, // built modules info
        cached: false, // also info about cached (not built) modules
        reasons: false, // info about the reasons modules are included
        source: false, // the source code of modules
        errorDetails: true, // details to errors (like resolving log)
        chunkOrigins: false, // the origins of chunks and chunk merging info
        modulesSort: "", // (string) sort the modules by that field
        chunksSort: "", // (string) sort the chunks by that field
        assetsSort: "" // (string) sort the assets by that field
      },
      debug: true,
      noInfo: false,
      quiet: false
    }
  });
};
