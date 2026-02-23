import React, { useState, useEffect } from 'react'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'
import { useDebounce } from '../../hooks/useDebounce'
import { DEBOUNCE_DELAY_MS } from '../../utils/constants'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Search…',
}) => {
  const [localValue, setLocalValue] = useState(value)
  const debounced = useDebounce(localValue, DEBOUNCE_DELAY_MS)

  useEffect(() => {
    onChange(debounced)
  }, [debounced, onChange])

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  return (
    <OutlinedInput
      value={localValue}
      onChange={e => setLocalValue(e.target.value)}
      placeholder={placeholder}
      size="small"
      fullWidth
      startAdornment={
        <InputAdornment position="start">
          <SearchIcon fontSize="small" color="action" />
        </InputAdornment>
      }
      endAdornment={
        localValue ? (
          <InputAdornment position="end">
            <IconButton
              size="small"
              edge="end"
              onClick={() => {
                setLocalValue('')
              }}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          </InputAdornment>
        ) : null
      }
    />
  )
}
