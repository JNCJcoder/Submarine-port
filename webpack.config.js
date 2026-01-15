import path from "node:path";

const config = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(import.meta.dirname, 'docs'),
    clean: true,
  },
  mode: 'development',
  devServer: {
    static: './docs',
    open: true,
    hot: true,
    port: 8080,
  },
  module: {
    rules: [],
  },
  devtool: 'source-map',
};

export default config;