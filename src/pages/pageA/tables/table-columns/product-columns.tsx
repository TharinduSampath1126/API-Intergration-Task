import { ColumnDef } from '@tanstack/react-table';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Product } from '@/apis/product';

function ProductActionsCell({ product }: { product: Product }) {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowDialog(true)}
          className="h-8 w-8 p-0"
        >
          <Eye className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-red-600 hover:text-red-800"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
}

export const productColumns: ColumnDef<Product>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'title',
    header: 'Product Name',
  },
  {
    accessorKey: 'brand',
    header: 'Brand',
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => `$${row.original.price}`,
  },
  {
    accessorKey: 'rating',
    header: 'Rating',
    cell: ({ row }) => `${row.original.rating}/5`,
  },
  {
    accessorKey: 'stock',
    header: 'Stock',
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => <ProductActionsCell product={row.original} />,
  },
];
