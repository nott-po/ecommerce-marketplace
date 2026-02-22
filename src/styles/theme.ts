import { createTheme } from '@mui/material/styles'

// ─── Shop brand colors ────────────────────────────────────────────────────────
export const BRAND_COLORS = {
  primary:        '#E55A63',
  primaryDark:    '#C94850',
  primaryLight:   '#F07B83',
  primaryAlpha12: 'rgba(229, 90, 99, 0.12)',
  saleBg:         '#fff0f3',
  primaryBorder:  '#ffcccc',
} as const

// ─── Backoffice colors ────────────────────────────────────────────────────────
export const BACKOFFICE_COLORS = {
  navBg:       '#3C3C3C',
  primary:     '#1AADE8',
  primaryDark: '#158FC0',
  pageBg:      '#f0f2f5',
} as const

// ─── Semantic status colors (item status + stock availability) ────────────────
export const STATUS_COLORS = {
  inSale:       '#2BB442',
  inProgress:   '#007AFF',
  locked:       '#757575',
  reserved:     '#FF9500',
  sold:         '#FF2D55',
  closedOut:    '#9E9E9E',
  inStock:      '#2BB442',
  lowStock:     '#FF9500',
  outOfStock:   '#FF2D55',
  // Tinted chip backgrounds
  inSaleBg:     '#e6f9ec',
  inProgressBg: '#e8f2ff',
  lockedBg:     '#f3f3f3',
  reservedBg:   '#fff4e5',
  soldBg:       '#fff0f3',
  closedOutBg:  '#f5f5f5',
} as const

// ─── Neutral UI palette ───────────────────────────────────────────────────────
export const UI_COLORS = {
  textPrimary:   '#1a1a1a',
  textMedium:    '#374151',
  textSecondary: '#6b7280',
  textTertiary:  '#9ca3af',
  border:        '#e5e7eb',
  borderHover:   '#d1d5db',
  borderStrong:  '#bbb',
  bgPage:        '#f5f5f5',
  bgSubtle:      '#f9fafb',
  bgActive:      '#f0f0f0',
  bgForm:        '#f5f6f7',
} as const

export const theme = createTheme({
  palette: {
    primary: {
      main:         BRAND_COLORS.primary,
      dark:         BRAND_COLORS.primaryDark,
      light:        BRAND_COLORS.primaryLight,
      contrastText: '#ffffff',
    },
    background: {
      default: UI_COLORS.bgPage,
      paper:   '#ffffff',
    },
    text: {
      primary:   UI_COLORS.textPrimary,
      secondary: UI_COLORS.textSecondary,
    },
    divider: UI_COLORS.border,
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h6:        { fontWeight: 600 },
    subtitle1: { fontWeight: 500 },
    subtitle2: { fontWeight: 600 },
    body2:     { fontSize: '0.8125rem' },
  },
  shape: { borderRadius: 8 },
  components: {
    MuiAppBar: {
      defaultProps: { elevation: 0 },
      styleOverrides: { root: { boxShadow: 'none' } },
    },
    MuiButton: {
      styleOverrides: { root: { textTransform: 'none', fontWeight: 500 } },
    },
    MuiChip: {
      styleOverrides: { root: { fontWeight: 500 } },
    },
    MuiOutlinedInput: {
      styleOverrides: { root: { borderRadius: 8 } },
    },
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: { border: `1px solid ${UI_COLORS.border}`, borderRadius: 10 },
      },
    },
    MuiPaper: {
      defaultProps: { elevation: 0 },
    },
  },
})
