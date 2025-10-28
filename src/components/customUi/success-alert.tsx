import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';

type SuccessAlertProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  message?: string | null;
  okText?: string;
  cancelText?: string;
};

export function SuccessAlert({
  open,
  onOpenChange,
  title = 'Success',
  message = 'Operation completed successfully',
  okText = 'OK',
  cancelText = 'Cancel',
}: SuccessAlertProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{message}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelText}</AlertDialogCancel>
          <AlertDialogAction>{okText}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default SuccessAlert;
