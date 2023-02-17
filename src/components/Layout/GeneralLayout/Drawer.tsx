import Drawer from '@mui/material/Drawer'
import { ReactNode } from 'react'

const drawerWidth = 280

type AppDrawerProps = {
  open?: boolean
  children: ReactNode
}

export function AppDrawer({ open, children }: AppDrawerProps) {
  return (
    <Drawer
      variant='permanent'
      sx={{
        width: { xs: '100%', sm: drawerWidth },
        flexShrink: 0,
        display: { xs: open ? 'block' : 'none', sm: 'block' },
        '& .MuiDrawer-paper': { width: { xs: '100%', sm: drawerWidth }, boxSizing: 'border-box', borderWidth: 0, boxShadow: '0px 4.28278px 32.1209px rgba(0, 98, 220, 0.05)', px: 1 },
      }}
    >
      {children}
    </Drawer>
  )
}
