import { defineConfig } from 'vitepress'
import packageJson from '../../package.json'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'GeoNetwork-UI',
  description: 'Documentation of various aspects of the project',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Guide', link: '/guide/introduction', activeMatch: '/guide/' },
      {
        text: 'For Developers',
        link: '/developers/architecture-overview',
        activeMatch: '/developers/',
      },
      { text: 'Applications', link: '/apps/datahub', activeMatch: '/apps/' },
      {
        text: 'Web Components',
        link: 'https://github.com/geonetwork/geonetwork-ui/tree/main/apps/webcomponents',
      },
      {
        text: `Version ${packageJson.version}`,
        link: 'https://github.com/geonetwork/geonetwork-ui/releases',
      },
    ],

    sidebar: {
      '/guide/': sidebarGuide(),
      '/developers/': sidebarForDevelopers(),
      '/apps/': sidebarApps(),
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/geonetwork/geonetwork-ui' },
    ],

    footer: {
      message: 'Released under the GPL-2.0 license.',
      copyright: 'Copyright © 2020-present GeoNetwork',
    },

    search: {
      provider: 'local',
    },
  },

  ignoreDeadLinks: 'localhostLinks',
})

function sidebarGuide() {
  return [
    {
      text: 'Guide',
      items: [
        { text: 'Introduction', link: '/guide/introduction' },
        { text: 'Prerequisites', link: '/guide/prerequisites' },
        { text: 'Run', link: '/guide/run' },
        { text: 'Deploy', link: '/guide/deploy' },
        { text: 'Configure', link: '/guide/configure' },
        { text: 'Theming', link: '/guide/theming' },
        { text: 'Web components', link: '/guide/webcomponents' },
        { text: 'Standalone Search', link: '/guide/standalone-search' },
        { text: 'Custom Applications', link: '/guide/custom-app' },
        { text: 'Troubleshooting', link: '/guide/troubleshooting' },
        { text: 'FAQ', link: '/guide/faq' },
      ],
    },
    {
      text: 'About',
      items: [
        { text: 'Vision', link: '/guide/vision' },
        { text: 'Roadmap', link: '/guide/roadmap' },
        { text: 'Contributors', link: '/guide/contributors' },
        { text: 'Sponsors', link: '/guide/sponsors' },
        { text: 'License', link: '/guide/license' },
        { text: 'Maintenance', link: '/guide/maintenance' },
      ],
    },
    {
      text: 'Reference',
      items: [
        {
          text: 'Supported search fields',
          link: '/guide/search-fields',
        },
      ],
    },
  ]
}

function sidebarForDevelopers() {
  return [
    {
      text: 'For developers',
      items: [
        {
          text: 'Architecture overview',
          link: '/developers/architecture-overview',
        },
        { text: 'Application configuration', link: '/developers/app-config' },
        { text: 'Coding guidelines', link: '/developers/code-guide' },
        { text: 'Styling guidelines', link: '/developers/styling-guide' },
        { text: 'Caching', link: '/developers/caching' },
        { text: 'ElasticSearch index', link: '/developers/elasticsearch' },
        { text: 'Internationalization', link: '/developers/i18n' },
        { text: 'Interactive maps', link: '/developers/maps' },
        { text: 'Organizations', link: '/developers/organizations' },
        {
          text: 'Pivot Format',
          link: '/developers/pivot-format',
        },
        { text: 'Routing', link: '/developers/routing' },
        { text: 'State management', link: '/developers/state-management' },
        { text: 'Testing', link: '/developers/testing' },
        { text: 'Writing components', link: '/developers/writing-components' },
      ],
    },
    {
      text: 'Contributing',
      items: [
        {
          text: 'Development environment',
          link: '/developers/dev-environment',
        },
        { text: 'Create a Pull Request', link: '/developers/create-a-pr' },
        { text: 'Versioning', link: '/developers/versioning' },
      ],
    },
  ]
}

function sidebarApps() {
  return [
    {
      text: 'Applications',
      items: [
        { text: 'Datahub', link: '/apps/datahub' },
        { text: 'Metadata Editor', link: '/apps/editor' },
      ],
    },
  ]
}
