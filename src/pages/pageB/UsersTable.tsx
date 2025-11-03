import { DataTablePagination } from '@/components/customUi/pagination';
import RowsPerPageSelect from '@/components/customUi/rows-per-page-select';
import React from 'react';
import { columns, User } from '@/components/data-table/columns';
import { useUsers } from '@/hooks/useUserQueries';
import { Input } from '@/components/ui/input';
import TableColumnsDropdown from '@/components/data-table/table-columns-dropdown';
import SuccessAlert from '@/components/customUi/success-alert';
import UsersTableComponent from './tables/users-table';

type Props = {
  data?: User[];
};

export default function UsersTable({ data }: Props) {
  const { data: apiData } = useUsers();
  const [table, setTable] = React.useState<any | null>(null);
  const [successOpen, setSuccessOpen] = React.useState(false);

  // State for data-based pagination
  const [currentPage, setCurrentPage] = React.useState(0);
  const [pageSize] = React.useState(10);

  // Get the actual data array for pagination
  const actualData = data ?? apiData ?? [];

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

  // Build a lightweight columns array for the dropdown and a toggle handler
  const dropdownColumns = React.useMemo(() => {
    return columns.map((col: any) => {
      const id = col.id ?? col.accessorKey;
      const label = typeof col.header === 'string' ? col.header : id;
      const isVisible = getColumn(id)?.getIsVisible?.() ?? true;
      return { id, label, isVisible };
    });
    // include `table` because visibility is read from it when available
  }, [columns, table, getColumn]);

  const handleToggleColumn = React.useCallback(
    (id: string, visible: boolean) => {
      // Prefer the table API if available
      const col = getColumn(id);
      if (col?.toggleVisibility) {
        col.toggleVisibility(visible);
        return;
      }

      // Fallback to setColumnVisibility if provided on the table wrapper
      if (table?.setColumnVisibility) {
        table.setColumnVisibility(id, visible);
        return;
      }
      if (table?.table?.setColumnVisibility) {
        table.table.setColumnVisibility(id, visible);
        return;
      }
    },
    [table, getColumn]
  );

  return (
    <div className="">
      <h2 className="mb-4 text-2xl font-bold">Users Data</h2>

      <div className="mb-5 flex">
        <Input
          placeholder="Filter names..."
          value={(getColumn('firstName')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            getColumn('firstName')?.setFilterValue?.(event.target.value)
          }
          className="max-w-sm"
        />

        <TableColumnsDropdown
          columns={dropdownColumns}
          onToggleColumn={handleToggleColumn}
        />
      </div>

      <SuccessAlert open={successOpen} onOpenChange={setSuccessOpen} />

      <UsersTableComponent 
        data={actualData} 
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
          data={actualData}
          pageSize={pageSize}
          pageIndex={currentPage}
          onPageChange={setCurrentPage}
          showPageJump={true}
        />
      </div>
    </div>
  );
}
