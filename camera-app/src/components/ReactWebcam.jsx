import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';

const ReactWebcam = () => {
  const videoRef = useRef(null);
  const [imageData, setImageData] = useState('');

  const takePicture = async () => {
    if (videoRef.current) {
      const imageSrc = videoRef.current.getScreenshot();
      
      // Convert Data URL to Blob
      const response = await fetch(imageSrc);
      const blob = await response.blob();

      const formData = new FormData();
      formData.append('image', blob, 'captured.jpg');

      // Now 'formData' contains the image data as a Blob
      // You can send it to the backend using axios or fetch
      try {
        // const response = await axios.post('/upload', formData);
        // Handle success

        console.log(formData)
      } catch (error) {
        // Handle error
      }
    }
  };

  return (
    <div>
      <Webcam
        audio={false}
        ref={videoRef}
      />
      <button onClick={takePicture}>Take Picture</button>
    </div>
  );
};

export default ReactWebcam;
