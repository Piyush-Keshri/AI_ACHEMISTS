import './App.css'

import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';
import ErrorPreviewPage from './components/ErrorPreviewPage'

import CameraPage from './components/CameraPage';
import SuccessPreviewPage from './components/SuccessPreviewPage';
// import ReactWebcam from './components/ReactWebcam';

function App() {
  const [imageData, setImageData] = useState('');
  const [imageBlob, setImageBlob] = useState('');
  const [click, setClick] = useState(0);

  return (
    <BrowserRouter>
      <Container maxWidth="sm" sx={{ textAlign: 'center', marginTop: 3, color: '#eee' }}>
        <Routes>
          <Route path="/" element={<CameraPage setImageData={setImageData} setImageBlob={setImageBlob} setClick={setClick} click={click} />} />
          <Route path="/preview" element={
            click % 2 === 0 ?
            <ErrorPreviewPage imageData={imageData} imageBlob={imageBlob} click={click} /> : 
            <SuccessPreviewPage imageData={imageData} imageBlob={imageBlob} click={click} />
          } />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;