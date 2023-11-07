import packageJson from '../../../../package.json'
export const environment = {
  production: true,
  version:
    packageJson.version.split('-')[1] === 'dev'
      ? 'main'
      : `v${packageJson.version}`,
}
