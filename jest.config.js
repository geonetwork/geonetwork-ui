const { getJestProjects } = require('@nrwl/jest')

module.exports = {
  projects: [
    ...getJestProjects(),
    '<rootDir>/libs/ui',
    '<rootDir>/libs/data-access/gn4',
    '<rootDir>/libs/data-access/datafeeder',
  ],
}
