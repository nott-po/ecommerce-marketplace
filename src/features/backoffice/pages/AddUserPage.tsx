import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import FormLabel from '@mui/material/FormLabel'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import Divider from '@mui/material/Divider'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { useRouter } from '@tanstack/react-router'
import { BACKOFFICE_COLORS, UI_COLORS } from '../../../styles/theme'
import { FlatButton } from '../../../shared/ui/FlatButton'
import { ContentPaper } from '../../../shared/ui/ContentPaper'

const fieldSx = {
  '& .MuiOutlinedInput-root': {
    bgcolor: UI_COLORS.bgForm,
    borderRadius: 1.5,
    '& fieldset': { border: 'none' },
    '&:hover fieldset': { border: 'none' },
    '&.Mui-focused fieldset': { border: `1.5px solid ${BACKOFFICE_COLORS.primary}` },
  },
  '& .MuiInputLabel-root': { fontSize: '0.875rem' },
}

const selectSx = {
  bgcolor: UI_COLORS.bgForm,
  borderRadius: 1.5,
  '& fieldset': { border: 'none' },
  '&:hover fieldset': { border: 'none' },
  '&.Mui-focused fieldset': { border: `1.5px solid ${BACKOFFICE_COLORS.primary}` },
}

const Col: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1, minWidth: 0 }}>
    {children}
  </Box>
)

export const AddUserPage: React.FC = () => {
  const router = useRouter()
  const [archived, setArchived] = useState('No')
  const [active, setActive] = useState('No')
  const [shipping, setShipping] = useState('Yes')

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
      {/* Breadcrumb */}
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        sx={{ mb: 2.5, '& .MuiBreadcrumbs-separator': { color: UI_COLORS.textTertiary } }}
      >
        <Link
          underline="hover"
          color="inherit"
          sx={{ cursor: 'pointer', fontSize: '0.875rem', color: UI_COLORS.textSecondary }}
          onClick={() => router.history.push('/backoffice/users')}
        >
          User Management
        </Link>
        <Typography sx={{ fontSize: '0.875rem', color: UI_COLORS.textMedium }}>
          List of Bringing Customers
        </Typography>
      </Breadcrumbs>

      <ContentPaper sx={{ p: 3.5 }}>
        <Typography sx={{ fontSize: '1.125rem', fontWeight: 700, mb: 3, color: UI_COLORS.textPrimary }}>
          Add New User
        </Typography>

        <Box sx={{ display: 'flex', gap: 4 }}>
          {/* Left column */}
          <Col>
            <TextField label="Client *" fullWidth size="small" placeholder="____-____-____-____" sx={fieldSx} />

            <Box sx={{ display: 'flex', gap: 4 }}>
              <Box>
                <FormLabel sx={{ fontSize: '0.8125rem', color: UI_COLORS.textSecondary, display: 'block', mb: 0.25 }}>
                  Archived
                </FormLabel>
                <RadioGroup row value={archived} onChange={e => setArchived(e.target.value)}>
                  <FormControlLabel value="Yes" control={<Radio size="small" />} label={<Typography variant="body2">Yes</Typography>} />
                  <FormControlLabel value="No" control={<Radio size="small" />} label={<Typography variant="body2">No</Typography>} />
                </RadioGroup>
              </Box>
              <Box>
                <FormLabel sx={{ fontSize: '0.8125rem', color: UI_COLORS.textSecondary, display: 'block', mb: 0.25 }}>
                  Active
                </FormLabel>
                <RadioGroup row value={active} onChange={e => setActive(e.target.value)}>
                  <FormControlLabel value="Yes" control={<Radio size="small" />} label={<Typography variant="body2">Yes</Typography>} />
                  <FormControlLabel value="No" control={<Radio size="small" />} label={<Typography variant="body2">No</Typography>} />
                </RadioGroup>
              </Box>
            </Box>

            <TextField label="Bring client number *" fullWidth size="small" placeholder="____" sx={fieldSx} />

            <FormControl fullWidth size="small">
              <InputLabel sx={{ fontSize: '0.875rem' }}>Salutation</InputLabel>
              <Select label="Salutation" defaultValue="" sx={selectSx}>
                <MenuItem value="mr">Mr.</MenuItem>
                <MenuItem value="ms">Ms.</MenuItem>
                <MenuItem value="mrs">Mrs.</MenuItem>
                <MenuItem value="dr">Dr.</MenuItem>
              </Select>
            </FormControl>

            <TextField label="Name *" fullWidth size="small" sx={fieldSx} />
            <TextField label="First name" fullWidth size="small" sx={fieldSx} />
            <TextField label="Email address *" fullWidth size="small" type="email" sx={fieldSx} />
            <TextField label="Phone number" fullWidth size="small" sx={fieldSx} />
          </Col>

          {/* Middle column */}
          <Col>
            <TextField label="Mobile number" fullWidth size="small" sx={fieldSx} />
            <TextField label="Street *" fullWidth size="small" sx={fieldSx} />
            <TextField label="Number *" fullWidth size="small" sx={fieldSx} />
            <TextField label="ZIP code *" fullWidth size="small" placeholder="ZIP code (4-5 digits)" sx={fieldSx} />
            <TextField label="City *" fullWidth size="small" sx={fieldSx} />

            <FormControl fullWidth size="small">
              <InputLabel sx={{ fontSize: '0.875rem' }}>Country *</InputLabel>
              <Select label="Country *" defaultValue="" sx={selectSx}>
                <MenuItem value="AT">Austria</MenuItem>
                <MenuItem value="DE">Germany</MenuItem>
                <MenuItem value="CH">Switzerland</MenuItem>
                <MenuItem value="PL">Poland</MenuItem>
              </Select>
            </FormControl>

            <TextField label="Paypal account" fullWidth size="small" sx={fieldSx} />
            <TextField
              label="Contract signed"
              fullWidth
              size="small"
              type="date"
              slotProps={{ inputLabel: { shrink: true } }}
              sx={fieldSx}
            />
          </Col>

          {/* Right column */}
          <Col>
            <TextField label="Notes" fullWidth multiline rows={6} size="small" sx={fieldSx} />

            <Box>
              <FormLabel sx={{ fontSize: '0.8125rem', color: UI_COLORS.textSecondary, display: 'block', mb: 0.25 }}>
                Shipping
              </FormLabel>
              <RadioGroup row value={shipping} onChange={e => setShipping(e.target.value)}>
                <FormControlLabel value="Yes" control={<Radio size="small" />} label={<Typography variant="body2">Yes</Typography>} />
                <FormControlLabel value="No" control={<Radio size="small" />} label={<Typography variant="body2">No</Typography>} />
              </RadioGroup>
            </Box>

            <TextField label="Sales quote" fullWidth size="small" placeholder="% 0" sx={fieldSx} />
            <TextField
              label="Year of birth"
              fullWidth
              size="small"
              type="date"
              slotProps={{ inputLabel: { shrink: true } }}
              sx={fieldSx}
            />
          </Col>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Action buttons */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FlatButton
            variant="contained"
            sx={{ bgcolor: BACKOFFICE_COLORS.primary, '&:hover': { bgcolor: BACKOFFICE_COLORS.primaryDark }, minWidth: 88 }}
          >
            Save
          </FlatButton>
          <FlatButton
            variant="text"
            color="inherit"
            sx={{ minWidth: 88, color: UI_COLORS.textMedium }}
            onClick={() => router.history.back()}
          >
            Cancel
          </FlatButton>
          <Box sx={{ flex: 1 }} />
          <FlatButton variant="outlined" color="error" sx={{ minWidth: 88 }}>
            Delete
          </FlatButton>
        </Box>
      </ContentPaper>
    </Box>
  )
}
