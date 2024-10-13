"use client";

import { useCallback } from "react";
import { Box, Modal } from "@mui/material";
import RecordForm from "./RecordForm";
import { GridRowIdGetter } from "@mui/x-data-grid";

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

export default function RecordFormModal({
  user,
  showRecordFormModal,
  setShowRecordFormModal,
  selectedRecordId,
  setSelectedRecordId,
}: {
  user: NextAuthUser | undefined,
  showRecordFormModal: boolean,
  setShowRecordFormModal: (value: boolean) => void,
  selectedRecordId?: GridRowIdGetter | null,
  setSelectedRecordId: (value: GridRowIdGetter | null) => void,
}) {
  const handleClose = useCallback(() => {
    setShowRecordFormModal(false);
    setSelectedRecordId(null);
  }, [setShowRecordFormModal, setSelectedRecordId])

  return (
    <Modal
      open={showRecordFormModal}
      onClose={() => handleClose()}
      aria-labelledby="modal-record-form"
      aria-describedby="modal-record-form"
    >
      <Box sx={style}>
        <RecordForm user={user} selectedRecordId={selectedRecordId} closeForm={handleClose} />
      </Box>
    </Modal>
  )
}
