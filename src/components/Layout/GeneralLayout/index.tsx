'use client'

import Box from '@mui/material/Box'

import Toolbar from '@mui/material/Toolbar'

import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'

import IconButton from '@mui/material/IconButton'

import ImageContainer from '@/components/ui/Image'
import { Stack } from '@mui/material'

import DrawerMenu from '@/components/Layout/GeneralLayout/DrawerMenu'
import { AppDrawer } from '@/components/Layout/GeneralLayout/Drawer'
import { useState, ReactNode } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import MenuIcon from '@mui/icons-material/Menu'
import UserAvatarButton from './UserAvatarButton'
import Menus from '@/components/Layout/contants'
import { useSession } from 'next-auth/react'
import useUserSession from '@/hooks/useUserSession'

export type GeneralLayoutProps = {
  children: ReactNode
}

export default function GeneralLayout({ children }: GeneralLayoutProps) {
  const [openDrawer, setOpenDrawer] = useState(false)
  const { role, image } = useUserSession()

  const menu = Menus.get(role)

  if (!menu) return null

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

          <UserAvatarButton image={image} />
        </Toolbar>
        <Box sx={{ mx: 3 }}>{children}</Box>
      </Box>
    </Box>
  )
}
