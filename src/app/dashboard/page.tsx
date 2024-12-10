'use client'

import { useAuth } from '@/hooks/useAuth'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function DashboardPage() {
  const { user } = useAuth()

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-primary">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Welcome Card */}
        <Card className="col-span-full bg-white shadow-lg border-accent/20">
          <CardHeader>
            <CardTitle className="text-2xl">
              Welcome back, {user?.email?.split('@')[0]}!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              This is your personal dashboard where you can manage your account and access exclusive content.
            </p>
          </CardContent>
        </Card>

        {/* Account Info */}
        <Card className="bg-white shadow-lg border-accent/20">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Email:</span> {user?.email}
              </p>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Role:</span> {user?.role}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-white shadow-lg border-accent/20">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>
                <a href="/profile" className="text-secondary hover:text-secondary-hover">
                  Edit Profile
                </a>
              </li>
              {user?.role === 'admin' && (
                <li>
                  <a href="/admin/dashboard" className="text-secondary hover:text-secondary-hover">
                    Admin Dashboard
                  </a>
                </li>
              )}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
