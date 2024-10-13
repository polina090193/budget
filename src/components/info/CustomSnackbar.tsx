"use client";
import { Snackbar, Alert } from "@mui/material";

interface SnackbarProps {
  toastState: ToastProps;
  closeToast: () => void
}

export default function CustomSnackbar(
    { toastState, closeToast }: SnackbarProps,
  ) {
  const { open, toastSeverity, toastMessage } = toastState;
  
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={closeToast}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert sx={{ maxWidth: '30vw' }} elevation={6} variant="filled" onClose={closeToast} severity={toastSeverity}>
        {toastMessage}
      </Alert>
    </Snackbar>
  )
}
