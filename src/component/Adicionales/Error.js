import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ErrorImg from '../../images/404-error-idea.gif';

const Error = () => (
    <Box
        display="flex"
        flexDirection="column"
        height="100vh"
        textAlign="center"
        justifyContent="center"
        sx={{ backgroundColor: '#f5f5f5', padding: 3 }}
    >
        <Container maxWidth="md">
            <img
                src={ErrorImg}
                alt="404"
                style={{ width: '100%', maxWidth: '500px', marginBottom: '20px' }}
            />
            <Typography variant="h1" gutterBottom>
                Oops!!!
            </Typography>
            <Typography variant="h4" paragraph>
                The page you are looking for could not be found.
            </Typography>
            <Button
                color="primary"
                variant="contained"
                component={Link}
                to="/"
                disableElevation
                sx={{ marginTop: 2 }}
            >
                Return to home
            </Button>
        </Container>
    </Box>
);

export default Error;
