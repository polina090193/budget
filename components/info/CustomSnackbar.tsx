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
  
  const handleCloseToast = () => {
    closeToast();
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleCloseToast}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert sx={{ maxWidth: '30vw' }} elevation={6} variant="filled" onClose={handleCloseToast} severity={toastSeverity}>
        {toastMessage}
      </Alert>
    </Snackbar>
  )
}
