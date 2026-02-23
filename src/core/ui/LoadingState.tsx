import React from 'react'
import Grid from '@mui/material/Grid'
import Skeleton from '@mui/material/Skeleton'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'

const ProductSkeleton: React.FC = () => (
  <Card sx={{ overflow: 'hidden' }}>
    <Skeleton variant="rectangular" height={220} animation="wave" />
    <Box sx={{ p: 1.5 }}>
      <Skeleton variant="text" width="80%" animation="wave" />
      <Skeleton variant="text" width="40%" animation="wave" />
    </Box>
  </Card>
)

interface LoadingStateProps {
  count?: number
}

export const LoadingState: React.FC<LoadingStateProps> = ({ count = 8 }) => (
  <Grid container spacing={2}>
    {Array.from({ length: count }).map((_, i) => (
      <Grid key={i} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
        <ProductSkeleton />
      </Grid>
    ))}
  </Grid>
)
