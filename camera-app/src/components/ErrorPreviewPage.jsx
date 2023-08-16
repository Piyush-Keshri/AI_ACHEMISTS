import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Button, Collapse, Fade, List, ListItem, ListItemText, AlertTitle, Alert } from '@mui/material';
import { MagnifyingGlass } from  'react-loader-spinner'
// import axios from 'axios';

const delay = ms => new Promise(
  resolve => setTimeout(resolve, ms)
);

const ErrorPreviewPage = ({ imageData, imageBlob }) => {
    // console.log(imageData)
    // const formData = new FormData();
    // formData.append('image', imageBlob);
  
    // console.log(imageBlob);

    const [expanded, setExpanded] = useState(false);
    const [loading, setLoading] = useState(true)

    const handleExpand = () => {
      setExpanded((prevExpanded) => !prevExpanded);
    }

    const dataURLtoBlob = (dataURL) => {
      const arr = dataURL.split(',');
      const mime = arr[0].match(/:(.*?);/)[1];
      const byteString = atob(arr[1]);
      let n = byteString.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = byteString.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    };
  
    useEffect(() => {
      if (imageData !== '') {
        const formData = new FormData();
        const blob = dataURLtoBlob(imageData);
        formData.append('image', blob, 'captured.jpg');

        // console.log(formData)
      }
    }, [imageData]);


    const setDelay = async () => {
      await delay(3000)
      setLoading(false);
    }
    setDelay()
  
  
    if (imageData === '') {
      return (
        <Container maxWidth="sm" sx={{ textAlign: 'center', marginTop: 3 }}>
          <h2>Preview Page</h2>
          <Typography>No Image To Display</Typography>
        </Container>
      );
    } else {
      return (
        <Container maxWidth="sm" sx={{ textAlign: 'center', marginTop: 3, maxWidth: '400px' }}>
          <Typography variant='h4'>Preview Page</Typography>
          <Box sx={{ marginTop: '2rem', display: 'flex', alignItems: 'center', justifyCenter: 'center', background: '#555', borderRadius: '5px', height: 'fit-content', padding: '2rem' }}>
            <img src={imageData} alt="Preview" style={{ maxWidth: '100%', margin: '0 auto' }} />
          </Box>

          {loading ? (
            <Box sx={{ margin: '2rem 0' }}>
            <Typography>Analysing...</Typography>
            <MagnifyingGlass
              visible={true}
              height="80"
              width="80"
              ariaLabel="MagnifyingGlass-loading"
              wrapperStyle={{}}
              wrapperClass="MagnifyingGlass-wrapper"
              glassColor = '#c0efff'
              color = '#e15b64'
            />
          </Box>
          ) : (
          <Box sx={{ marginTop: '2rem', textAlign: 'left' }}>
            
            <Typography sx={{ height: '3rem', width: '100%', background: '#d65a51', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '1rem' }}>
              Don't Buy 👎
            </Typography>

            <Button onClick={handleExpand} variant="contained">
              {expanded ? 'Show less' : 'Nutritional Breakdown'}
            </Button>
            <Collapse in={expanded} transitionComponent={Fade}>
              <Box sx={{ width: '100%', textAlign: 'left', margin: '2rem auto' }}>
                <Typography variant='h6' sx={{ fontWeight: 'bolder' }}>Explanation:</Typography>
                <Typography>Based on the provided information, it is not recommended for you to purchase and use this product.</Typography>

                <Typography sx={{ marginTop: '1rem', fontWeight: 'bolder' }} variant='h6'>Reasoning:</Typography>

                <List>
                  <ListItem >
                      <ListItemText>
                      <b>Nutritional Content:</b><br />
                      <span style={{ color: '#bbb' }}>
                      The bread appears to be relatively high in calories (246 kcal per 100g) and carbohydrates. It's important for you, as someone looking to lose weight, to focus on a balanced diet that supports your weight loss goals and diabetes management.
                      </span>
                      </ListItemText>
                  </ListItem>
                  
                  <ListItem >
                      <ListItemText>
                      <b>Sodium Content:</b><br />
                      <span style={{ color: '#bbb' }}>
                      The sodium content is 380mg per 100g. People with diabetes should be mindful of sodium intake as it can affect blood pressure and overall health.
                      </span>
                      </ListItemText>
                  </ListItem>

                  <ListItem >
                      <ListItemText>
                      <b>Allergies:</b><br /> 
                      <span style={{ color: '#bbb' }}>
                      You have mentioned that you have allergies to peanuts. While the bread itself does not contain peanuts, cross-contamination could potentially occur during the manufacturing process. The ingredient list does not include peanuts, but people with severe allergies should be cautious when consuming products processed in facilities that handle allergens.
                      </span>
                      </ListItemText>
                  </ListItem>

                  <ListItem >
                      <ListItemText>
                      <b>Age and Gender:</b><br /> 
                      <span style={{ color: '#bbb' }}>
                      The product does not have any specific contraindications based on age or gender. However, your age and gender should be considered when choosing foods that align with your health goals.
                      </span>
                      </ListItemText>
                  </ListItem>

                  <ListItem >
                      <ListItemText>
                      <b>Diabetes:</b><br /> 
                      <span style={{ color: '#bbb' }}>
                      As someone with diabetes, it's important to manage your carbohydrate intake to regulate blood sugar levels. The nutritional information provided indicates that this bread contains 49.1g of carbohydrates per 100g. While carbohydrates are a necessary part of the diet, individuals with diabetes should choose whole grains and high-fiber carbohydrates to help stabilize blood sugar levels. The product description mentions dietary fibers, but the specific fiber content is not provided.
                      </span>
                      </ListItemText>
                  </ListItem>

                  <ListItem >
                      <ListItemText>
                      <b>Artificial Ingredients:</b><br /> 
                      <span style={{ color: '#bbb' }}>
                      The bread contains additives such as emulsifier (471), antioxidant (300), acidity regulator (260), and preservative (282). While these additives are considered safe for consumption, some individuals may prefer to minimize their consumption of processed foods containing these additives.
                      </span>
                      </ListItemText>
                  </ListItem>
                </List>


                <Typography>
                Given your desire to lose weight and manage diabetes, it's recommended to choose whole, minimally processed foods with clear nutritional information. It's important to consult with a registered dietitian or healthcare professional who can provide personalized dietary recommendations based on your specific health needs and goals.
                </Typography>

              </Box>
            </Collapse>
          </Box>

          )}

        </Container>
      );
    }
  };


export default ErrorPreviewPage