const withLess = require("@zeit/next-less");
module.exports = {
  env: {
    API: process.env.API,
  },
  ...withLess({
    cssModules: true,
    // cssLoaderOptions: {
    //   importLoaders: 1,
    //   localIdentName: "[local]___[hash:base64:5]",
    // },
    // lessLoaderOptions: {
    //   javascriptEnabled: true,
    //   // modifyVars,
    // },
  }),
};
