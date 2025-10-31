import { DataTablePagination } from '@/components/customUi/pagination';
import RowsPerPageSelect from '@/components/customUi/rows-per-page-select';
import React from 'react';
import { columns, User } from '@/components/data-table/columns';
import { DataTable } from '@/components/data-table/data-table';
import { useUsers } from '@/hooks/useUserQueries';
import { Input } from '@/components/ui/input';
import TableColumnsDropdown from '@/components/data-table/table-columns-dropdown';
import SuccessAlert from '@/components/customUi/success-alert';

type Props = {
  data?: User[];
};

export default function UsersTable({ data }: Props) {
  const { data: apiData } = useUsers();
  const [table, setTable] = React.useState<any | null>(null);
  const [successOpen, setSuccessOpen] = React.useState(false);

  // helper to support both the raw TanStack table instance and the
  // wrapper API object we pass from DataTable (which contains a `table` field).
  const getColumn = React.useCallback(
    (id: string) => {
      if (!table) return undefined;
      if (typeof table.getColumn === 'function') return table.getColumn(id);
      if (table.table && typeof table.table.getColumn === 'function')
        return table.table.getColumn(id);
      return undefined;
    },
    [table]
  );

  return (
    <div className="mb-8">
      <h2 className="mb-4 text-2xl font-bold">Users Data</h2>

      <div className="flex">
        <Input
          placeholder="Filter names..."
          value={(getColumn('firstName')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            getColumn('firstName')?.setFilterValue?.(event.target.value)
          }
          className="max-w-sm"
        />

        <TableColumnsDropdown table={table} />
      </div>

      <SuccessAlert open={successOpen} onOpenChange={setSuccessOpen} />

      {/* Do NOT pass onAddData here — Add button should only appear on the Newly Added page */}
      <DataTable
        columns={columns}
        data={data ?? apiData ?? []}
        onTableChange={setTable}
      />
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <RowsPerPageSelect
            value={`${table?.pageSize ?? 10}`}
            onValueChange={(value) => table?.setPageSize?.(Number(value))}
            className="h-8 w-[70px]"
          />
        </div>

        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
