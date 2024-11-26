export function formatUserInfo(
  userInfo: string | unknown,
  displayCount = false
): string {
  const infos = (typeof userInfo === 'string' ? userInfo : '').split('|')
  const count = displayCount ? ` ${infos[3].split(' ')[1]}` : ''
  if (infos && infos.length === 4) {
    return `${infos[2]} ${infos[1]}${count}`
  }
  return undefined
}
