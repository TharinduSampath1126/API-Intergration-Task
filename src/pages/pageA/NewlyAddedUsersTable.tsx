import { columns, User } from '@/components/data-table/columns';
import { DataTable } from '@/components/data-table/data-table';
import RowsPerPageSelect from '@/components/customUi/rows-per-page-select';
import { usePostStore } from '@/store/postStore';
import React from 'react';
import { Input } from '@/components/ui/input';
import { DataTablePagination } from '@/components/customUi/pagination';
import { Button } from '@/components/ui/button';
import { UserForm } from '@/components/form/add-post-form';
import TableColumnsDropdown from '@/components/data-table/table-columns-dropdown';
import SuccessAlert from '@/components/customUi/success-alert';

type Props = {
  data?: User[];
  onAddData?: (data: User) => void;
};

export default function NewlyAddedUsersTable({ data, onAddData }: Props) {
  const { newPosts, addPost } = usePostStore();
  const [addOpen, setAddOpen] = React.useState(false);
  const [successOpen, setSuccessOpen] = React.useState(false);

  const [table, setTable] = React.useState<any | null>(null);
  // pagination state (data-driven)
  const [currentPage, setCurrentPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);

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

  const handleAdd = (d: User) => {
    if (onAddData) return onAddData(d);
    addPost(d);
  };

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">Newly Added Users</h2>

      <div className="flex justify-between">
        <Input
          placeholder="Filter names..."
          value={(getColumn('firstName')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            getColumn('firstName')?.setFilterValue?.(event.target.value)
          }
          className="mb-4 max-w-sm"
        />

        <div className="flex gap-5">
          <TableColumnsDropdown table={table} />

          <Button onClick={() => setAddOpen(true)}>Add Data</Button>
        </div>
      </div>

      <UserForm
        open={addOpen}
        onOpenChange={setAddOpen}
        onSubmit={async (d) => {
          // support sync or async handlers
          await Promise.resolve(handleAdd(d as User));
          setAddOpen(false);
          setSuccessOpen(true);
        }}
      />

      <SuccessAlert open={successOpen} onOpenChange={setSuccessOpen} />

      <DataTable
        columns={columns}
        data={data ?? newPosts ?? []}
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

        <DataTablePagination
          data={data ?? newPosts ?? []}
          pageSize={pageSize}
          pageIndex={currentPage}
          onPageChange={setCurrentPage}
          showPageJump={true}
        />
      </div>
    </div>
  );
}
