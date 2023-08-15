import './App.css'

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container, Typography, Box, Button } from '@mui/material';
import axios from 'axios';

import CameraPage from './components/CameraPage';

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

function App() {
  const [imageData, setImageData] = useState('');
  const [imageBlob, setImageBlob] = useState('');

  return (
    <BrowserRouter>
      <Container maxWidth="sm" sx={{ textAlign: 'center', marginTop: 3, color: '#eee' }}>
        <Routes>
          <Route path="/" element={<CameraPage setImageData={setImageData} setImageBlob={setImageBlob} />} />
          <Route path="/preview" element={<PreviewPage imageData={imageData} imageBlob={imageBlob} />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;