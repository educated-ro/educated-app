import { HiChartPie, HiClipboardList, HiBookmark, HiOutlineClock } from 'react-icons/hi'

export const loggedInStudentMenu = [
  {
    text: 'Dashboard',
    icon: <HiChartPie />,
    href: '/',
  },
  {
    text: 'Assessments',
    icon: <HiClipboardList />,
    href: '/assessments',
  },
  {
    text: 'Homework',
    icon: <HiBookmark />,
    href: '/homework',
  },
  {
    text: 'Schedule',
    icon: <HiOutlineClock />,
    href: '/schedule',
  },
]
