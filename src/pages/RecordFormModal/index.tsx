"use client";

import { useCallback, useState, useMemo, useContext } from "react";

import { CategoriesContext } from "@/context-providers/CategoriesProvider";
import { RecordsContext } from "@/context-providers/RecordsProvider";
import { Box, Modal } from "@mui/material";
import RecordForm from '@/components/forms/RecordForm';

export default function RecordModal({user}: {user: NextAuthUser | undefined}) {
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);

  const categories = useContext(CategoriesContext);
  const categoriesList = categories?.categoriesData ?? [];

  const firstCategoryValue = useMemo(() => categoriesList[0]?.id ?? '', [categoriesList]);

  const records = useContext(RecordsContext);
  const fetchRecords = records?.fetchRecords ?? (() => {});

  const [toastState, setToastState] = useState<ToastProps>({
    open: false,
    toastMessage: '',
    toastSeverity: 'error'
  })

  const setToast = useCallback((severity: ToastSeverity, message: string) => {
    setToastState({
      ...toastState,
      open: true,
      toastMessage: message,
      toastSeverity: severity,
    });
  }, []);

  const closeToast = useCallback(() => {
    setToastState({
      ...toastState,
      open: false
    });
  }, []);

  return (
    <Modal
      open={isRecordModalOpen}
      onClose={handleClose}
      aria-labelledby="modal-record-form"
      aria-describedby="modal-record-form"
    >
      <Box>
        <RecordForm user={user} />
      </Box>
    </Modal>
  )
}
