"use client";

import { useCallback } from "react";

import { Box, Modal } from "@mui/material";
import CategoryForm from "./CategoryForm";
import { GridRowIdGetter } from "@mui/x-data-grid";

export default function CategoryFormModal({
  user,
  showRecordFormModal,
  setShowRecordFormModal,
  selectedCategoryId,
  setSelectedCategoryId,
}: {
  user: NextAuthUser | undefined,
  showRecordFormModal: boolean,
  setShowRecordFormModal: (value: boolean) => void,
  selectedCategoryId?: GridRowIdGetter | null,
  setSelectedCategoryId: (value: GridRowIdGetter | null) => void,
}): JSX.Element {
  const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const handleClose = useCallback(() => {
    setShowRecordFormModal(false);
    setSelectedCategoryId(null);
  }, [setShowRecordFormModal, setSelectedCategoryId])

  return (
    <Modal
      open={showRecordFormModal}
      onClose={() => handleClose()}
      aria-labelledby="modal-record-form"
      aria-describedby="modal-record-form"
    >
      <Box sx={style}>
        <CategoryForm user={user} selectedCategoryId={selectedCategoryId} closeForm={handleClose} />
      </Box>
    </Modal>
  )
}
