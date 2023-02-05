export const isLinkActive = (pathname: string | null, href: string) => {
  if (!pathname) return false

  if (href !== '/') {
    return pathname.startsWith(href)
  }

  return pathname === href
}
