import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { useAddItem } from '../lib/mutations'
import type { AddItemForm } from '../types/backoffice'
import { BACKOFFICE_COLORS } from '../../../styles/theme'
import { slugToLabel } from '../../../utils/formatters'
import { FlatButton } from '../../../shared/ui/FlatButton'

const CATEGORIES = [
  'beauty', 'fragrances', 'skin-care', 'laptops', 'smartphones', 'tablets',
  'mobile-accessories', 'tops', 'womens-dresses', 'mens-shirts', 'mens-shoes',
  'womens-shoes', 'womens-bags', 'womens-jewellery', 'sunglasses', 'mens-watches',
  'womens-watches', 'furniture', 'home-decoration', 'kitchen-accessories', 'sports-accessories',
]

const EMPTY: AddItemForm = { title: '', description: '', price: 0, category: '', stock: 1 }

const fieldSx = {
  '& .MuiOutlinedInput-root': { borderRadius: 1.5 },
  '& label': { fontSize: '0.875rem' },
}

interface AddItemModalProps {
  open: boolean
  onClose: () => void
}

export const AddItemModal: React.FC<AddItemModalProps> = ({ open, onClose }) => {
  const [form, setForm] = useState<AddItemForm>(EMPTY)
  const { mutate, isPending } = useAddItem()
  const set = (patch: Partial<AddItemForm>) => setForm(prev => ({ ...prev, ...patch }))

  const handleSubmit = () => {
    mutate(form, {
      onSuccess: () => {
        setForm(EMPTY)
        onClose()
      },
    })
  }

  const valid = form.title.trim() !== '' && form.category !== '' && form.price > 0

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: 2 } }}>
      <DialogTitle sx={{ fontWeight: 700, fontSize: '1.125rem', pb: 1 }}>Add an Item</DialogTitle>

      <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2.5 }}>
        <TextField label="Title *" fullWidth size="small" value={form.title} onChange={e => set({ title: e.target.value })} sx={fieldSx} />
        <TextField label="Description" fullWidth multiline rows={3} size="small" value={form.description} onChange={e => set({ description: e.target.value })} sx={fieldSx} />
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
          <TextField label="Price (€) *" size="small" type="number" value={form.price || ''} onChange={e => set({ price: Number(e.target.value) })} inputProps={{ min: 0, step: 0.01 }} sx={fieldSx} />
          <TextField label="Stock" size="small" type="number" value={form.stock} onChange={e => set({ stock: Number(e.target.value) })} inputProps={{ min: 1 }} sx={fieldSx} />
        </Box>
        <FormControl fullWidth size="small" sx={fieldSx}>
          <InputLabel>Category *</InputLabel>
          <Select value={form.category} label="Category *" onChange={e => set({ category: e.target.value })} sx={{ borderRadius: 1.5 }}>
            {CATEGORIES.map(c => (
              <MenuItem key={c} value={c}>
                {slugToLabel(c)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
        <FlatButton onClick={onClose} variant="outlined" color="inherit">
          Cancel
        </FlatButton>
        <FlatButton
          onClick={handleSubmit}
          variant="contained"
          disabled={!valid || isPending}
          sx={{ bgcolor: BACKOFFICE_COLORS.primary, '&:hover': { bgcolor: BACKOFFICE_COLORS.primaryDark } }}
        >
          {isPending ? 'Adding…' : 'Add Item'}
        </FlatButton>
      </DialogActions>
    </Dialog>
  )
}
