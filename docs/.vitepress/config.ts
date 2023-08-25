import { defineConfig } from 'vitepress'
const packageJson = require('../../package.json')

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'GeoNetwork-UI',
  description: 'Documentation of various aspects of the project',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Guide', link: '/guide/why', activeMatch: '/guide/' },
      {
        text: 'Reference',
        link: '/reference/principles',
        activeMatch: '/reference/',
      },
      { text: 'Applications', link: '/apps/datahub', activeMatch: '/apps/' },
      {
        text: `Version ${packageJson.version}`,
        link: 'https://github.com/geonetwork/geonetwork-ui/releases',
      },
    ],

    sidebar: {
      '/guide/': sidebarGuide(),
      '/reference/': sidebarReference(),
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
        { text: 'Why?', link: '/guide/why' },
        { text: 'Getting started', link: '/guide/getting-started' },
        { text: 'Prerequisites', link: '/guide/prerequisites' },
        { text: 'Configure', link: '/guide/configure' },
        { text: 'Deploy', link: '/guide/deploy' },
        { text: 'Web components', link: '/guide/webcomponents' },
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
      text: 'Contributing',
      items: [
        { text: 'Development environment', link: '/guide/dev-environment' },
        { text: 'Create a Pull Request', link: '/guide/create-a-pr' },
        { text: 'Best practices', link: '/guide/best-practices' },
        { text: 'Versioning', link: '/guide/versioning' },
      ],
    },
  ]
}

function sidebarReference() {
  return [
    {
      text: 'Architecture',
      items: [
        { text: 'Principles', link: '/reference/principles' },
        { text: 'Internationalization', link: '/reference/i18n' },
        { text: 'ElasticSearch index', link: '/reference/elasticsearch' },
        { text: 'Organizations', link: '/reference/organizations' },
        { text: 'State management', link: '/reference/state-management' },
        { text: 'Routing', link: '/reference/routing' },
        { text: 'Application configuration', link: '/reference/app-config' },
        {
          text: 'Pivot Format',
          link: '/reference/pivot-format',
        },
      ],
    },
    {
      text: 'Web Components',
      link: '/reference/webcomponents',
    },
    {
      text: 'Supported search fields',
      link: '/reference/search-fields',
    },
  ]
}

function sidebarApps() {
  return [
    {
      text: 'Applications',
      items: [
        { text: 'Datahub', link: '/apps/datahub' },
        { text: 'Datafeeder', link: '/apps/datafeeder' },
        { text: 'Editor', link: '/apps/editor' },
      ],
    },
  ]
}
