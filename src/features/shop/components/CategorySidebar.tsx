import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { styled } from '@mui/material/styles'
import { CATEGORY_HIERARCHY, type CategoryGroup, type CategoryLeaf } from '../../../utils/constants'
import { BRAND_COLORS, UI_COLORS } from '../../../styles/theme'

const SidebarRoot = styled(Box)({
  width: 210,
  flexShrink: 0,
  backgroundColor: '#fff',
  borderRight: `1px solid ${UI_COLORS.border}`,
  minHeight: '100%',
  paddingBottom: 24,
})

interface CategorySidebarProps {
  selectedCategory: string
  onSelect: (slug: string) => void
}

interface LeafItemProps {
  leaf: CategoryLeaf
  depth: number
  selectedCategory: string
  onSelect: (slug: string) => void
}

const LeafItem: React.FC<LeafItemProps> = ({ leaf, depth, selectedCategory, onSelect }) => {
  const [open, setOpen] = useState(false)
  const hasChildren = leaf.children && leaf.children.length > 0
  const isSelected = selectedCategory === leaf.slug

  return (
    <>
      <ListItemButton
        selected={isSelected}
        onClick={() => {
          if (hasChildren) {
            setOpen(prev => !prev)
          } else {
            onSelect(isSelected ? '' : leaf.slug)
          }
        }}
        sx={{
          pl: 2 + depth * 1.5,
          py: 0.5,
          borderRadius: 1,
          '&.Mui-selected': {
            bgcolor: BRAND_COLORS.primaryAlpha12,
            color: BRAND_COLORS.primary,
            '&:hover': { bgcolor: BRAND_COLORS.primaryAlpha12 },
          },
        }}
      >
        <ListItemText
          primary={leaf.label}
          slotProps={{
            primary: { style: { fontSize: '0.825rem', fontWeight: isSelected ? 600 : 400 } },
          }}
        />
        {hasChildren ? (
          open ? (
            <ExpandLessIcon fontSize="small" />
          ) : (
            <ExpandMoreIcon fontSize="small" />
          )
        ) : null}
      </ListItemButton>

      {hasChildren && (
        <Collapse in={open} timeout="auto">
          <List disablePadding>
            {leaf.children!.map(child => (
              <LeafItem
                key={child.slug}
                leaf={child}
                depth={depth + 1}
                selectedCategory={selectedCategory}
                onSelect={onSelect}
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  )
}

interface GroupItemProps {
  group: CategoryGroup
  selectedCategory: string
  onSelect: (slug: string) => void
}

const GroupItem: React.FC<GroupItemProps> = ({ group, selectedCategory, onSelect }) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <ListItemButton
        onClick={() => setOpen(prev => !prev)}
        sx={{ py: 0.75, px: 2, borderRadius: 1 }}
      >
        <ListItemText
          primary={group.label}
          slotProps={{
            primary: { style: { fontSize: '0.875rem', fontWeight: 600 } },
          }}
        />
        {open ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
      </ListItemButton>

      <Collapse in={open} timeout="auto">
        <List disablePadding>
          {group.children.map(leaf => (
            <LeafItem
              key={leaf.slug}
              leaf={leaf}
              depth={1}
              selectedCategory={selectedCategory}
              onSelect={onSelect}
            />
          ))}
        </List>
      </Collapse>
    </>
  )
}

export const CategorySidebar: React.FC<CategorySidebarProps> = ({ selectedCategory, onSelect }) => (
  <SidebarRoot>
    <Box sx={{ px: 2, pt: 2.5, pb: 1 }}>
      <Typography
        variant="caption"
        sx={{
          fontWeight: 700,
          letterSpacing: '0.08em',
          color: 'text.secondary',
          textTransform: 'uppercase',
        }}
      >
        Categories
      </Typography>
    </Box>

    <List disablePadding sx={{ px: 1 }}>
      <ListItemButton
        selected={selectedCategory === ''}
        onClick={() => onSelect('')}
        sx={{
          borderRadius: 1,
          py: 0.75,
          '&.Mui-selected': {
            bgcolor: BRAND_COLORS.primaryAlpha12,
            color: BRAND_COLORS.primary,
          },
        }}
      >
        <ListItemText
          primary="All Products"
          slotProps={{
            primary: {
              style: { fontSize: '0.875rem', fontWeight: selectedCategory === '' ? 600 : 400 },
            },
          }}
        />
      </ListItemButton>

      {CATEGORY_HIERARCHY.map(group => (
        <GroupItem
          key={group.id}
          group={group}
          selectedCategory={selectedCategory}
          onSelect={onSelect}
        />
      ))}
    </List>
  </SidebarRoot>
)
