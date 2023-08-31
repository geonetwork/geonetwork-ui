export type DashboardMenuItem =
  | 'my-org'
  | 'catalog'
  | 'records'
  | 'my-records'
  | 'my-draft'
  | 'my-library'

export const DashboardMenuItemArray: {
  route: string
  menuItem: DashboardMenuItem
}[] = [
  {
    route: '/records/all',
    menuItem: 'catalog',
  },
  {
    route: '/records/my-org',
    menuItem: 'my-org',
  },
  {
    route: '/records/my-records',
    menuItem: 'my-records',
  },
  {
    route: '/records/my-draft',
    menuItem: 'my-draft',
  },
  {
    route: '/records/my-library',
    menuItem: 'my-library',
  },
]
