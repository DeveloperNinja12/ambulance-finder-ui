import * as React from 'react';
import {
  Box,
  TextField,
  Button,
  Grid,
} from '@mui/material';
import { useAddDoctor } from '../../redux/features/doctors/hooks';
import { StatusModal } from '../modal/StatusModal';

interface DoctorFormProps {
  onSubmit: () => void;
  onCancel: () => void;
}

export function DoctorForm({ onSubmit, onCancel }: DoctorFormProps) {
  const { addDoctor, loading } = useAddDoctor();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalType, setModalType] = React.useState<'success' | 'error'>('success');
  const [modalMessage, setModalMessage] = React.useState('');
  const [formData, setFormData] = React.useState({
    doctorName: '',
    designation: '',
    location: '',
    careerObject: '',
    qualifications: '',
    experience: '',
    fees: '',
    availability: '',
    languages: '',
    email: '',
  });

  const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const doctorData = {
      doctorName: formData.doctorName,
      designation: formData.designation,
      location: formData.location,
      careerObject: formData.careerObject,
      qualifications: formData.qualifications.split(',').map((q) => q.trim()).filter(Boolean),
      experience: formData.experience,
      fees: Number(formData.fees),
      availability: formData.availability,
      languages: formData.languages.split(',').map((l) => l.trim()).filter(Boolean),
      email: formData.email,
    };
    try {
      const result = await addDoctor(doctorData).unwrap();
      setModalType('success');
      setModalMessage(result.message || 'Doctor added successfully!');
      setModalOpen(true);
      onSubmit();
    } catch (err: unknown) {
      setModalType('error');
      const errorMessage = err && typeof err === 'object' && 'message' in err 
        ? String(err.message) 
        : 'Failed to add doctor';
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
            label="Doctor Name"
            value={formData.doctorName}
            onChange={handleChange('doctorName')}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Designation"
            value={formData.designation}
            onChange={handleChange('designation')}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Location"
            value={formData.location}
            onChange={handleChange('location')}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Career Objective"
            value={formData.careerObject}
            onChange={handleChange('careerObject')}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Qualifications (comma separated)"
            value={formData.qualifications}
            onChange={handleChange('qualifications')}
            placeholder="MBBS, MD, DM"
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Experience"
            value={formData.experience}
            onChange={handleChange('experience')}
            placeholder="10 years"
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Fees"
            type="number"
            value={formData.fees}
            onChange={handleChange('fees')}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Availability"
            value={formData.availability}
            onChange={handleChange('availability')}
            placeholder="Mon-Sat 9:00 AM - 6:00 PM"
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Languages (comma separated)"
            value={formData.languages}
            onChange={handleChange('languages')}
            placeholder="English, Hindi, Kannada"
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange('email')}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
            <Button variant="outlined" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" onClick={handleSubmit} disabled={loading}>
              {loading ? 'Adding...' : 'Add Doctor'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
    </>
  );
}


