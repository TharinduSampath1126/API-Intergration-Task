import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { useState } from 'react';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export const UserSchema = z.object({
  id: z.number().min(1, 'ID must be greater than 0'),
  firstName: z
    .string()
    .min(1, 'First name is required')
    .max(50, 'First name must be less than 50 characters'),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .max(50, 'Last name must be less than 50 characters'),
  age: z
    .number()
    .min(1, 'Age must be greater than 0')
    .max(120, 'Age must be less than 120'),
  email: z.string().email('Invalid email format'),
  phone: z.string().min(1, 'Phone is required'),
  birthDate: z.string().min(1, 'Birth date is required'),
});

export type User = z.infer<typeof UserSchema>;

function ActionsCell({ user }: { user: User }) {
  const [showDialog, setShowDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setShowDialog(true)}>
            View details
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setShowEditDialog(true)}>
            Edit user
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <strong>ID:</strong> {user.id}
            </div>
            <div>
              <strong>First Name:</strong> {user.firstName}
            </div>
            <div>
              <strong>Last Name:</strong> {user.lastName}
            </div>
            <div>
              <strong>Age:</strong> {user.age}
            </div>
            <div>
              <strong>Email:</strong> {user.email}
            </div>
            <div>
              <strong>Phone:</strong> {user.phone}
            </div>
            <div>
              <strong>Birth Date:</strong> {user.birthDate}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          <form className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">ID</label>
              <Input defaultValue={user.id} disabled />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">
                First Name
              </label>
              <Input defaultValue={user.firstName} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">
                Last Name
              </label>
              <Input defaultValue={user.lastName} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Age</label>
              <Input type="number" defaultValue={user.age} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Email</label>
              <Input type="email" defaultValue={user.email} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Phone</label>
              <Input defaultValue={user.phone} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">
                Birth Date
              </label>
              <Input type="date" defaultValue={user.birthDate} />
            </div>
            <Button type="submit">Update User</Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'firstName',
    header: 'First Name',
  },
  {
    accessorKey: 'lastName',
    header: 'Last Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
  },
  {
    accessorKey: 'age',
    header: 'Age',
  },
  {
    accessorKey: 'birthDate',
    header: 'Birth Date',
  },
  {
    id: 'actions',
    cell: ({ row }) => <ActionsCell user={row.original} />,
  },
];
