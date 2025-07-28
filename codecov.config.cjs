module.exports = {
  name: "PTM Multi RegExp",
  outputDir: "codecov",
  reports: [['codecov']],
  entryFilter: {
    "**/node_modules/**": false,
    "**/src/**": true,
  },
};
