// src/components/ImagePage.jsx
import { Box, Grid, Card, CardMedia, Typography } from '@mui/material';

const images = [
  { id: 1, src: 'image1.jpg', title: 'Image 1' },
  { id: 2, src: 'image2.jpg', title: 'Image 2' },
  { id: 3, src: 'image3.jpg', title: 'Image 3' },
  // Add more images as needed
];

const ImagePage = () => {
  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Image Gallery
      </Typography>
      <Grid container spacing={4}>
        {images.map((image) => (
          <Grid item key={image.id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                image={image.src}
                alt={image.title}
                onClick={() => window.location.href = `/image/${image.id}`}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ImagePage;
