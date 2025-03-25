import packageJson from '../../../../package.json'
export const environment = {
  production: true,
  version:
    packageJson.version.split('.')[2] === 'x'
      ? '2.4.x'
      : `v${packageJson.version}`,
}
