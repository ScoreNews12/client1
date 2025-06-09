
import AuthForm from '@/components/auth/AuthForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login / Sign Up - EchoThread',
  description: 'Login or create an account to join EchoThread.',
};

export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <AuthForm />
    </div>
  );
}
