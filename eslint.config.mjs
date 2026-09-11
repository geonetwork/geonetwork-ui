import nx from '@nx/eslint-plugin'
import eslintPluginNoOnlyTests from 'eslint-plugin-no-only-tests'

export default [
  ...nx.configs['flat/base'],
  { plugins: { 'no-only-tests': eslintPluginNoOnlyTests } },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: [
            '^.+/jest.setup',
            '^.+/translations/.*.json$',
            '^.+/tools/e2e/.+$',
            '^.+/package.json',
          ],
          depConstraints: [
            {
              sourceTag: 'type:feature',
              onlyDependOnLibsWithTags: [
                'type:feature',
                'type:data-access',
                'type:ui',
                'type:util',
                'type:api',
              ],
              bannedExternalImports: ['*app-config'],
            },
            {
              sourceTag: 'type:data-access',
              onlyDependOnLibsWithTags: ['type:data-access'],
            },
            {
              sourceTag: 'type:ui',
              onlyDependOnLibsWithTags: [
                'type:ui',
                'scope:i18n',
                'scope:shared',
              ],
            },
            {
              sourceTag: 'type:util',
              onlyDependOnLibsWithTags: ['type:util'],
            },
            {
              sourceTag: 'type:app',
              onlyDependOnLibsWithTags: [
                'type:feature',
                'type:data-access',
                'type:ui',
                'type:util',
                'type:api',
              ],
            },
            {
              sourceTag: 'type:api',
              onlyDependOnLibsWithTags: ['type:api', 'scope:shared'],
              bannedExternalImports: ['*app-config'],
            },
            {
              sourceTag: 'scope:webcomponents',
              onlyDependOnLibsWithTags: [
                'type:app',
                'type:feature',
                'type:data-access',
                'type:ui',
                'type:util',
                'type:api',
              ],
            },
          ],
        },
      ],
    },
  },
  ...nx.configs['flat/typescript'],
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/no-unused-expressions': [
        'error',
        {
          allowShortCircuit: true,
          allowTernary: true,
        },
      ],
    },
  },
  ...nx.configs['flat/javascript'],
  {
    files: ['**/*.js', '**/*.jsx'],
    rules: {
      '@typescript-eslint/no-unused-expressions': [
        'error',
        {
          allowShortCircuit: true,
          allowTernary: true,
        },
      ],
    },
  },
  {
    files: ['**/*.spec.ts', '**/*.cy.ts'],
    rules: {
      'no-only-tests/no-only-tests': 'error',
    },
  },
]
