# Release management and procedure

Since GeoNetwork UI is based on a _monorepo_ architecture, **all its components (applications, libraries) share the same
version number.**

## Version

Project version is structured like so: `<major>.<minor>.<patch>`

Whenever a release is made, the version number is increased according to the following rules:

- **Major version** is incremented when:
  - a breaking change is introduced in one of the following systems
    - Configuration files
    - Docker images usage
  - a backend requirement change that _is not_ backwards compatible (e.g. GeoNetwork version)
  - a significant architecture change happened
- **Minor version** is incremented when:
  - one or several features were added to the applications
  - a framework upgrade was done (i.e. Angular or Nx)
  - a backend requirement change that _is_ backwards compatible (e.g. GeoNetwork version)
- **Patch version** is incremented for any other kind of change: bug fixes, compatibility fixes, typos, minor tweaks...

### How to upgrade the version

Simply use the following command:

```shell
$ npm version 1.3.6
```

This will create a commit changing the version and an associated tag.

> Note that `npm version` can also automatically upgrade the version, e.g. calling `npm version minor`.

Once the version commit and tags are done, run the following command to upgrade to an intermediary dev version:

```shell
$ npm version 1.3.7-dev --no-git-tag-version
```

## Releases

### When and what to release

Releases are made periodically when needed. Each release includes:

- An archive of each application, named like so: `geonetwork-ui-{application-name}-{version}.zip`  
  Example: `geonetwork-ui-datahub-1.2.5.zip`
- A docker image of each application, tagged like so: `geonetwork/geonetwork-ui-{application-name}:{version}`  
  Example: `geonetwork/geonetwork-ui-datahub:1.2.5`

> Note that the latest development version of each application is also available by replacing the version with
> the branch name, for example:
> `geonetwork-ui-datahub-main.zip` or `geonetwork/geonetwork-ui-datahub:main`

### How to make a release

When a release is created in GitHub, the CI automatically generates the associated artifacts which
are then either attached to the release (archives) or pushed to Dockerhub (docker images).

To trigger this, simply push a git tag and then create a release from it as described here:
https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository#creating-a-release
