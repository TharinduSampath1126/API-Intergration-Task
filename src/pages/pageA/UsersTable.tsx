import { columns, User } from '@/components/data-table/columns';
import { DataTable } from '@/components/data-table/data-table';
import { useUsers } from '@/hooks/useUserQueries';

type Props = {
  data?: User[];
};

export default function UsersTable({ data }: Props) {
  const { data: apiData } = useUsers();

  return (
    <div className="mb-8">
      <h2 className="mb-4 text-2xl font-bold">Users Data</h2>
      {/* Do NOT pass onAddData here — Add button should only appear on the Newly Added page */}
      <DataTable columns={columns} data={data ?? apiData ?? []} />
    </div>
  );
}
