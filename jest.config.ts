const { getJestProjects } = require('@nrwl/jest')

export default {
  projects: [
    ...getJestProjects(),
    '<rootDir>/libs/ui',
    '<rootDir>/libs/data-access/gn4',
    '<rootDir>/libs/data-access/datafeeder',
  ],
}
