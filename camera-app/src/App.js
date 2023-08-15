import './App.css'

import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';
import PreviewPage from './components/PreviewPage'

import CameraPage from './components/CameraPage';

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