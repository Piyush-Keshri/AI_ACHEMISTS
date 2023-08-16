import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, FormControl, InputLabel, MenuItem, Select, Box, Typography } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';
import CropPortraitIcon from '@mui/icons-material/CropPortrait';
import CropLandscapeIcon from '@mui/icons-material/CropLandscape';
import { styled } from '@mui/system';

const CircularButton = styled(Button)({
  borderRadius: '50%',
  padding: '20px',
  minWidth: 0,
  width: '80px',
  height: '80px',
  boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
});

const CameraPage = ({ setImageData, setClick, click }) => {
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const [facingMode, setFacingMode] = useState('environment');
  const [aspectRatio, setAspectRatio] = useState('landscape');
  const [cameraDevices, setCameraDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState('');

  const takePicture = (e) => {
    setClick(click+1);

    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const context = canvas.getContext('2d');
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      // canvas.toBlob(blob => {
      //   console.log(blob);
      //   const formData = new FormData();
      //   formData.append('image', blob, 'captured.jpg')
      //   // setImageBlob(formData)
      //   console.log(formData);
      // })

      const image = new Image();
      image.src = canvas.toDataURL('image/jpeg');
      const formData = new FormData();
      formData.append('image', image.src);

      // console.log(image)
      const imageDataURL = canvas.toDataURL('image/jpeg');
      setImageData(imageDataURL);


      // console.log(e.target.files[0])

      navigate('/preview', { state: { imageData: imageDataURL } });

    }
  };

  const switchCamera = () => {
    setFacingMode((prevMode) => (prevMode === 'user' ? 'environment' : 'user'));
  };

  const toggleAspectRatio = () => {
    setAspectRatio((prevRatio) => (prevRatio === 'landscape' ? 'portrait' : 'landscape'));
  };

  const handleDeviceChange = (event) => {
    setSelectedDeviceId(event.target.value);
  };

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode, deviceId: selectedDeviceId },
        });
        videoRef.current.srcObject = stream;
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    const fetchCameraDevices = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const cameraDevices = devices.filter((device) => device.kind === 'videoinput');
        setCameraDevices(cameraDevices);
      } catch (error) {
        console.error('Error fetching camera devices:', error);
      }
    };

    startCamera();
    fetchCameraDevices();

    return () => {
      if (videoRef.current) {
        const stream = videoRef.current.srcObject;
        if (stream) {
          const tracks = stream.getTracks();
          tracks.forEach((track) => track.stop());
        }
      }
    };
  }, [facingMode, selectedDeviceId]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.style.transform = aspectRatio === 'portrait' ? 'rotate(90deg)' : '';
    }
  }, [aspectRatio]);

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', marginTop: 3, overflow: 'hidden' }}>
      <Typography variant='h4'>Take Picture</Typography>

      {/* <FormControl
        variant="outlined"
        fullWidth
        sx={{
          marginY: 2,
          '& .MuiInputLabel-root': {
            color: 'white',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'white',
            },
          },
        }}
      >
        <InputLabel id="camera-device-label">Choose Camera:</InputLabel>
        <Select
          labelId="camera-device-label"
          id="camera-device-select"
          value={selectedDeviceId}
          onChange={handleDeviceChange}
          label="Choose Camera"
          sx={{ color: '#eee' }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {cameraDevices.map((device) => (
            <MenuItem key={device.deviceId} value={device.deviceId}>
              {device.label || `Camera ${device.deviceId}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl> */}


      <Box sx={{ height: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2rem' }}>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{
            width: '100%',
            height: '65vh',
            objectFit: 'cover',
          }}
        />
      </Box>


      <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '100%', marginTop: '1rem' }}>
        <CircularButton variant="contained" color="primary" onClick={switchCamera}>
          <FlipCameraAndroidIcon />
        </CircularButton>
        <CircularButton variant="contained" color="primary" onClick={takePicture}>
          <CameraAltIcon />
        </CircularButton>
        {aspectRatio === 'portrait' ? (
          <CircularButton variant="contained" color="primary" onClick={toggleAspectRatio}>
            <CropPortraitIcon />
          </CircularButton>
        ) : (
          <CircularButton variant="contained" color="primary" onClick={toggleAspectRatio}>
            <CropLandscapeIcon />
          </CircularButton>
        )}
      </Box>
    </Container>
  );
};

export default CameraPage



