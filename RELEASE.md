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

Use the following commands to upgrade to a stable (non development) version:

```shell
npm version 1.3.6 --no-git-tag-version
git add .
git commit -m "1.3.6"
git tag v1.3.6
git push upstream main v1.3.6 # replace "upstream" with your remote repo name
```

This will update all `package.json` files in the repository, create a commit changing the version and an associated tag, and push both
to the remote repository.

Once the version commit and tag are done and pushed, run the following commands to upgrade to an intermediary dev version:

```shell
npm version 1.4.0-dev --no-git-tag-version # dev versions are a minor version above stable ones
git add .
git commit -m "1.4.0-dev"
git push upstream main
```

> Note that we're not tagging dev versions.

> The same workflow can be applied to a patch branch, just replace `main` with the branch name

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

## Patch branch

In order to clearly make a distinction between critical bug fixes and evolutions, a new patch branch should be created each time a bug fix needs to be backported to a previously released major/minor version.

The patch branch keeps the same major and minor numbers, but the patch number is replaced by an "x", allowing multiple patch versions to be released on the same major/minor version.

### Creating and preparing the patch branch

For the examples, we'll use the `2.5.x` branched from `v2.5.0`.

First, create the branch and check it out:

```shell
git checkout -b 2.5.x v2.5.0
```

Once the branch is created:

- the `.github/workflows` should be adapted to run on push to the `2.5.x` branch instead of `main`
- adapt the `artifacts.yml` to
  - tag the docker image as `2.5.x` instead of `latest` (Tag all docker images on 2.5.x also as 2.5.x)
  - put the `dev-2.5.x` tag instead of `dev` (Publish NPM package)
  - NOT put the `latest` tag on release (Publish NPM package)
- adapt `tools/print-dev-version.sh` to detect `2.5.x` instead of `main`
- adapt `apps/datahub/src/environments/environment.ts` (dev and prod) to return `2.5.x` instead of `main`

Then set the version to the next dev version:

```shell
npm version 2.5.1-dev --no-git-tag-version
git add .
git commit -m "2.5.1-dev"
git push upstream 2.5.x # replace "upstream" with your remote repo name
```

### How to backport a bug fix

#### With the backport bot

On a PR that needs to be backported, (create and) add the ``backport-to-2.5.x` label (replace `2.5.x` with the wanted patch branch name).

A new PR should automatically be created on the `2.5.x` branch, with the commits cherry-picked, or an indication of commits that couldn't be cherry-picked.

#### Manually

If the automatic backport is not successfull, you can either resolve the conflicts, or try to cherry-pick the needed correctly.

Be careful that comitting outside a PR will prevent the release notes on this next version to be generated automatically.
