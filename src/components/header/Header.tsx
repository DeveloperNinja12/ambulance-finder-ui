import * as React from 'react';
import { Typography, AppBar, Box, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { AddItemModal } from '../modal/AddItemModal';

export function Header() {
    const [modalOpen, setModalOpen] = React.useState(false);

    return (
        <AppBar position="static" elevation={0} sx={{ bgcolor: 'background.paper', py: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
                <Typography 
                    variant="h3" 
                    component="h1" 
                    sx={{ 
                        fontWeight: 700,
                        fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                        color: 'text.primary',
                        letterSpacing: '-0.02em',
                    }}
                >
                    Ambulance Finder
                </Typography>
                <IconButton
                    color="primary"
                    onClick={() => setModalOpen(true)}
                    sx={{
                        borderRadius: 2,
                        bgcolor: 'primary.main',
                        color: 'white',
                        width: { xs: 40, sm: 48 },
                        height: { xs: 40, sm: 48 },
                        '&:hover': {
                            bgcolor: 'primary.dark',
                        },
                    }}
                >
                    <AddIcon sx={{ fontSize: { xs: '1.5rem', sm: '1.75rem' } }} />
                </IconButton>
            </Box>
            <AddItemModal open={modalOpen} onClose={() => setModalOpen(false)} />
        </AppBar>
    );
};