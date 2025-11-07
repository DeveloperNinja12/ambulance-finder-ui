import * as React from 'react';
import {
  Modal,
  Box,
  Typography,
  Backdrop,
  Fade,
  Button,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';

interface StatusModalProps {
  open: boolean;
  onClose: () => void;
  type: 'success' | 'error' | 'confirm';
  message: string;
  duration?: number;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
}

export function StatusModal({ 
  open, 
  onClose, 
  type, 
  message, 
  duration = 5000,
  onConfirm,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
}: StatusModalProps) {
  React.useEffect(() => {
    if (open && type !== 'confirm') {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [open, onClose, duration, type]);

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(4px)',
          },
        },
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', sm: 400 },
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          {type === 'success' ? (
            <CheckCircleIcon sx={{ fontSize: 60, color: 'success.main' }} />
          ) : type === 'error' ? (
            <ErrorIcon sx={{ fontSize: 60, color: 'error.main' }} />
          ) : (
            <WarningIcon sx={{ fontSize: 60, color: 'warning.main' }} />
          )}
          <Typography variant="h6" component="h2" align="center">
            {type === 'success' ? 'Success' : type === 'error' ? 'Error' : 'Confirm Delete'}
          </Typography>
          <Typography variant="body1" align="center" sx={{ wordBreak: 'break-word' }}>
            {message}
          </Typography>
          {type === 'confirm' && (
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <Button variant="outlined" onClick={onClose}>
                {cancelText}
              </Button>
              <Button variant="contained" color="error" onClick={handleConfirm}>
                {confirmText}
              </Button>
            </Box>
          )}
        </Box>
      </Fade>
    </Modal>
  );
}

