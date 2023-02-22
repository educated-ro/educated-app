export const getPageTitleAndDescription = (pathname: string | null) => {
  if (pathname === '/') return ['Dashboard', 'See the dashboard']

  const splittedPathname = pathname ? pathname.split('/') : []

  if (splittedPathname.includes('assessments')) {
    return ['Assessments', 'See your personal assessments here!']
  }

  return ['Default Title', 'This is a default title']
}
