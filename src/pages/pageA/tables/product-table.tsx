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
      // Column customization props

      columnOrder={['1', '2', '3', '4', '5', '6', '7']}
      columnWidths={{
        '1': 60,
        '2': 120,
        '3': 120,
        '4': 200,
        '5': 140,
        '6': 120,
        '7': 120
      }}
      columnHeaders={{
        '1': 'firstName',
        '2': 'lastName',
        '3': 'email',
        '4': 'phone',
        '5': 'birthDate',
        '6': 'age',
        '7': 'actions'
      }}
      // Visual customization props
      striped={true}
      hoverable={true}
      size="md"
      border={true}
      rounded={true}
      showSuccessAlert={true}
      emptyMessage="No users found."
      className="mt-4"
      tableClassName="min-w-full"
    />
  );
}
