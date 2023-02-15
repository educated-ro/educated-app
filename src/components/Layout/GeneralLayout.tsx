'use client'

import * as React from 'react'
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import AppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import { SidebarLink } from '@/components/Layout/types'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ImageContainer from '@/components/Image'
import { Avatar, Badge, Menu, MenuItem, Tooltip } from '@mui/material'
import { signOut } from 'next-auth/react'
import SettingsIcon from '@mui/icons-material/Settings'
import LogoutIcon from '@mui/icons-material/Logout'

export type GeneralLayoutProps = {
  menu: SidebarLink[]
  children: React.ReactNode

  user: {
    name: string
    email: string
    image: string
  }
}

const isLinkActive = (pathname: string | null, href: string) => {
  if (pathname && href !== '/') {
    return pathname.startsWith(href)
  }

  return pathname === href
}

const drawerWidth = 280

export default function GeneralLayout({ user, menu, children }: GeneralLayoutProps) {
  const theme = useTheme()
  const pathname = usePathname()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#F7FBFF', minHeight: '100vh' }}>
      <CssBaseline />
      <Drawer
        variant='permanent'
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', borderWidth: 0, boxShadow: '0px 4.28278px 32.1209px rgba(0, 98, 220, 0.05)', px: 1 },
        }}
      >
        <Toolbar sx={{ mt: 2, mb: 6 }}>
          <ImageContainer width={160} height={47} src='/LOGO-3.png' alt='Educated Logo' />
        </Toolbar>
        <Box sx={{ overflow: 'auto' }}>
          <List sx={{ my: 1 }}>
            {menu.map((item, index) => (
              <ListItem key={item.href}>
                <ListItemButton
                  selected={isLinkActive(pathname, item.href)}
                  component={Link}
                  href={item.href}
                  sx={{
                    borderRadius: 3,
                    color: '#556B86',
                    my: 1,
                    '&.Mui-selected': {
                      color: '#fff',
                      background: 'linear-gradient(89.63deg, #0965DC 0.2%, #05BCDC 124.75%)',
                    },
                    '&:hover': {
                      color: '#fff',
                      background: 'linear-gradient(89.63deg, #0965DC 0.2%, #05BCDC 124.75%)',
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      sx: {
                        fontWeight: 500,
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component='main' sx={{ flexGrow: 1, mx: 4 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', my: 3, alignItems: 'center', mb: 10 }}>
          <Box>
            <Typography variant='h6' sx={{ fontWeight: 600 }}>
              Assessments
            </Typography>
            <Typography>See your personal assessments here!</Typography>
          </Box>
          <Tooltip title='Account settings'>
            <IconButton onClick={handleClick} size='small' sx={{ ml: 2 }} aria-controls={open ? 'account-menu' : undefined} aria-haspopup='true' aria-expanded={open ? 'true' : undefined}>
              <Avatar sx={{ width: 32, height: 32 }} src={user.image} />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            id='account-menu'
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <SettingsIcon fontSize='small' />
              </ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem onClick={() => signOut()}>
              <ListItemIcon>
                <LogoutIcon fontSize='small' />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
        <Box sx={{ mx: 3 }}>{children}</Box>
      </Box>
    </Box>
  )
}
