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
import { Avatar, Badge, Menu, MenuItem, Stack, Tooltip } from '@mui/material'
import { signOut } from 'next-auth/react'
import SettingsIcon from '@mui/icons-material/Settings'
import LogoutIcon from '@mui/icons-material/Logout'
import DrawerMenu from '@/components/Layout/GeneralLayout/DrawerMenu'
import { AppDrawer } from '@/components/Layout/GeneralLayout/Drawer'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import MenuIcon from '@mui/icons-material/Menu'
import UserAvatarButton from './GeneralLayout/UserAvatarButton'

export type GeneralLayoutProps = {
  menu: SidebarLink[]
  children: React.ReactNode

  user: {
    name: string
    email: string
    image: string
  }
}

const drawerWidth = 280

export default function GeneralLayout({ user, menu, children }: GeneralLayoutProps) {
  const [openDrawer, setOpenDrawer] = useState(false)

  const handleToggleDrawer = () => setOpenDrawer(prev => !prev)

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <AppDrawer open={openDrawer}>
        <Toolbar sx={{ mt: 2, mb: 6 }}>
          <Stack direction='row' justifyContent='space-between' sx={{ width: '100%' }} alignItems='center'>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <ImageContainer width={160} height={47} src='/LOGO-3.png' alt='Educated Logo' />
            </Box>

            <IconButton onClick={handleToggleDrawer} sx={{ display: { xs: 'block', sm: 'none' } }}>
              <CloseIcon fontSize='medium' />
            </IconButton>
          </Stack>
        </Toolbar>

        <Box onClick={handleToggleDrawer}>
          <DrawerMenu menu={menu} />
        </Box>
      </AppDrawer>

      <Box component='main' sx={{ flexGrow: 1, mx: { sm: 4, xs: 0 }, maxWidth: '100%' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', my: 3, alignItems: 'center', mb: 10 }}>
          <Box sx={{ fontWeight: 600, display: { xs: 'none', sm: 'block' } }}>
            <Typography variant='h6'>Assessments</Typography>
            <Typography>See your personal assessments here!</Typography>
          </Box>

          <IconButton onClick={handleToggleDrawer} sx={{ display: { xs: 'block', sm: 'none' } }}>
            <MenuIcon fontSize='medium' />
          </IconButton>

          <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
            <ImageContainer width={160} height={47} src='/LOGO-3.png' alt='Educated Logo' />
          </Box>

          <UserAvatarButton image={user.image} />
        </Toolbar>
        <Box sx={{ mx: 3 }}>{children}</Box>
      </Box>
    </Box>
  )
}
