import * as React from 'react';
import { Typography, Box, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { AddItemModal } from '../modal/AddItemModal';

export function Header() {
    const [modalOpen, setModalOpen] = React.useState(false);

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h5" component="h1" sx={{ fontWeight: 600 }}>
                Ambulance Finder
            </Typography>
            <IconButton
                color="primary"
                onClick={() => setModalOpen(true)}
                sx={{
                    borderRadius: 2,
                    bgcolor: 'primary.main',
                    color: 'white',
                    '&:hover': {
                        bgcolor: 'primary.dark',
                    },
                }}
            >
                <AddIcon />
            </IconButton>
            <AddItemModal open={modalOpen} onClose={() => setModalOpen(false)} />
        </Box>
    );
};