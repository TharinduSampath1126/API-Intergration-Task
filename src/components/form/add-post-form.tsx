import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { BirthDateAgePicker } from '@/components/ui/birth-date-age-picker';
import { PhoneInput } from '@/components/ui/phone-input';
import { UserSchema } from './columns';
import * as React from 'react';
import { format } from 'date-fns';


export interface UserFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: Partial<Record<string, any>>;
  onSubmit: (data: any) => Promise<void> | void;
  isEdit?: boolean;
}

export function UserForm({ open, onOpenChange, initialData, onSubmit, isEdit }: UserFormProps) {
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [birthDate, setBirthDate] = React.useState<Date | undefined>(
    initialData?.birthDate ? new Date(initialData.birthDate) : undefined
  );
  const [age, setAge] = React.useState<number | undefined>(initialData?.age);
  const [phone, setPhone] = React.useState<string>(initialData?.phone || '');

  React.useEffect(() => {
    if (open) {
      setErrors({});
      setBirthDate(initialData?.birthDate ? new Date(initialData.birthDate) : undefined);
      setAge(initialData?.age);
      setPhone(initialData?.phone || '');
    }
  }, [open, initialData]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit User' : 'Add New User'}</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const birthDateStr = birthDate ? format(birthDate, 'yyyy-MM-dd') : '';

            const rawId = Number(formData.get('id'));
            const finalId = !rawId || Number.isNaN(rawId)
              ? (initialData?.id ?? Date.now())
              : rawId;

            const rawData = {
              id: finalId,
              firstName: formData.get('firstName') as string,
              lastName: formData.get('lastName') as string,
              age: age || 0,
              email: formData.get('email') as string,
              phone: phone,
              birthDate: birthDateStr,
            };

            try {
              const validatedData = UserSchema.parse(rawData);
              await Promise.resolve(onSubmit(validatedData));
              (e.target as HTMLFormElement).reset();
              setBirthDate(undefined);
              setAge(undefined);
              setPhone('');
              setErrors({});
              onOpenChange(false);
            } catch (error: any) {
              const fieldErrors: Record<string, string> = {};
              if (error.issues) {
                error.issues.forEach((err: any) => {
                  fieldErrors[err.path[0]] = err.message;
                });
              }
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
              error={errors.id}
              defaultValue={initialData?.id}
              disabled={isEdit}
              className={isEdit ? 'bg-gray-50' : ''}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">First Name</label>
            <Input
              name="firstName"
              placeholder="Enter First Name"
              error={errors.firstName}
              defaultValue={initialData?.firstName}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Last Name</label>
            <Input
              name="lastName"
              placeholder="Enter Last Name"
              error={errors.lastName}
              defaultValue={initialData?.lastName}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>
            <Input
              name="email"
              type="email"
              placeholder="Enter Email"
              error={errors.email}
              defaultValue={initialData?.email}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Phone</label>
            <PhoneInput
              value={phone}
              onChange={setPhone}
              placeholder="Enter phone number"
              error={errors.phone}
            />
          </div>
          <BirthDateAgePicker
            birthDate={birthDate}
            onBirthDateChange={setBirthDate}
            onAgeChange={setAge}
            birthDateError={errors.birthDate}
            ageError={errors.age}
            className="space-y-4"
          />
          <Button type="submit" className="w-full">
            {isEdit ? 'Update User' : 'Add User'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
