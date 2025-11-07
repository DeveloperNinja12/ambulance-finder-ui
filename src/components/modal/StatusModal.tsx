import * as React from 'react';
import {
  Modal,
  Box,
  Typography,
  Backdrop,
  Fade,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

interface StatusModalProps {
  open: boolean;
  onClose: () => void;
  type: 'success' | 'error';
  message: string;
  duration?: number;
}

export function StatusModal({ open, onClose, type, message, duration = 5000 }: StatusModalProps) {
  React.useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [open, onClose, duration]);

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
          ) : (
            <ErrorIcon sx={{ fontSize: 60, color: 'error.main' }} />
          )}
          <Typography variant="h6" component="h2" align="center">
            {type === 'success' ? 'Success' : 'Error'}
          </Typography>
          <Typography variant="body1" align="center" sx={{ wordBreak: 'break-word' }}>
            {message}
          </Typography>
        </Box>
      </Fade>
    </Modal>
  );
}

