import React from 'react';
import { columns, User } from '@/components/data-table/columns';
import { DataTable } from '@/components/data-table/data-table';

type Props = {
  data: User[];
  onAddData: (data: User) => void;
};

export default function UsersTable({ data, onAddData }: Props) {
  return (
    <div className="mb-8">
      <h2 className="mb-4 text-2xl font-bold">Users Data</h2>
      <DataTable columns={columns} data={data || []} onAddData={onAddData} />
    </div>
  );
}
