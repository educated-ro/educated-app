import DashboardIcon from '@mui/icons-material/Dashboard'
import AssessmentIcon from '@mui/icons-material/Assessment'
import HomeWorkIcon from '@mui/icons-material/HomeWork'
import ScheduleIcon from '@mui/icons-material/Schedule'

const loggedInStudentMenu = [
  {
    text: 'Dashboard',
    icon: <DashboardIcon />,
    href: '/',
  },
  {
    text: 'Assessments',
    icon: <AssessmentIcon />,
    href: '/assessments',
  },
  {
    text: 'Homework',
    icon: <HomeWorkIcon />,
    href: '/homework',
  },
  {
    text: 'Schedule',
    icon: <ScheduleIcon />,
    href: '/schedule',
  },
]

const loggedInTrainerMenu = [
  {
    text: 'Dashboard',
    icon: <DashboardIcon />,
    href: '/',
  },
  {
    text: 'Assessments',
    icon: <AssessmentIcon />,
    href: '/assessments',
  },
]

const Menus = new Map([
  ['Student', loggedInStudentMenu],
  ['Trainer', loggedInTrainerMenu],
])

export default Menus
