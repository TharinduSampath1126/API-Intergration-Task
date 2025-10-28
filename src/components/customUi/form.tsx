import * as React from 'react';
import { format } from 'date-fns';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PhoneInput } from '@/components/ui/phone-input';
import { BirthDateAgePicker } from '@/components/ui/birth-date-age-picker';
import { UserSchema, User } from '@/components/data-table/columns';

type Props = {
	initialData?: User;
	isEdit?: boolean;
	onSubmit: (data: User) => Promise<void> | void;
	onOpenChange?: (open: boolean) => void;
};

export function CustomForm({ initialData, isEdit, onSubmit, onOpenChange }: Props) {
	const [birthDate, setBirthDate] = React.useState<Date | undefined>(
		initialData ? (initialData.birthDate ? new Date(initialData.birthDate) : undefined) : undefined
	);
	const [age, setAge] = React.useState<number | undefined>(initialData?.age);
	const [phone, setPhone] = React.useState<string>(initialData?.phone ?? '');
	const [errors, setErrors] = React.useState<Record<string, string>>({});

	return (
		<form
			onSubmit={async (e) => {
				e.preventDefault();
				const formData = new FormData(e.target as HTMLFormElement);
				const birthDateStr = birthDate ? format(birthDate, 'yyyy-MM-dd') : '';

				const rawId = Number(formData.get('id'));
				const finalId = !rawId || Number.isNaN(rawId) ? (initialData?.id ?? Date.now()) : rawId;

				const rawData = {
					id: finalId,
					firstName: (formData.get('firstName') as string) ?? '',
					lastName: (formData.get('lastName') as string) ?? '',
					age: age || 0,
					email: (formData.get('email') as string) ?? '',
					phone: phone,
					birthDate: birthDateStr,
				} as unknown as User;

				try {
					const validatedData = UserSchema.parse(rawData);
					await Promise.resolve(onSubmit(validatedData));
					(e.target as HTMLFormElement).reset();
					setBirthDate(undefined);
					setAge(undefined);
					setPhone('');
					setErrors({});
					onOpenChange?.(false);
				} catch (error: any) {
					const fieldErrors: Record<string, string> = {};
					if (error?.issues) {
						error.issues.forEach((err: any) => {
							fieldErrors[err.path?.[0]] = err.message;
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
				onBirthDateChange={(d) => {
					setBirthDate(d);
				}}
				onAgeChange={(a) => setAge(a)}
				birthDateError={errors.birthDate}
				ageError={errors.age}
				className="space-y-4"
			/>
			<Button type="submit" className="w-full">
				{isEdit ? 'Update User' : 'Add User'}
			</Button>
		</form>
	);
}

export default CustomForm;
