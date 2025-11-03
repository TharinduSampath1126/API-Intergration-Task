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
      columnOrder={['id', 'firstName', 'lastName', 'email', 'phone', 'birthDate', 'age', 'actions']}
      columnWidths={{
        'id': 60,
        'firstName': 120,
        'lastName': 120,
        'email': 200,
        'phone': 140,
        'birthDate': 120,
        'actions': 120
      }}
      columnHeaders={{
        'firstName': 'First Name',
        'lastName': 'Last Name',
        'email': 'Email',
        'phone': 'Phone',
        'birthDate': 'Birth Date',
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