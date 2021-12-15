export interface InfiniteScrollModel {
  distance?: number
  upDistance?: number
  throttle?: number
  disabled?: boolean
  fromRoot?: boolean
  container?: string | HTMLElement
}

export const InfiniteScrollOptionsDefault = {
  distance: 1,
  upDistance: 2,
  throttle: 300,
  disabled: false,
}
