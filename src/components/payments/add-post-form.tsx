import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { DatePicker } from '@/components/ui/date-picker';
import { UserSchema } from './columns';
import * as React from 'react';
import { format } from 'date-fns';

interface AddPostFormProps {
  onAddData?: (newData: any) => void;
}

export function AddPostForm({ onAddData }: AddPostFormProps) {
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [open, setOpen] = React.useState(false);
  const [birthDate, setBirthDate] = React.useState<Date>();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Data</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const birthDateStr = birthDate ? format(birthDate, 'yyyy-MM-dd') : '';

            const rawData = {
              id: Number(formData.get('id')),
              firstName: formData.get('firstName') as string,
              lastName: formData.get('lastName') as string,
              age: Number(formData.get('age')),
              email: formData.get('email') as string,
              phone: formData.get('phone') as string,
              birthDate: birthDateStr,
            };

            try {
              const validatedData = UserSchema.parse(rawData);
              onAddData?.(validatedData);
              (e.target as HTMLFormElement).reset();
              setBirthDate(undefined);
              setErrors({});
              setOpen(false);
            } catch (error: any) {
              const fieldErrors: Record<string, string> = {};
              error.errors.forEach((err: any) => {
                fieldErrors[err.path[0]] = err.message;
              });
              setErrors(fieldErrors);
            }
          }}
          className="space-y-4"
        >
          <div>
            <label className="mb-1 block text-sm font-medium">ID</label>
            <Input
              name="id"
              type="number"
              placeholder="Enter ID"
              required
              className={errors.id ? 'border-red-500' : ''}
            />
            {errors.id && (
              <p className="mt-1 text-sm text-red-500">{errors.id}</p>
            )}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">First Name</label>
            <Input
              name="firstName"
              placeholder="Enter First Name"
              required
              className={errors.firstName ? 'border-red-500' : ''}
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
            )}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Last Name</label>
            <Input
              name="lastName"
              placeholder="Enter Last Name"
              required
              className={errors.lastName ? 'border-red-500' : ''}
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
            )}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>
            <Input
              name="email"
              type="email"
              placeholder="Enter Email"
              required
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Phone</label>
            <Input
              name="phone"
              placeholder="Enter Phone"
              required
              className={errors.phone ? 'border-red-500' : ''}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
            )}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Age</label>
            <Input
              name="age"
              type="number"
              placeholder="Enter Age"
              required
              className={errors.age ? 'border-red-500' : ''}
            />
            {errors.age && (
              <p className="mt-1 text-sm text-red-500">{errors.age}</p>
            )}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Birth Date</label>
            <DatePicker
              date={birthDate}
              onDateChange={setBirthDate}
              placeholder="Select birth date"
              className={errors.birthDate ? 'border-red-500' : ''}
            />
            {errors.birthDate && (
              <p className="mt-1 text-sm text-red-500">{errors.birthDate}</p>
            )}
          </div>
          <Button type="submit" className="w-full">
            Add User
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}