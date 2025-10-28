import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { User } from '../data-table/columns';

interface UserDetailsDialogProps {
  user: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UserDetailsDialog({ user, open, onOpenChange }: UserDetailsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className='font-bold text-2xl '>User Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 ">
          <div>
            <strong>ID:</strong> {user.id}
          </div>
          <div>
            <strong>First Name:</strong> {user.firstName}
          </div>
          <div>
            <strong>Last Name:</strong> {user.lastName}
          </div>
          <div>
            <strong>Age:</strong> {user.age}
          </div>
          <div>
            <strong>Email:</strong> {user.email}
          </div>
          <div>
            <strong>Phone:</strong> {user.phone}
          </div>
          <div>
            <strong>Birth Date:</strong> {user.birthDate}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}