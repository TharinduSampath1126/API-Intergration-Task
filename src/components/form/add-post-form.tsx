// keep imports minimal — UI components are provided by CustomForm
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import CustomForm from '@/components/customUi/form';


export interface UserFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: Partial<Record<string, any>>;
  onSubmit: (data: any) => Promise<void> | void;
  isEdit?: boolean;
}

export function UserForm({ open, onOpenChange, initialData, onSubmit, isEdit }: UserFormProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit User' : 'Add New User'}</DialogTitle>
        </DialogHeader>
        <CustomForm
          initialData={initialData as any}
          isEdit={isEdit}
          onSubmit={onSubmit}
          onOpenChange={onOpenChange}
        />
      </DialogContent>
    </Dialog>
  );
}
