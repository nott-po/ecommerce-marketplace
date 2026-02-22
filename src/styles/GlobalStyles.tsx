import React from 'react'
import { GlobalStyles as MuiGlobalStyles } from '@mui/material'

export const GlobalStyles: React.FC = () => (
  <MuiGlobalStyles
    styles={{
      html: {
        WebkitTextSizeAdjust: '100%',
        scrollBehavior: 'smooth',
      },
      body: {
        overflowX: 'hidden',
      },
      'img, picture, video, canvas, svg': {
        display: 'block',
        maxWidth: '100%',
      },
      '::-webkit-scrollbar': {
        width: 6,
        height: 6,
      },
      '::-webkit-scrollbar-track': {
        background: '#f1f1f1',
      },
      '::-webkit-scrollbar-thumb': {
        background: '#c1c1c1',
        borderRadius: 3,
      },
      '::-webkit-scrollbar-thumb:hover': {
        background: '#a1a1a1',
      },
    }}
  />
)
