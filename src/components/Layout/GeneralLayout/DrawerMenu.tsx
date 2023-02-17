import { List, Box, ListItem, ListItemButton, ListItemText, ListItemIcon } from '@mui/material'
import { SidebarLink } from '@/components/Layout/types'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const isLinkActive = (pathname: string | null, href: string) => {
  if (pathname && href !== '/') {
    return pathname.startsWith(href)
  }

  return pathname === href
}

export default function DrawerMenu({ menu }: { menu: SidebarLink[] }) {
  const pathname = usePathname()

  return (
    <List sx={{ my: 1 }}>
      {menu.map(item => (
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
  )
}
