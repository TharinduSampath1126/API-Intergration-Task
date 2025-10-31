import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type Props = {
  table: any;
};

export function TableColumnsDropdown({ table }: Props) {
  // support both the raw TanStack table instance and the wrapper API
  // object we sometimes pass from parent (which may contain a `table` field)
  const realTable = table?.table ?? table;

  const allColumns = (realTable?.getAllColumns?.() ?? []).filter(
    (column: any) => column.getCanHide?.()
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="ml-auto" disabled={!realTable}>
          Columns
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {allColumns.map((column: any) => {
          return (
            <DropdownMenuCheckboxItem
              key={column.id}
              className="capitalize"
              checked={column.getIsVisible?.()}
              onCheckedChange={(value: any) => column.toggleVisibility?.(!!value)}
            >
              {column.id}
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default TableColumnsDropdown;
