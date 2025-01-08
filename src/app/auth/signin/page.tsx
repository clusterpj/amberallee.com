import { login, signup } from './actions'

export default function LoginPage({
  searchParams,
}: {
  searchParams: { message: string; email?: string }
}) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-center text-3xl font-bold">Sign in</h2>
        {searchParams.message && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {searchParams.message}
          </div>
        )}
        <form className="mt-8 space-y-6">
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-3 py-2 border rounded"
              placeholder="Email"
              defaultValue={searchParams.email || ''}
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-3 py-2 border rounded"
              placeholder="Password"
            />
          </div>
          <button
            formAction={login}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Sign in
          </button>
          <button
            formAction={signup}
            className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  )
}
