import { columns, User } from './columns';
import { DataTable } from './data-table';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { usePostStore } from '@/store/postStore';

export default function DemoPage() {
  const [apiData, setApiData] = useState<User[]>([]);
  const { newPosts, addPost } = usePostStore();
  const [loading, setLoading] = useState(true);

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
    addPost(data);
  };

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-bold">Users Data</h2>
        <DataTable columns={columns} data={apiData} onAddData={handleAddData} />
      </div>

      {newPosts.length > 0 && (
        <div>
          <h2 className="mb-4 text-2xl font-bold">Newly Added Users</h2>
          <DataTable columns={columns} data={newPosts} />
        </div>
      )}
    </div>
  );
}
