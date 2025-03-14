import { exec } from 'node:child_process'
import { promisify } from 'node:util'

const execAsync = (cmd) =>
  promisify(exec)(cmd, { shell: '/bin/bash' }).then(({ stdout, stderr }) => {
    if (stderr) {
      throw new Error(stderr)
    }
    return stdout
  })

export default {
  async load() {
    const allAppsComponents = await execAsync(
      `grep -rl "@Component(" --include "*\.component\.ts" ./apps | wc -l`
    ).then(parseInt)
    const standaloneAppsComponents = await execAsync(
      `grep -rl "standalone: true" --include "*\.component\.ts" ./apps | wc -l`
    ).then(parseInt)
    const allLibsComponents = await execAsync(
      `grep -rl "@Component(" --include "*\.component\.ts" ./libs | wc -l`
    ).then(parseInt)
    const standaloneLibsComponents = await execAsync(
      `grep -rl "standalone: true" --include "*\.component\.ts" ./libs | wc -l`
    ).then(parseInt)

    const allSpecFiles = await execAsync(
      `find ./libs ./apps -name "*.spec.ts" | wc -l`
    ).then(parseInt)
    const specFilesWithNgMocks = await execAsync(
      `grep -rl "ng-mocks" --include "*.spec.ts" ./libs ./apps | wc -l`
    ).then(parseInt)

    const uiComponentsCount = await execAsync(
      `find ./libs/ui -name "*.component.ts" | wc -l`
    ).then(parseInt)
    const uiComponentStoriesCount = await execAsync(
      `find ./libs/ui -name "*.component.stories.ts" | wc -l`
    ).then(parseInt)

    return {
      standaloneComponents: {
        completionRatio:
          (standaloneAppsComponents + standaloneLibsComponents) /
          (allAppsComponents + allLibsComponents),
        infos: `${allAppsComponents - standaloneAppsComponents} applications components remaining.
${allLibsComponents - standaloneLibsComponents} libraries components remaining.
Total component count is ${allAppsComponents + allLibsComponents}.`,
      },
      ngMocks: {
        completionRatio: specFilesWithNgMocks / allSpecFiles,
        infos: `${specFilesWithNgMocks} files are using ng-mocks.
${allSpecFiles} spec files in total.`,
      },
      storybookEntries: {
        completionRatio: uiComponentStoriesCount / uiComponentsCount,
        infos: `${uiComponentStoriesCount} UI components have a Storybook entry.
${uiComponentsCount} UI components in total.`,
      },
    }
  },
}
