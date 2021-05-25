module.exports = {
  runtimeCompiler: true,
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    port: 9988,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
};
