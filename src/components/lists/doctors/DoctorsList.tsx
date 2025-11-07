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
} from '@mui/material';
import { useDoctorsStore } from '../../../redux/features/doctors/hooks';

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

  React.useEffect(() => {
    dispatchfetchDoctors({ page: page + 1, limit: rowsPerPage });
  }, [page, rowsPerPage, dispatchfetchDoctors]);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newRowsPerPage = +event.target.value;
    setRowsPerPage(newRowsPerPage);
    setPage(0);
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
                </TableRow>
              </TableHead>

              <TableBody>
                {rows.map((doctor, index) => (
                  <TableRow hover key={index}>
                    {columns.map((col) => {
                      const value = doctor[col.id];
                      return (
                        <TableCell key={col.id} align={col.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
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
  );
}
