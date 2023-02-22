import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const ItemCard: React.FC = () => {
    const navigate = useNavigate();
    const onClick = () => {
        navigate('/viewitem')
    }

  const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );
  
  const card = (
    <React.Fragment>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Date of creation
        </Typography>
        <Typography variant="h5" component="div">
          Item Name
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          User
        </Typography>
        <Typography variant="body2">
          Collection
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={onClick}>Learn More</Button>
      </CardActions>
    </React.Fragment>
  );
  return (
    <Box sx={{ minWidth: 275, maxWidth: 300 }}>
    <Card variant="outlined">{card}</Card>
  </Box>
  )
}

export default ItemCard