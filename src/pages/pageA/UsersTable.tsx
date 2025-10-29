import { columns, User } from '@/components/data-table/columns';
import { DataTable } from '@/components/data-table/data-table';
import { useUsers } from '@/hooks/useUserQueries';
import { usePostStore } from '@/store/postStore';
import { useNavigate } from 'react-router-dom';

type Props = {
  data?: User[];
  onAddData?: (data: User) => void;
};

export default function UsersTable({ data, onAddData }: Props) {
  const { data: apiData } = useUsers();
  const store = usePostStore();

  const navigate = useNavigate();

  const handleAdd = (d: User) => {
    // prefer passed handler, fallback to store
    if (onAddData) return onAddData(d);
    store.addPost(d);
    // when adding locally, navigate to the Newly Added Users page
    navigate('/newly-added');
  };

  return (
    <div className="mb-8">
      <h2 className="mb-4 text-2xl font-bold">Users Data</h2>
      <DataTable columns={columns} data={data ?? apiData ?? []} onAddData={handleAdd} />
    </div>
  );
}
