import * as React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  CircularProgress,
  Box,
  Alert,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDoctorsStore, useDeleteDoctor } from '../../../redux/features/doctors/hooks';
import { StatusModal } from '../../modal/StatusModal';

type Column = {
  id: keyof Doctor;
  label: string;
  align?: 'left' | 'right' | 'center';
  width?: number | string;
};

interface Doctor {
  name: string;
  specialty: string;
  availability: string;
  location: string;
  qualifications: string;
  languagesKnown: string;
  contact: string;
  description: string;
  fee: string | number;
}

const columns: Column[] = [
  { id: 'name', label: 'Doctor Name', align: 'left' },
  { id: 'specialty', label: 'Specialty', align: 'left' },
  { id: 'availability', label: 'Availability', align: 'center' },
  { id: 'location', label: 'Location', align: 'center' },
  { id: 'qualifications', label: 'Qualifications', align: 'center' },
  { id: 'languagesKnown', label: 'Languages Known', align: 'center' },
  { id: 'contact', label: 'Contact', align: 'center' },
  { id: 'description', label: 'Description', align: 'center' },
  { id: 'fee', label: 'Visiting Fee', align: 'center' },
];


export function DoctorsList() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { data, loading, error, meta, dispatchfetchDoctors } = useDoctorsStore();
  const { deleteDoctor } = useDeleteDoctor();
  const [confirmModalOpen, setConfirmModalOpen] = React.useState(false);
  const [doctorToDelete, setDoctorToDelete] = React.useState<string | null>(null);

  React.useEffect(() => {
    const apiPage = page + 1;
    dispatchfetchDoctors({ page: apiPage, limit: rowsPerPage });
  }, [page, rowsPerPage, dispatchfetchDoctors]);

  const handleDeleteClick = (doctorId: string) => {
    setDoctorToDelete(doctorId);
    setConfirmModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!doctorToDelete) return;
    
    try {
      await deleteDoctor(doctorToDelete).unwrap();
      if (data.length === 1 && page > 0) {
        setPage(page - 1);
      }
      setDoctorToDelete(null);
    } catch (err) {
      console.error('Failed to delete doctor:', err);
      setDoctorToDelete(null);
    }
  };

  const handleCloseConfirmModal = () => {
    setConfirmModalOpen(false);
    setDoctorToDelete(null);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newRowsPerPage = +event.target.value;
    setPage(0);
    setRowsPerPage(newRowsPerPage);
  };

  const rows: Doctor[] = React.useMemo(() => {
    return data.map((doctor) => ({
      name: doctor.doctorName,
      specialty: doctor.designation,
      availability: doctor.availability,
      location: doctor.location,
      qualifications: doctor.qualifications.join(', '),
      languagesKnown: doctor.languages.join(', '),
      contact: doctor.email,
      description: doctor.careerObject,
      fee: `₹${doctor.fees}`,
    }));
  }, [data]);

  return (
    <>
      <StatusModal
        open={confirmModalOpen}
        onClose={handleCloseConfirmModal}
        type="confirm"
        message="Are you sure you want to delete this doctor? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        confirmText="Delete"
        cancelText="Cancel"
      />
      <Paper sx={{ width: '100%', overflow: 'hidden' }} variant="outlined">
      <Typography variant="subtitle1" sx={{ px: 2, pt: 2 }}>
        Doctors
      </Typography>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Box sx={{ p: 2 }}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}

      {!loading && !error && (
        <>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader size="small" aria-label="doctors table">
              <TableHead>
                <TableRow>
                  {columns.map((col) => (
                    <TableCell
                      key={col.id}
                      align={col.align}
                      style={{ width: col.width, fontWeight: 600 }}
                    >
                      {col.label}
                    </TableCell>
                  ))}
                  <TableCell align="center" style={{ fontWeight: 600 }}>Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {rows.map((doctor, index) => {
                  const doctorData = data[index];
                  return (
                    <TableRow hover key={doctorData?.id || index}>
                      {columns.map((col) => {
                        const value = doctor[col.id];
                        return (
                          <TableCell key={col.id} align={col.align}>
                            {value}
                          </TableCell>
                        );
                      })}
                      <TableCell align="center">
                        <IconButton
                          color="error"
                          size="small"
                          onClick={() => handleDeleteClick(doctorData?.id || '')}
                          disabled={!doctorData?.id}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[10, 20, 30]}
            component="div"
            count={meta?.totalItems || 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
    </Paper>
    </>
  );
}
