import { columns, User } from '@/components/data-table/columns';
import SuccessAlert from '@/components/customUi/success-alert';
import Loading from '@/components/customUi/loading';
import { useUsers } from '@/hooks/useUserQueries';
import { usePostStore } from '@/store/postStore';
import UsersTable from './UsersTable';
import NewlyAddedUsersTable from './NewlyAddedUsersTable';
import { useState } from 'react';

export default function DemoPage() {
	const { data: apiData, isLoading, error } = useUsers();
	const { newPosts, addPost } = usePostStore();
	const [successMessage, setSuccessMessage] = useState<string | null>(null);
	const [alertOpen, setAlertOpen] = useState(false);

	if (isLoading) {
		return <Loading />;
	}

	if (error) {
		return (
			<div className="container mx-auto py-10">
				<div className="rounded-md bg-red-50 p-4 text-red-800">
					Error loading users: {error.message}
				</div>
			</div>
		);
	}

	const handleAddData = (data: User) => {
		console.log('handleAddData received:', data);
		
		// Add to store for immediate display in "Newly Added Users"
		addPost(data);
		
		setSuccessMessage('User added successfully');
		setAlertOpen(true);
	};

	return (
		<div className="container mx-auto py-10">
			<div className="mb-8">
				<UsersTable data={apiData || []} onAddData={handleAddData} />
			</div>

			{newPosts.length > 0 && (
				<NewlyAddedUsersTable data={newPosts} onAddData={handleAddData} />
			)}

			<SuccessAlert
				open={alertOpen}
				onOpenChange={(open) => {
					setAlertOpen(open);
					if (!open) setSuccessMessage(null);
				}}
				message={successMessage}
			/>
		</div>
	);
}
