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
import { styled } from '@mui/material/styles'
import { useRouter } from '@tanstack/react-router'
import { BACKOFFICE_COLORS, UI_COLORS } from '../../../styles/theme'
import { FlatButton } from '../../../shared/ui/FlatButton'
import { ContentPaper } from '../../../shared/ui/ContentPaper'

const inputInnerSx = {
  bgcolor: UI_COLORS.bgForm,
  borderRadius: 1.5,
  '& fieldset': { border: 'none' },
  '&:hover fieldset': { border: 'none' },
  '&.Mui-focused fieldset': { border: `1.5px solid ${BACKOFFICE_COLORS.primary}` },
}


const fieldSx = {
  '& .MuiOutlinedInput-root': inputInnerSx,
  '& .MuiInputLabel-root': { fontSize: '0.875rem' },
}

const selectSx = inputInnerSx

const FieldGroupLabel = styled(FormLabel)(({ theme }) => ({
  fontSize: theme.typography.caption.fontSize,
  color: UI_COLORS.textSecondary,
  display: 'block',
  marginBottom: theme.spacing(0.25),
}))

const FieldInputLabel = styled(InputLabel)(({ theme }) => ({
  fontSize: theme.typography.body2.fontSize,
}))

const Col: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1, minWidth: 0 }}>
    {children}
  </Box>
)

export const AddUserPage: React.FC = () => {
  const router = useRouter()

  const [client, setClient] = useState('')
  const [archived, setArchived] = useState('No')
  const [active, setActive] = useState('No')
  const [bringClientNumber, setBringClientNumber] = useState('')
  const [salutation, setSalutation] = useState('')
  const [name, setName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [mobile, setMobile] = useState('')
  const [street, setStreet] = useState('')
  const [houseNumber, setHouseNumber] = useState('')
  const [zip, setZip] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [paypal, setPaypal] = useState('')
  const [contractSigned, setContractSigned] = useState('')
  const [notes, setNotes] = useState('')
  const [shipping, setShipping] = useState('Yes')
  const [salesQuote, setSalesQuote] = useState('')
  const [yearOfBirth, setYearOfBirth] = useState('')

  const handleSave = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.history.back()
  }

  const handleDelete = () => {
    if (window.confirm('Delete this user? This action cannot be undone.')) {
      router.history.back()
    }
  }

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
        <Box component="form" onSubmit={handleSave}>
          <Typography sx={{ fontSize: '1.125rem', fontWeight: 700, mb: 3, color: UI_COLORS.textPrimary }}>
            Add New User
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
            {/* Left column */}
            <Col>
              <TextField
                label="Client *"
                fullWidth
                size="small"
                placeholder="____-____-____-____"
                value={client}
                onChange={e => setClient(e.target.value)}
                sx={fieldSx}
              />

              <Box sx={{ display: 'flex', gap: 4 }}>
                <Box>
                  <FieldGroupLabel>
                    Archived
                  </FieldGroupLabel>
                  <RadioGroup row value={archived} onChange={e => setArchived(e.target.value)}>
                    <FormControlLabel value="Yes" control={<Radio size="small" />} label={<Typography variant="body2">Yes</Typography>} />
                    <FormControlLabel value="No" control={<Radio size="small" />} label={<Typography variant="body2">No</Typography>} />
                  </RadioGroup>
                </Box>
                <Box>
                  <FieldGroupLabel>
                    Active
                  </FieldGroupLabel>
                  <RadioGroup row value={active} onChange={e => setActive(e.target.value)}>
                    <FormControlLabel value="Yes" control={<Radio size="small" />} label={<Typography variant="body2">Yes</Typography>} />
                    <FormControlLabel value="No" control={<Radio size="small" />} label={<Typography variant="body2">No</Typography>} />
                  </RadioGroup>
                </Box>
              </Box>

              <TextField
                label="Bring client number *"
                fullWidth
                size="small"
                placeholder="____"
                value={bringClientNumber}
                onChange={e => setBringClientNumber(e.target.value)}
                sx={fieldSx}
              />

              <FormControl fullWidth size="small">
                <FieldInputLabel>Salutation</FieldInputLabel>
                <Select label="Salutation" value={salutation} onChange={e => setSalutation(e.target.value)} sx={selectSx}>
                  <MenuItem value="mr">Mr.</MenuItem>
                  <MenuItem value="ms">Ms.</MenuItem>
                  <MenuItem value="mrs">Mrs.</MenuItem>
                  <MenuItem value="dr">Dr.</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Name *"
                fullWidth
                size="small"
                value={name}
                onChange={e => setName(e.target.value)}
                sx={fieldSx}
              />
              <TextField
                label="First name"
                fullWidth
                size="small"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                sx={fieldSx}
              />
              <TextField
                label="Email address *"
                fullWidth
                size="small"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                sx={fieldSx}
              />
              <TextField
                label="Phone number"
                fullWidth
                size="small"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                sx={fieldSx}
              />
            </Col>

            {/* Middle column */}
            <Col>
              <TextField
                label="Mobile number"
                fullWidth
                size="small"
                value={mobile}
                onChange={e => setMobile(e.target.value)}
                sx={fieldSx}
              />
              <TextField
                label="Street *"
                fullWidth
                size="small"
                value={street}
                onChange={e => setStreet(e.target.value)}
                sx={fieldSx}
              />
              <TextField
                label="Number *"
                fullWidth
                size="small"
                value={houseNumber}
                onChange={e => setHouseNumber(e.target.value)}
                sx={fieldSx}
              />
              <TextField
                label="ZIP code *"
                fullWidth
                size="small"
                placeholder="ZIP code (4-5 digits)"
                value={zip}
                onChange={e => setZip(e.target.value)}
                sx={fieldSx}
              />
              <TextField
                label="City *"
                fullWidth
                size="small"
                value={city}
                onChange={e => setCity(e.target.value)}
                sx={fieldSx}
              />

              <FormControl fullWidth size="small">
                <FieldInputLabel>Country *</FieldInputLabel>
                <Select label="Country *" value={country} onChange={e => setCountry(e.target.value)} sx={selectSx}>
                  <MenuItem value="AT">Austria</MenuItem>
                  <MenuItem value="DE">Germany</MenuItem>
                  <MenuItem value="CH">Switzerland</MenuItem>
                  <MenuItem value="PL">Poland</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Paypal account"
                fullWidth
                size="small"
                value={paypal}
                onChange={e => setPaypal(e.target.value)}
                sx={fieldSx}
              />
              <TextField
                label="Contract signed"
                fullWidth
                size="small"
                type="date"
                value={contractSigned}
                onChange={e => setContractSigned(e.target.value)}
                slotProps={{ inputLabel: { shrink: true } }}
                sx={fieldSx}
              />
            </Col>

            {/* Right column */}
            <Col>
              <TextField
                label="Notes"
                fullWidth
                multiline
                rows={6}
                size="small"
                value={notes}
                onChange={e => setNotes(e.target.value)}
                sx={fieldSx}
              />

              <Box>
                <FieldGroupLabel>
                  Shipping
                </FieldGroupLabel>
                <RadioGroup row value={shipping} onChange={e => setShipping(e.target.value)}>
                  <FormControlLabel value="Yes" control={<Radio size="small" />} label={<Typography variant="body2">Yes</Typography>} />
                  <FormControlLabel value="No" control={<Radio size="small" />} label={<Typography variant="body2">No</Typography>} />
                </RadioGroup>
              </Box>

              <TextField
                label="Sales quote"
                fullWidth
                size="small"
                placeholder="% 0"
                value={salesQuote}
                onChange={e => setSalesQuote(e.target.value)}
                sx={fieldSx}
              />
              <TextField
                label="Year of birth"
                fullWidth
                size="small"
                type="date"
                value={yearOfBirth}
                onChange={e => setYearOfBirth(e.target.value)}
                slotProps={{ inputLabel: { shrink: true } }}
                sx={fieldSx}
              />
            </Col>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Action buttons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FlatButton
              type="submit"
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
            <FlatButton variant="outlined" color="error" sx={{ minWidth: 88 }} onClick={handleDelete}>
              Delete
            </FlatButton>
          </Box>
        </Box>
      </ContentPaper>
    </Box>
  )
}
