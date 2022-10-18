export interface InfiniteScrollModel {
  distance?: number
  upDistance?: number
  throttle?: number
  disabled?: boolean
  fromRoot?: boolean
  container?: string | HTMLElement
  scrollWindow?: boolean
}

export const InfiniteScrollOptionsDefault = {
  distance: 2,
  upDistance: 2,
  throttle: 300,
  disabled: false,
}
