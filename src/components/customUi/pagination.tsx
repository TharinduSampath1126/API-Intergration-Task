import { Table } from "@tanstack/react-table"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface DataTablePaginationProps<TData> {
  // accepts either the TanStack Table or the lightweight API object
  table?: Table<TData> | null | any
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  // Support both the raw TanStack `table` instance and the wrapper API
  // we pass from DataTable. This keeps external controls reactive.
  let pageIndex = 0
  let pageCount = 0
  let canPrevious = false
  let canNext = false
  let setPageIndex: ((i: number) => void) | undefined
  let setPageSize: ((s: number) => void) | undefined
  let previous: (() => void) | undefined
  let next: (() => void) | undefined

  if (!table) {
    // keep defaults
  } else if (typeof table.getState === 'function') {
    pageIndex = table.getState().pagination.pageIndex
    pageCount = table.getPageCount()
    canPrevious = table.getCanPreviousPage()
    canNext = table.getCanNextPage()
    setPageIndex = (i: number) => table.setPageIndex(i)
    setPageSize = (s: number) => table.setPageSize(s)
    previous = () => table.previousPage()
    next = () => table.nextPage()
  } else {
    // assume wrapper: { pageIndex, pageSize, pageCount, canPrevious, canNext, setPageSize, setPageIndex, previousPage, nextPage }
    pageIndex = table.pageIndex ?? 0
    pageCount = table.pageCount ?? 0
    canPrevious = table.canPrevious ?? false
    canNext = table.canNext ?? false
    setPageIndex = table.setPageIndex
    setPageSize = table.setPageSize
    previous = table.previousPage
    next = table.nextPage
  }

  return (
    <div className="flex items-center justify-between px-2">
      {/* <div className="text-muted-foreground flex-1 text-sm">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div> */}
      <div className="flex items-center space-x-6 lg:space-x-8">
        {/* <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 25, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div> */}
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {pageIndex + 1} of {pageCount}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="hidden size-8 lg:flex"
            onClick={() => table?.setPageIndex(0)}
            disabled={!canPrevious}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => table?.previousPage()}
            disabled={!canPrevious}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => table?.nextPage()}
            disabled={!canNext}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="hidden size-8 lg:flex"
            onClick={() => table?.setPageIndex((table?.getPageCount() ?? 1) - 1)}
            disabled={!canNext}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  )
}
