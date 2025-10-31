import React from 'react';
import { Button } from '@/components/ui/button';
import TableColumnsDropdown from './table-columns-dropdown';
import RowsPerPageSelect from '@/components/customUi/rows-per-page-select';

import { UserForm } from '@/components/form/add-post-form';

import { ColumnDef, flexRender } from '@tanstack/react-table';
import { useAppTable } from '@/hooks/useAppTable';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import SuccessAlert from '@/components/customUi/success-alert';
import { usePostStore } from '@/store/postStore';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onAddData?: (newData: any) => void;
  onTableChange?: (table: any) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onTableChange,
}: DataTableProps<TData, TValue>) {
  const lastDeleted = usePostStore((s) => s.lastDeleted);
  const clearLastDeleted = usePostStore((s) => s.clearLastDeleted);

  const { table, columnFilters, setColumnFilters, columnVisibility, setColumnVisibility } = useAppTable(data, columns);

  // expose a small reactive API to parent so external pagination controls
  // receive updates only when relevant table state changes. We memoize
  // the API and only call the parent's setter when the memoized object
  // changes to avoid infinite update loops.
  const api = React.useMemo(() => {
    return {
      table,
      pageIndex: table.getState().pagination.pageIndex,
      pageSize: table.getState().pagination.pageSize,
      pageCount: table.getPageCount(),
      canPrevious: table.getCanPreviousPage(),
      canNext: table.getCanNextPage(),
      setPageSize: (s: number) => table.setPageSize(s),
      setPageIndex: (i: number) => table.setPageIndex(i),
      previousPage: () => table.previousPage(),
      nextPage: () => table.nextPage(),
  // expose column filters and visibility so parents re-render when they change
  columnFilters,
  setColumnFilters,
  columnVisibility,
  setColumnVisibility,
    };
    // include the primitive values/readers used above as dependencies so
    // the memo updates only when these change.
  }, [
    table,
    table.getState().pagination.pageIndex,
    table.getState().pagination.pageSize,
    table.getPageCount(),
    table.getCanPreviousPage(),
    table.getCanNextPage(),
    // re-run memo when columnFilters OR columnVisibility change so external
    // controls (filter inputs and column visibility dropdown) update
    columnFilters,
    columnVisibility,
  ]);

  React.useEffect(() => {
    if (typeof onTableChange === 'function') {
      onTableChange(api);
    }
  }, [onTableChange, api]);

  

  return (
    <div>
      <>
        <SuccessAlert
          open={Boolean(lastDeleted)}
          onOpenChange={(v) => {
            if (!v) clearLastDeleted?.();
          }}
          title="Deleted"
          message={lastDeleted ? `${lastDeleted.firstName} ${lastDeleted.lastName} was deleted successfully.` : undefined}
        />

        <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        </div>
      </>
    </div>
  );
}

export default DataTable;
