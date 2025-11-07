import * as React from 'react';
import {
  Modal,
  Box,
  Paper,
  Typography,
  IconButton,
  Grid,
  Card,
  CardContent,
  Fade,
  Backdrop,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { DoctorForm } from '../forms/DoctorForm';
import { AmbulanceForm } from '../forms/AmbulanceForm';

interface AddItemModalProps {
  open: boolean;
  onClose: () => void;
}

type FormType = 'selection' | 'doctor' | 'ambulance';

export function AddItemModal({ open, onClose }: AddItemModalProps) {
  const [formType, setFormType] = React.useState<FormType>('selection');

  const handleClose = () => {
    setFormType('selection');
    onClose();
  };

  const handleSelectDoctor = () => {
    setFormType('doctor');
  };

  const handleSelectAmbulance = () => {
    setFormType('ambulance');
  };

  const handleFormSubmit = () => {
    setFormType('selection');
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
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
            width: { xs: '90%', sm: '600px', md: '700px' },
            maxHeight: '90vh',
            overflow: 'auto',
          }}
        >
          <Paper
            elevation={24}
            sx={{
              p: 3,
              borderRadius: 2,
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
                {formType === 'selection' && 'Add New Item'}
                {formType === 'doctor' && 'Add a Doctor'}
                {formType === 'ambulance' && 'Add an Ambulance'}
              </Typography>
              <IconButton onClick={handleClose} size="small">
                <CloseIcon />
              </IconButton>
            </Box>

            {formType === 'selection' && (
              <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
                <Grid item size={6}>
                  <Card
                    sx={{
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 6,
                      },
                    }}
                    onClick={handleSelectDoctor}
                  >
                    <CardContent sx={{ textAlign: 'center', py: 4 }}>
                      <PersonIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Add a Doctor to the list
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item size={6}>
                  <Card
                    sx={{
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 6,
                      },
                    }}
                    onClick={handleSelectAmbulance}
                  >
                    <CardContent sx={{ textAlign: 'center', py: 4 }}>
                      <LocalHospitalIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Add an Ambulance to the list
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            )}

            {formType === 'doctor' && (
              <DoctorForm onSubmit={handleFormSubmit} onCancel={() => setFormType('selection')} />
            )}

            {formType === 'ambulance' && (
              <AmbulanceForm onSubmit={handleFormSubmit} onCancel={() => setFormType('selection')} />
            )}
          </Paper>
        </Box>
      </Fade>
    </Modal>
  );
}


