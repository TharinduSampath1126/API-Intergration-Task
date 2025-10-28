import { columns, User } from '@/components/data-table/columns';
import { DataTable } from '@/components/data-table/data-table';
import { useState, useEffect } from 'react';
import SuccessAlert from '@/components/customUi/success-alert';
import Loading from '@/components/customUi/loading';
import { fetchUsers } from '@/apis/user';
import { usePostStore } from '@/store/postStore';

export default function DemoPage() {
	const [apiData, setApiData] = useState<User[]>([]);
	const { newPosts, addPost } = usePostStore();
	const [loading, setLoading] = useState(true);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);
	const [alertOpen, setAlertOpen] = useState(false);

	useEffect(() => {
		let mounted = true;
		(async () => {
			try {
				const users = await fetchUsers();
				if (!mounted) return;
				setApiData(users);
			} catch (e) {
				// ignore or handle error
			} finally {
				if (mounted) setLoading(false);
			}
		})();

		return () => {
			mounted = false;
		};
	}, []);

	if (loading) {
		return <Loading />;
	}

	const handleAddData = (data: User) => {
		console.log('handleAddData received:', data);
		addPost(data);
		setSuccessMessage('User added successfully');
		setAlertOpen(true);
	};

	return (
		<div className="container mx-auto py-10">
			<div className="mb-8">
				<h2 className="mb-4 text-2xl font-bold">Users Data</h2>
				{successMessage ? (
					<div className="mb-4 rounded-md bg-green-50 p-3 text-sm text-green-800">
						{successMessage}
					</div>
				) : null}
				<DataTable columns={columns} data={apiData} onAddData={handleAddData} />
			</div>

			{newPosts.length > 0 && (
				<div>
					<h2 className="mb-4 text-2xl font-bold">Newly Added Users</h2>
					<DataTable columns={columns} data={newPosts} onAddData={handleAddData} />
				</div>
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
