import { AuthForm } from '@/components/sections/auth-form'

export const metadata = {
  title: 'Sign Up | Learn AI',
  description: 'Create your Learn AI account',
}

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <AuthForm type="signup" />
    </div>
  )
}
