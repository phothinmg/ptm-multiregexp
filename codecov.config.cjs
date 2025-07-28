module.exports = {
  name: "PTM Multi RegExp",
  outputDir: "mcr",
  reports: [['codecov']],
  entryFilter: {
    "**/node_modules/**": false,
    "**/src/**": true,
  },
};
