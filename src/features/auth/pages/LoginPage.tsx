import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import Divider from '@mui/material/Divider'
import CircularProgress from '@mui/material/CircularProgress'
import { styled } from '@mui/material/styles'
import { useRouter } from '@tanstack/react-router'
import { BACKOFFICE_COLORS, BRAND_COLORS, SHADOWS, UI_COLORS } from '../../../styles/theme'
import { FlatButton } from '../../../shared/ui/FlatButton'
import { ContentPaper } from '../../../shared/ui/ContentPaper'
import { ClickableRow } from '../../../shared/ui/ClickableRow'
import { RoundedTextField } from '../../../shared/ui/RoundedTextField'
import { useLoginMutation } from '../lib/queries'

const DEMO_ACCOUNTS = [
  { label: 'User account', username: 'averyp', password: 'averyppass', role: 'user' },
  { label: 'Admin account', username: 'emilys', password: 'emilyspass', role: 'admin' },
]

const LoginPageRoot = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  backgroundColor: UI_COLORS.bgPage,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(0, 2),
}))

const LoginTextField = styled(RoundedTextField)({
  '& .MuiOutlinedInput-root': {
    backgroundColor: UI_COLORS.bgSubtle,
  },
})

const LoginSubmitButton = styled(FlatButton)(({ theme }) => ({
  fontWeight: 600,
  fontSize: theme.typography.labelLg.fontSize,
}))

const DemoAccountLabel = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.body2.fontSize,
  fontWeight: 600,
  color: UI_COLORS.textMedium,
}))

const DemoAccountCredentials = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.caption.fontSize,
  color: UI_COLORS.textTertiary,
}))

const RoleBadge = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'isAdmin',
})<{ isAdmin: boolean }>(({ theme, isAdmin }) => ({
  fontSize: theme.typography.caption.fontSize,
  fontWeight: 600,
  padding: theme.spacing(0.25, 1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: isAdmin ? BACKOFFICE_COLORS.navBg : BRAND_COLORS.saleBg,
  color: isAdmin ? 'white' : BRAND_COLORS.primary,
  border: isAdmin ? 'none' : `1px solid ${BRAND_COLORS.primaryBorder}`,
}))

export const LoginPage: React.FC = () => {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { mutate: login, isPending, error } = useLoginMutation()

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!username.trim() || !password.trim()) return
    login(
      { username: username.trim(), password: password.trim() },
      { onSuccess: (user) => router.history.push(user.role === 'admin' ? '/backoffice' : '/shop') },
    )
  }

  const fillDemo = (u: string, p: string) => {
    setUsername(u)
    setPassword(p)
  }

  return (
    <LoginPageRoot>
      <Box
        component="img"
        src="/logo2.svg"
        alt="2nd Hand Market"
        sx={{ height: 72, mb: 3 }}
      />

      <ContentPaper sx={{ width: '100%', maxWidth: 420, p: 4, boxShadow: SHADOWS.paper }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5, textAlign: 'center' }}>
          Welcome back
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mb: 3 }}>
          Sign in to continue to 2nd Hand Market
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2, borderRadius: 1.5 }}>
            {error.message}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <LoginTextField
            label="Username"
            fullWidth
            size="small"
            autoComplete="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            autoFocus
          />
          <LoginTextField
            label="Password"
            type="password"
            fullWidth
            size="small"
            autoComplete="current-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <LoginSubmitButton
            type="submit"
            variant="contained"
            fullWidth
            disabled={isPending || !username.trim() || !password.trim()}
            sx={{ mt: 0.5, py: 1.1 }}
          >
            {isPending ? <CircularProgress size={20} sx={{ color: 'white' }} /> : 'Sign In'}
          </LoginSubmitButton>
        </Box>

        <Divider sx={{ my: 3 }}>
          <Typography variant="caption" color="text.secondary">
            Demo accounts
          </Typography>
        </Divider>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {DEMO_ACCOUNTS.map(acc => (
            <ClickableRow key={acc.username} onClick={() => fillDemo(acc.username, acc.password)}>
              <Box>
                <DemoAccountLabel>{acc.label}</DemoAccountLabel>
                <DemoAccountCredentials>
                  {acc.username} / {acc.password}
                </DemoAccountCredentials>
              </Box>
              <RoleBadge isAdmin={acc.role === 'admin'}>{acc.role}</RoleBadge>
            </ClickableRow>
          ))}
        </Box>
      </ContentPaper>
    </LoginPageRoot>
  )
}
