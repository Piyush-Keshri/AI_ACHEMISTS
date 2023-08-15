import React, { useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import axios from 'axios';

const PreviewPage = ({ imageData, imageBlob }) => {
    // console.log(imageData)
    // const formData = new FormData();
    // formData.append('image', imageBlob);
  
    // console.log(imageBlob);
  
    useEffect(() => {
      if (imageData !== '') {
        axios.post('http://127.0.0.1:5000/process_image', {url: imageData}).then(res => {
          console.log(res.data)
        })
      }
    }, [])
  
    if (imageData === '') {
      return (
        <Container maxWidth="sm" sx={{ textAlign: 'center', marginTop: 3 }}>
          <h2>Preview Page</h2>
          <Typography>No Image To DIsplay</Typography>
        </Container>
      );
    } else {
      return (
        <Container maxWidth="sm" sx={{ textAlign: 'center', marginTop: 3 }}>
          <h2>Preview Page</h2>
          <img src={imageData} alt="Preview" style={{ maxWidth: '100%' }} />
        </Container>
      );
    }
  };