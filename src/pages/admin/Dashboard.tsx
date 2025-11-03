import * as React from 'react';
import { Users, BarChart2, Zap } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useUsers } from '@/hooks/useUserQueries';
import { usePostStore } from '@/store/postStore';
import { Button } from '@/components/ui/button';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { data: users = [], isLoading } = useUsers();
  const newPosts = usePostStore((s) => s.newPosts);

  // Combine persisted newly-added users (from local store) with fetched users,
  // placing newly-added users first and avoiding duplicates by id.
  const combinedUsers = React.useMemo(() => {
    if (!users) return newPosts ?? [];
    const existingIds = new Set((newPosts || []).map((p) => p.id));
    const others = (users || []).filter((u: any) => !existingIds.has(u.id));
    return [...(newPosts || []), ...others];
  }, [users, newPosts]);

  return (
    <div className="p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">Overview of users and quick actions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate('/')}>View Users</Button>
          <Button onClick={() => navigate('/newly-added')}>Add User</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-lg bg-white shadow-sm border flex items-center gap-4">
          <div className="p-3 bg-blue-50 rounded-md">
            <Users className="text-blue-600" />
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Total users</div>
            <div className="text-2xl font-semibold">{isLoading ? '…' : combinedUsers.length}</div>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-white shadow-sm border flex items-center gap-4">
          <div className="p-3 bg-green-50 rounded-md">
            <BarChart2 className="text-green-600" />
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Active pages</div>
            <div className="text-2xl font-semibold">2</div>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-white shadow-sm border flex items-center gap-4">
          <div className="p-3 bg-amber-50 rounded-md">
            <Zap className="text-amber-600" />
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Quick actions</div>
            <div className="mt-1 flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => navigate('/')}>Users</Button>
              <Button variant="ghost" size="sm" onClick={() => navigate('/newly-added')}>Add</Button>
            </div>
          </div>
        </div>
      </div>

      <section>
        <h2 className="text-lg font-semibold mb-3">Recent users</h2>
        <div className="bg-white rounded-lg shadow-sm border">
          <ul>
            {(combinedUsers || []).slice(0, 6).map((u: any) => (
              <li key={u.id} className="p-4 border-b last:border-b-0 flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-semibold">
                  {((u.firstName || '').charAt(0) + (u.lastName || '').charAt(0)).toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{u.firstName} {u.lastName}</div>
                  <div className="text-sm text-muted-foreground">{u.email}</div>
                </div>
                <div className="text-sm text-muted-foreground">ID: {u.id}</div>
              </li>
            ))}
            {(!users || users.length === 0) && (
              <li className="p-4 text-muted-foreground">No users available</li>
            )}
          </ul>
        </div>
      </section>
    </div>
  );
}
