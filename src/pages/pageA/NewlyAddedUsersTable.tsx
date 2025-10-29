import React from 'react';
import { columns, User } from '@/components/data-table/columns';
import { DataTable } from '@/components/data-table/data-table';

type Props = {
  data: User[];
  onAddData: (data: User) => void;
};

export default function NewlyAddedUsersTable({ data, onAddData }: Props) {
  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">Newly Added Users</h2>
      <DataTable columns={columns} data={data || []} onAddData={onAddData} />
    </div>
  );
}
