import packageJson from '../../../../package.json'
export const environment = {
  production: true,
  version: `v${packageJson.version.split('-')[0]}`,
}
