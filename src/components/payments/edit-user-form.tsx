import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { BirthDateAgePicker } from '@/components/ui/birth-date-age-picker';
import { PhoneInput } from '@/components/ui/phone-input';
import { UserSchema, User } from './columns';
// If you move UserSchema/User to a shared file, update this import accordingly.
import * as React from 'react';
import { format } from 'date-fns';

interface EditUserFormProps {
  user: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdateUser?: (updatedUser: User) => void;
}

export function EditUserForm({ user, open, onOpenChange, onUpdateUser }: EditUserFormProps) {
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [birthDate, setBirthDate] = React.useState<Date | undefined>();
  const [age, setAge] = React.useState<number | undefined>();
  const [phone, setPhone] = React.useState<string>('');

  React.useEffect(() => {
    if (open && user) {
      setBirthDate(new Date(user.birthDate));
      setAge(user.age);
      setPhone(user.phone);
      setErrors({});
    }
  }, [open, user]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const birthDateStr = birthDate ? format(birthDate, 'yyyy-MM-dd') : '';

            const rawData = {
              id: user.id,
              firstName: formData.get('firstName') as string,
              lastName: formData.get('lastName') as string,
              age: age || 0,
              email: formData.get('email') as string,
              phone: phone,
              birthDate: birthDateStr,
            };

            try {
              const validatedData = UserSchema.parse(rawData);
              onUpdateUser?.(validatedData);
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
            <Input value={user.id} disabled className="bg-gray-50" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">First Name</label>
            <Input
              name="firstName"
              defaultValue={user.firstName}
              error={errors.firstName}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Last Name</label>
            <Input
              name="lastName"
              defaultValue={user.lastName}
              error={errors.lastName}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>
            <Input
              name="email"
              type="email"
              defaultValue={user.email}
              error={errors.email}
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
            Update User
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}