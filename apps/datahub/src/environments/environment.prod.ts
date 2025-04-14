import packageJson from '../../../../package.json'
export const environment = {
  production: true,
  version:
    packageJson.version.split('-')[1] === 'dev'
      ? '2.5.x'
      : `v${packageJson.version}`,
}
