module.exports = {
  plugins: {
    "postcss-flexbugs-fixes": true,
    "autoprefixer": {
      "grid": true,
      "browsers": [
        "> 1%",
        "last 2 versions",
        "IE >= 10",
        "Android >= 5",
        "last 2 ios version"
      ]
    }
  }
}