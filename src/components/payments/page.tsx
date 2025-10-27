import { columns, User } from './columns';
import { DataTable } from './data-table';
import { useState, useEffect } from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import axios from 'axios';
import { usePostStore } from '@/store/postStore';

export default function DemoPage() {
  const [apiData, setApiData] = useState<User[]>([]);
  const { newPosts, addPost } = usePostStore();
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [alertOpen, setAlertOpen] = useState(false);

  useEffect(() => {
    axios
      .get('https://dummyjson.com/users')
      .then((res) => {
        const users: User[] = res.data.users.map((user: any) => ({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          age: user.age,
          email: user.email,
          phone: user.phone,
          birthDate: user.birthDate,
        }));
        setApiData(users);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="container mx-auto py-10">Loading...</div>;
  }

  const handleAddData = (data: User) => {
    console.log('handleAddData received:', data);
    addPost(data);
    setSuccessMessage('User added successfully');
    setAlertOpen(true);
  };

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-bold">Users Data</h2>
        {successMessage ? (
          <div className="mb-4 rounded-md bg-green-50 p-3 text-sm text-green-800">
            {successMessage}
          </div>
        ) : null}
        <DataTable columns={columns} data={apiData} onAddData={handleAddData} />
      </div>

      {newPosts.length > 0 && (
        <div>
          <h2 className="mb-4 text-2xl font-bold">Newly Added Users</h2>
          <DataTable columns={columns} data={newPosts} onAddData={handleAddData} />
        </div>
      )}

      <AlertDialog open={alertOpen} onOpenChange={(open) => { setAlertOpen(open); if (!open) setSuccessMessage(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Success</AlertDialogTitle>
            <AlertDialogDescription>
              {successMessage ?? 'User added successfully'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
