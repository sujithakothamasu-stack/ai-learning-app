import { AuthForm } from '@/components/sections/auth-form'

export const metadata = {
  title: 'Sign In | Learn AI',
  description: 'Sign in to your Learn AI account',
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <AuthForm type="login" />
    </div>
  )
}
