import { ColumnDef } from '@tanstack/react-table';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { UserForm } from '@/components/form/add-post-form';
import { usePostStore } from '@/store/postStore';
import { UserDetailsDialog } from '@/components/form/user-details-dialog';

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
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email format')
    .refine(
      (email) => {
        // More strict email validation
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
      },
      { message: 'Please enter a valid email address' }
    )
    .refine(
      (email) => {
        // Check for common email providers or allow any domain
        const domain = email.split('@')[1];
        return domain && domain.includes('.');
      },
      { message: 'Email must have a valid domain' }
    ),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .refine(
      (phone) => {
        // Allow phone numbers with country codes (+1, +94, etc.) and various formats
        const phoneRegex = /^(\+\d{1,3}[- ]?)?\(?\d{1,4}\)?[- ]?\d{1,4}[- ]?\d{1,9}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
      },
      { message: 'Please enter a valid phone number (e.g., +1 123 456 7890 or +94 77 123 4567)' }
    ),
  birthDate: z
    .string()
    .min(1, 'Birth date is required')
    .refine(
      (date) => {
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(23, 59, 59, 999); // Set to end of today
        return selectedDate <= today;
      },
      { message: 'Birth date cannot be in the future' }
    ),
});

export type User = z.infer<typeof UserSchema>;


function ActionsCell({ user }: { user: User }) {
  const [showDialog, setShowDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const { updatePost, removePost } = usePostStore();

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this user?')) {
      removePost(user.id);
    }
  };

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
          onClick={() => setShowEditDialog(true)}
          className="h-8 w-8 p-0"
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDelete}
          className="h-8 w-8 p-0 text-red-600 hover:text-red-800"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <UserDetailsDialog
        user={user}
        open={showDialog}
        onOpenChange={setShowDialog}
      />

      <UserForm
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        initialData={user}
        isEdit
        onSubmit={async (updatedUser) => {
          updatePost(updatedUser);
        }}
      />
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
    header: 'Actions',
    cell: ({ row }) => <ActionsCell user={row.original} />,
  },
];
