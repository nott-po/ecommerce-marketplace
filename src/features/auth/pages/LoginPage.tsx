import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import Divider from '@mui/material/Divider'
import CircularProgress from '@mui/material/CircularProgress'
import { useAuth } from '../AuthContext'
import { useRouter } from '@tanstack/react-router'
import { BACKOFFICE_COLORS, BRAND_COLORS, UI_COLORS } from '../../../styles/theme'

const DEMO_ACCOUNTS = [
  { label: 'User account', username: 'averyp', password: 'averyppass', role: 'user' },
  { label: 'Admin account', username: 'emilys', password: 'emilyspass', role: 'admin' },
]

const fieldSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: 1.5,
    bgcolor: UI_COLORS.bgSubtle,
  },
}

export const LoginPage: React.FC = () => {
  const { login } = useAuth()
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!username.trim() || !password.trim()) return
    setError('')
    setLoading(true)
    try {
      await login(username.trim(), password.trim())
      const role = localStorage.getItem('auth_role')
      router.history.push(role === 'admin' ? '/backoffice' : '/shop')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const fillDemo = (u: string, p: string) => {
    setUsername(u)
    setPassword(p)
    setError('')
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: UI_COLORS.bgPage,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
      }}
    >
      {/* Logo */}
      <Box
        component="img"
        src="/logo2.svg"
        alt="2nd Hand Market"
        sx={{ height: 72, mb: 3 }}
      />

      <Paper
        sx={{
          width: '100%',
          maxWidth: 420,
          p: 4,
          borderRadius: 2,
          border: `1px solid ${UI_COLORS.border}`,
          boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5, textAlign: 'center' }}>
          Welcome back
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mb: 3 }}>
          Sign in to continue to 2nd Hand Market
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2, borderRadius: 1.5 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Username"
            fullWidth
            size="small"
            autoComplete="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            sx={fieldSx}
            autoFocus
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            size="small"
            autoComplete="current-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            sx={fieldSx}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading || !username.trim() || !password.trim()}
            sx={{
              mt: 0.5,
              py: 1.1,
              borderRadius: 1.5,
              fontWeight: 600,
              fontSize: '0.9375rem',
              boxShadow: 'none',
              '&:hover': { boxShadow: 'none' },
            }}
          >
            {loading ? <CircularProgress size={20} sx={{ color: 'white' }} /> : 'Sign In'}
          </Button>
        </Box>

        <Divider sx={{ my: 3 }}>
          <Typography variant="caption" color="text.secondary">
            Demo accounts
          </Typography>
        </Divider>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {DEMO_ACCOUNTS.map(acc => (
            <Box
              key={acc.username}
              onClick={() => fillDemo(acc.username, acc.password)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                border: `1px solid ${UI_COLORS.border}`,
                borderRadius: 1.5,
                px: 1.75,
                py: 1,
                cursor: 'pointer',
                '&:hover': { bgcolor: UI_COLORS.bgSubtle, borderColor: UI_COLORS.borderHover },
                transition: 'all 0.15s',
              }}
            >
              <Box>
                <Typography sx={{ fontSize: '0.8125rem', fontWeight: 600, color: UI_COLORS.textMedium }}>
                  {acc.label}
                </Typography>
                <Typography sx={{ fontSize: '0.75rem', color: UI_COLORS.textTertiary }}>
                  {acc.username} / {acc.password}
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  px: 1,
                  py: 0.25,
                  borderRadius: 1,
                  bgcolor: acc.role === 'admin' ? BACKOFFICE_COLORS.navBg : BRAND_COLORS.saleBg,
                  color: acc.role === 'admin' ? 'white' : BRAND_COLORS.primary,
                  border: acc.role === 'admin' ? 'none' : `1px solid ${BRAND_COLORS.primaryBorder}`,
                }}
              >
                {acc.role}
              </Typography>
            </Box>
          ))}
        </Box>
      </Paper>
    </Box>
  )
}
