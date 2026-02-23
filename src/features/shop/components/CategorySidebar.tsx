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

const CategoriesLabel = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  letterSpacing: '0.08em',
  color: theme.palette.text.secondary,
  textTransform: 'uppercase',
}))

const SidebarRootButton = styled(ListItemButton)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  paddingTop: theme.spacing(0.75),
  paddingBottom: theme.spacing(0.75),
  '&.Mui-selected': {
    backgroundColor: BRAND_COLORS.primaryAlpha12,
    color: BRAND_COLORS.primary,
    '& .MuiListItemText-primary': { fontWeight: 600 },
  },
}))

const SidebarGroupButton = styled(ListItemButton)(({ theme }) => ({
  paddingTop: theme.spacing(0.75),
  paddingBottom: theme.spacing(0.75),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
}))

const SidebarLeafButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'depth',
})<{ depth: number }>(({ theme, depth }) => ({
  paddingLeft: theme.spacing(2 + depth * 1.5),
  paddingTop: theme.spacing(0.5),
  paddingBottom: theme.spacing(0.5),
  borderRadius: theme.shape.borderRadius,
  '&.Mui-selected': {
    backgroundColor: BRAND_COLORS.primaryAlpha12,
    color: BRAND_COLORS.primary,
    '&:hover': { backgroundColor: BRAND_COLORS.primaryAlpha12 },
    '& .MuiListItemText-primary': { fontWeight: 600 },
  },
}))

const SidebarItemText = styled(ListItemText)(({ theme }) => ({
  '& .MuiListItemText-primary': {
    fontSize: theme.typography.body2.fontSize,
  },
}))

const SidebarGroupText = styled(ListItemText)(({ theme }) => ({
  '& .MuiListItemText-primary': {
    fontSize: theme.typography.labelMd.fontSize,
    fontWeight: 600,
  },
}))

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
      <SidebarLeafButton
        selected={isSelected}
        depth={depth}
        onClick={() => {
          if (hasChildren) {
            setOpen(prev => !prev)
          } else {
            onSelect(isSelected ? '' : leaf.slug)
          }
        }}
      >
        <SidebarItemText primary={leaf.label} />
        {hasChildren ? (
          open ? (
            <ExpandLessIcon fontSize="small" />
          ) : (
            <ExpandMoreIcon fontSize="small" />
          )
        ) : null}
      </SidebarLeafButton>

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
      <SidebarGroupButton onClick={() => setOpen(prev => !prev)}>
        <SidebarGroupText primary={group.label} />
        {open ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
      </SidebarGroupButton>

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
      <CategoriesLabel variant="caption">Categories</CategoriesLabel>
    </Box>

    <List disablePadding sx={{ px: 1 }}>
      <SidebarRootButton
        selected={selectedCategory === ''}
        onClick={() => onSelect('')}
      >
        <SidebarGroupText primary="All Products" />
      </SidebarRootButton>

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
