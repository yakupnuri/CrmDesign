import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography
} from '@mui/material';

const DeleteConfirmDialog = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Ürün Silme Onayı</DialogTitle>
      <DialogContent>
        <Typography>
          Bu ürünü silmek istediğinizden emin misiniz?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>İptal</Button>
        <Button onClick={onConfirm} color="error">
          Sil
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmDialog;
