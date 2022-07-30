// @typescript-eslint/no-var-requires
const { ProvidePlugin } = require("webpack");

module.exports = {
  resolve: {
    fallback: {
      assert: require.resolve("assert/"),
      buffer: require.resolve("buffer/"),
      crypto: require.resolve(`crypto-browserify`),
      fs: false,
      https: require.resolve(`https-browserify`),
      http: require.resolve(`stream-http`),
      os: require.resolve(`os-browserify/browser`),
      stream: require.resolve("stream-browserify"),
      url: require.resolve(`url/`),
      util: require.resolve("util/")
    }
  },
  plugins: [
    new ProvidePlugin({
      buffer: ["buffer", "Buffer"],
      process: "process/browser"
    })
  ]
};
