const presets = [
  ["@babel/env", {
    targets: {
      esmodules: true,
      node: "current"
    },
    useBuiltIns: "usage"
  }]
]

const plugins = [
  "@babel/plugin-proposal-object-rest-spread"
]

module.exports = { presets, plugins }
