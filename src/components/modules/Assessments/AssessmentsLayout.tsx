'use client'

import { ReactNode, SyntheticEvent, useState } from 'react'
import { Box, Typography } from '@mui/material'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import Tab from '@mui/material/Tab'

type AssessmentsLayoutProps = {
  defaultTab: string
  tabs: {
    name: string
    value: string
    count: number
  }[]
  children: ReactNode[]
}
export default function AssessmentsLayout({ defaultTab, tabs, children }: AssessmentsLayoutProps) {
  const [selectedTab, setSelectedTab] = useState(defaultTab)

  const handleTabChange = (event: SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ width: '100%', typography: 'body1', mb: 5 }}>
        <TabContext value={selectedTab}>
          <Box>
            <TabList
              onChange={handleTabChange}
              aria-label='lab API tabs example'
              TabIndicatorProps={{ sx: { display: 'none' } }}
              variant='scrollable'
              sx={{
                '& button': {
                  fontWeight: 500,
                  fontSize: 18,
                  textTransform: 'capitalize',
                  color: '#8A98A9',
                },
                '& button.Mui-selected': {
                  color: '#2F3D4E',
                },
              }}
            >
              {tabs!.map(tab => (
                <Tab
                  value={tab.value}
                  key={tab.value}
                  label={
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                      <Typography sx={{ fontWeight: 500 }}>{tab.name}</Typography>
                      <Typography
                        sx={{
                          backgroundColor: selectedTab === tab.value ? '#0868DC' : '#DEE1E4',
                          color: selectedTab === tab.value ? '#fff' : '#8A98A9',
                          borderRadius: '100%',
                          width: 22,
                          height: 22,
                          fontSize: 12,
                          textAlign: 'center',
                          lineHeight: 1.9,
                          fontWeight: 500,
                        }}
                      >
                        {tab.count}
                      </Typography>
                    </Box>
                  }
                />
              ))}
            </TabList>
            {children}
          </Box>
        </TabContext>
      </Box>
    </Box>
  )
}
