"use client";

import { Snackbar, Alert } from "@mui/material";

export default function CustomSnackbar(toastState: SnackbarProps) {
  const { open, setOpen, toastSeverity, toastMessage } = toastState;
  
  const handleCloseToast = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleCloseToast}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    >
      <Alert elevation={6} variant="filled" onClose={handleCloseToast} severity={toastSeverity}>
        {toastMessage}
      </Alert>
    </Snackbar>
  )
}
