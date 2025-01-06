import { redirect } from 'next/navigation'

export default function CallbackPage() {
  // This will handle the redirect after the API route processes the auth
  redirect('/')
}
