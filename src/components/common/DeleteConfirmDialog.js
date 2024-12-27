import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';

const DeleteConfirmDialog = ({ open, onClose, onConfirm, title, content }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {title || "Silme İşlemini Onayla"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content || "Bu öğeyi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz."}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          İptal
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained" autoFocus>
          Sil
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmDialog;
