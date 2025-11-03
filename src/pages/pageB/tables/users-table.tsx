import { columns, User } from '@/components/data-table/columns';
import { DataTable } from '@/components/data-table/data-table';

type Props = {
  data: User[];
  onTableChange?: (table: any) => void;
};

export default function UsersTable({ data, onTableChange }: Props) {
  return (
    <DataTable 
      columns={columns} 
      data={data} 
      onTableChange={onTableChange}
      // Different customization for pageB - compact view
      hiddenColumns={['birthDate', 'phone']} // Hide birthDate and phone
      columnOrder={['firstName', 'lastName', 'email', 'age', 'actions']}
      columnWidths={{
        'firstName': 150,
        'lastName': 150,
        'email': 250,
        'age': 80,
        'actions': 100
      }}
      columnHeaders={{
        'firstName': 'First Name',
        'lastName': 'Last Name',
        'email': 'Email Address',
        'age': 'Age',
        'actions': 'Actions'
      }}
      // Compact visual style
      striped={false}
      hoverable={true}
      size="sm"
      border={true}
      rounded={true}
      showSuccessAlert={true}
      emptyMessage="No users available."
      className="shadow-sm"
      tableClassName="text-sm"
    />
  );
}