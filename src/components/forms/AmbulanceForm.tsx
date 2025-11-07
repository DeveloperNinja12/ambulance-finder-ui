import * as React from 'react';
import {
  Box,
  TextField,
  Button,
  Grid,
} from '@mui/material';
import { useAddAmbulance } from '../../redux/features/ambulances/hooks';
import { StatusModal } from '../modal/StatusModal';

interface AmbulanceFormProps {
  onSubmit: () => void;
  onCancel: () => void;
}

export function AmbulanceForm({ onSubmit, onCancel }: AmbulanceFormProps) {
  const { addAmbulance, loading } = useAddAmbulance();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalType, setModalType] = React.useState<'success' | 'error'>('success');
  const [modalMessage, setModalMessage] = React.useState('');
  const [formData, setFormData] = React.useState({
    vehicleNumber: '',
    vehicleType: '',
    vehicleModel: '',
    vehicleYear: '',
    vehicleColor: '',
    vehicleAssignedDriver: '',
    vehicleLocation: '',
    vehicleContactNumber: '',
    vehicleHospital: '',
  });

  const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ambulanceData = {
      vehicleNumber: formData.vehicleNumber,
      vehicleType: formData.vehicleType,
      vehicleModel: formData.vehicleModel,
      vehicleYear: Number(formData.vehicleYear),
      vehicleColor: formData.vehicleColor,
      vehicleAssignedDriver: formData.vehicleAssignedDriver,
      vehicleLocation: formData.vehicleLocation,
      vehicleContactNumber: formData.vehicleContactNumber,
      vehicleHospital: formData.vehicleHospital,
    };
    try {
      const result = await addAmbulance(ambulanceData).unwrap();
      setModalType('success');
      setModalMessage(result.message || 'Ambulance added successfully!');
      setModalOpen(true);
      onSubmit();
    } catch (err: unknown) {
      setModalType('error');
      const errorMessage = err && typeof err === 'object' && 'message' in err 
        ? String(err.message) 
        : 'Failed to add ambulance';
      setModalMessage(errorMessage);
      setModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <StatusModal
        open={modalOpen}
        onClose={handleModalClose}
        type={modalType}
        message={modalMessage}
      />
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Vehicle Number"
            value={formData.vehicleNumber}
            onChange={handleChange('vehicleNumber')}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Vehicle Type"
            value={formData.vehicleType}
            onChange={handleChange('vehicleType')}
            placeholder="Advanced Life Support"
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Vehicle Model"
            value={formData.vehicleModel}
            onChange={handleChange('vehicleModel')}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Vehicle Year"
            type="number"
            value={formData.vehicleYear}
            onChange={handleChange('vehicleYear')}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Vehicle Color"
            value={formData.vehicleColor}
            onChange={handleChange('vehicleColor')}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Vehicle Assigned Driver"
            value={formData.vehicleAssignedDriver}
            onChange={handleChange('vehicleAssignedDriver')}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Vehicle Location"
            value={formData.vehicleLocation}
            onChange={handleChange('vehicleLocation')}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Vehicle Contact Number"
            value={formData.vehicleContactNumber}
            onChange={handleChange('vehicleContactNumber')}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Vehicle Hospital"
            value={formData.vehicleHospital}
            onChange={handleChange('vehicleHospital')}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
            <Button variant="outlined" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" onClick={handleSubmit} disabled={loading}>
              {loading ? 'Adding...' : 'Add Ambulance'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
    </>
  );
}


