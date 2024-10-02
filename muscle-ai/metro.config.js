const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  const { transformer, resolver } = config;

  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve("react-native-css-transformer"),
  };
  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== "css"),
    sourceExts: [...resolver.sourceExts, "css"],
  };

  config.resolver.sourceExts = ["jsx", "js", "ts", "tsx", "json", "png"];
  config.watchFolders = [
    path.resolve(__dirname, "src/app"),
    path.resolve(__dirname, "src/assets"),
    path.resolve(__dirname, "src/components"),
    path.resolve(__dirname, "src/types"),
    path.resolve(__dirname, "src/services"),
  ];

  return config;
})();
