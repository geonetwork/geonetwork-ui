export interface NotificationContent {
  type: 'info' | 'warning' | 'error' | 'success'
  title: string
  text: string
  closeMessage?: string
}
