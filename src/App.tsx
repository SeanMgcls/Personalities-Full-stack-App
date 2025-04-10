import React, { useState, useEffect } from 'react';
import './style.css';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { Typography, Button } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';

const ExpandMore = styled(IconButton)<{ expand: boolean }>(({ theme, expand }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  transform: expand ? 'rotate(180deg)' : 'rotate(0deg)',
}));

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [personalities, setPersonalities] = useState([]); // Changed from sculptureList
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8080/magcalas/personalities') // Your API endpoint
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setPersonalities(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  function handleNextClick() {
    setIndex((prevIndex) => (prevIndex + 1) % personalities.length);
    setExpanded(false); // Collapse details on navigation
  }

  function handleBackClick() {
    setIndex((prevIndex) => (prevIndex - 1 + personalities.length) % personalities.length);
    setExpanded(false); // Collapse details on navigation
  }

  const personality = personalities[index];

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  if (loading) {
    return <Container maxWidth="md"><Typography variant="h6" align="center">Loading Famous Personalities...</Typography></Container>;
  }

  if (error) {
    return <Container maxWidth="md"><Typography color="error" variant="body1" align="center">Error: {error.message}</Typography></Container>;
  }

  if (!personality) {
    return <Container maxWidth="md"><Typography variant="body1" align="center">No personality data available.</Typography></Container>;
  }

  return (
    <Container maxWidth="md">
      <Box component="section" sx={{ p: 2, border: '2px solid grey', backgroundColor: 'bisque' }}>
        <Typography variant="h3" component="h3">
          Famous Bands and Singers
        </Typography>
        <Typography sx={{ fontStyle: 'italic' }} variant="h6" component="h6">
          Sean Glenn Magcalas - C-PEITEL3
        </Typography>

        <Stack direction="row" spacing={2} justifyContent="center" sx={{ my: 2 }}>
          <Button
            onClick={handleBackClick}
            variant="outlined"
            color="primary"
            startIcon={<ArrowBackIosNewIcon />}
            disabled={personalities.length === 0}
          >
            <Typography variant="h6">BACK</Typography>
          </Button>

          <Button
            onClick={handleNextClick}
            variant="outlined"
            color="primary"
            endIcon={<ArrowForwardIosIcon />}
            disabled={personalities.length === 0}
          >
            <Typography variant="h6">NEXT</Typography>
          </Button>
        </Stack>

        <Typography variant="h4" component="h2">
          {personality.name} {/* Use personality.name */}
        </Typography>

        <Typography variant="h6" component="h6">
          ({index + 1} of {personalities.length}) {/* Use personalities.length */}
        </Typography>

        <Card variant="outlined" sx={{ backgroundColor: 'burlywood', my: 2 }}>
          <CardContent>
            <div className="container">
              <img src={personality.imageUrl} alt={personality.imageAltText} style={{ width: '100%', height: 'auto' }} /> {/* Use personality.imageUrl and personality.imageAltText */}
            </div>
          </CardContent>
        </Card>

        <ExpandMore expand={expanded} onClick={handleExpandClick} sx={{ fontSize: 80 }}>
          <ExpandMoreIcon fontSize="inherit" />
        </ExpandMore>

        {expanded && (
          <Typography variant="body1" sx={{ mt: 2 }}>
            {personality.description} {/* Use personality.description */}
          </Typography>
        )}
      </Box>
    </Container>
  );
}
