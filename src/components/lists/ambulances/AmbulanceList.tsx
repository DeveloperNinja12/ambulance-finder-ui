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
import { useAmbulancesStore, useDeleteAmbulance } from '../../../redux/features/ambulances/hooks';
import { StatusModal } from '../../modal/StatusModal';

type Column = {
  id: keyof Ambulance;
  label: string;
  align?: 'left' | 'right' | 'center';
  width?: number | string;
};

interface Ambulance {
  vehicleNo: string;
  vehicleType: string;
  vehicleModel: string;
  vehicleYear: number;
  vehicleColor: string;
  vehicleAssignedDriver: string;
  vehicleLocation: string;
  vehicleContactNumber: string;
  vehicleHospital: string;
}

const columns: Column[] = [
  { id: 'vehicleNo', label: 'Vehicle Number', align: 'left' },
  { id: 'vehicleType', label: 'Vehicle Type', align: 'left' },
  { id: 'vehicleModel', label: 'Vehicle Model', align: 'left' },
  { id: 'vehicleYear', label: 'Vehicle Year', align: 'left' },
  { id: 'vehicleColor', label: 'Vehicle Color', align: 'left' },
  { id: 'vehicleAssignedDriver', label: 'Vehicle Assigned Driver', align: 'left' },
  { id: 'vehicleLocation', label: 'Vehicle Location', align: 'left' },
  { id: 'vehicleContactNumber', label: 'Vehicle Contact Number', align: 'left' },
  { id: 'vehicleHospital', label: 'Vehicle Hospital', align: 'left' },
];


export function AmbulanceList() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { data, loading, error, meta, dispatchfetchAmbulances } = useAmbulancesStore();
  const { deleteAmbulance } = useDeleteAmbulance();
  const [confirmModalOpen, setConfirmModalOpen] = React.useState(false);
  const [ambulanceToDelete, setAmbulanceToDelete] = React.useState<string | null>(null);

  React.useEffect(() => {
    const apiPage = page + 1;
    dispatchfetchAmbulances({ page: apiPage, limit: rowsPerPage });
  }, [page, rowsPerPage, dispatchfetchAmbulances]);

  const handleDeleteClick = (ambulanceId: string) => {
    setAmbulanceToDelete(ambulanceId);
    setConfirmModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!ambulanceToDelete) return;
    
    try {
      await deleteAmbulance(ambulanceToDelete).unwrap();
      if (data.length === 1 && page > 0) {
        setPage(page - 1);
      }
      setAmbulanceToDelete(null);
    } catch (err) {
      console.error('Failed to delete ambulance:', err);
      setAmbulanceToDelete(null);
    }
  };

  const handleCloseConfirmModal = () => {
    setConfirmModalOpen(false);
    setAmbulanceToDelete(null);
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

  const rows: Ambulance[] = React.useMemo(() => {
    return data.map((ambulance) => ({
      vehicleNo: ambulance.vehicleNumber,
      vehicleType: ambulance.vehicleType,
      vehicleModel: ambulance.vehicleModel,
      vehicleYear: ambulance.vehicleYear,
      vehicleColor: ambulance.vehicleColor,
      vehicleAssignedDriver: ambulance.vehicleAssignedDriver,
      vehicleLocation: ambulance.vehicleLocation,
      vehicleContactNumber: ambulance.vehicleContactNumber,
      vehicleHospital: ambulance.vehicleHospital,
    }));
  }, [data]);

  return (
    <>
      <StatusModal
        open={confirmModalOpen}
        onClose={handleCloseConfirmModal}
        type="confirm"
        message="Are you sure you want to delete this ambulance? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        confirmText="Delete"
        cancelText="Cancel"
      />
      <Paper sx={{ width: '100%', overflow: 'hidden' }} variant="outlined">
      <Typography variant="subtitle1" sx={{ px: 2, pt: 2 }}>
        Ambulances
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
            <Table stickyHeader size="small" aria-label="ambulances table">
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
                {rows.map((row, index) => {
                  const ambulanceData = data[index];
                  return (
                    <TableRow hover key={ambulanceData?.id || index}>
                      {columns.map((col) => {
                        const value = row[col.id];
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
                          onClick={() => handleDeleteClick(ambulanceData?.id || '')}
                          disabled={!ambulanceData?.id}
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
