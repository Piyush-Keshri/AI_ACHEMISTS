import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Button, Collapse, Fade, List, ListItem, ListItemText, AlertTitle, Alert } from '@mui/material';
import { MagnifyingGlass } from  'react-loader-spinner'
// import axios from 'axios';

const delay = ms => new Promise(
  resolve => setTimeout(resolve, ms)
);

const SuccessPreviewPage = ({ imageData, imageBlob }) => {
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
          <Box sx={{ marginTop: '2rem', display: 'flex', alignItems: 'center', justifyCenter: 'center', background: '#555', height: '30vh', borderRadius: '5px' }}>
            <img src={imageData} alt="Preview" style={{ maxWidth: '80%', margin: '0 auto' }} />
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
            
            <Typography sx={{ height: '3rem', width: '100%', background: '#58d651', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '1rem' }}>
              Buy 👍
            </Typography>

            <Button onClick={handleExpand} variant="contained">
              {expanded ? 'Collapse' : 'Expand'}
            </Button>
            <Collapse in={expanded} transitionComponent={Fade}>
              <Box sx={{ width: '100%', textAlign: 'left', margin: '2rem auto' }}>
                <Typography variant='h6' sx={{ fontWeight: 'bolder' }}>Explanation:</Typography>
                <Typography>Based on the provided information, it is not recommended for you to purchase and use this product.</Typography>

                <Typography sx={{ marginTop: '1rem', fontWeight: 'bolder' }} variant='h6'>Reasoning:</Typography>

                <List>
                  <ListItem >
                      <ListItemText>
                      <b>Diabetes:</b><br />
                      <span style={{ color: '#bbb' }}>
                      The carbohydrate content of the noodles is quite high, with 41.7g per serving. This can have a significant impact on blood sugar levels and may not be suitable for individuals with diabetes. It is generally recommended for individuals with diabetes to consume a controlled amount of carbohydrates per meal.
                      </span>
                      </ListItemText>
                  </ListItem>
                  
                  <ListItem >
                      <ListItemText>
                      <b>Weight loss:</b><br />
                      <span style={{ color: '#bbb' }}>
                      While the noodles do contain a moderate amount of protein, the high carbohydrate content and relatively high calorie content may not be suitable for a weight loss diet. It is usually recommended to consume foods that are lower in calories and promote satiety in a weight loss regimen.
                      </span>
                      </ListItemText>
                  </ListItem>

                  <ListItem >
                      <ListItemText>
                      <b>Allergies:</b><br /> 
                      <span style={{ color: '#bbb' }}>
                      The noodles you mentioned do not contain gluten or nuts, which is suitable for your allergies.
                      </span>
                      </ListItemText>
                  </ListItem>

                  <ListItem >
                      <ListItemText>
                      <b>Age and Gender:</b><br /> 
                      <span style={{ color: '#bbb' }}>
                      Age and gender do not have a significant impact on the suitability of the product. However, it is important to consider your specific dietary needs and health goals.
                      </span>
                      </ListItemText>
                  </ListItem>

                  <ListItem >
                      <ListItemText>
                      <b>Current Medications:</b><br /> 
                      <span style={{ color: '#bbb' }}>
                      No information is provided about any specific current medications you may be taking. It is always important to consult with a healthcare professional or a registered dietitian before making significant changes to your diet, especially if you are on any medications.
                      </span>
                      </ListItemText>
                  </ListItem>

                  <ListItem >
                      <ListItemText>
                      <b>Health Conditions:</b><br /> 
                      <span style={{ color: '#bbb' }}>
                      Considering your diabetes and weight loss goals, it is advisable to choose options with lower carbohydrate content and fewer calories to better manage blood sugar levels. There may be more suitable alternatives available specifically designed for individuals with diabetes.
                      </span>
                      </ListItemText>
                  </ListItem>
                </List>


                <Typography variant='h6' sx={{ fontWeight: 'bolder' }}>Potential concerns:</Typography>
                <List>
                  <ListItem>
                    <ListItemText sx={{ color: '#bbb' }}>
                      - High carbohydrate content: The high carbohydrate content per serving may lead to significant fluctuations in blood sugar levels for    individuals with diabetes.
                    </ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemText style={{ color: '#bbb' }}>
                      - High calorie content: The relatively high-calorie content may not align with your weight loss goals, as it is important to create a calorie deficit to promote weight loss.
                    </ListItemText>
                  </ListItem>
                </List>


                <Typography>In conclusion, it is recommended to consult with a healthcare professional or registered dietitian who can provide personalized advice based on your specific needs and health conditions. They can guide you in selecting alternative products that better align with your goals and dietary restrictions.</Typography>

              </Box>
            </Collapse>
          </Box>

          )}

        </Container>
      );
    }
  };


export default SuccessPreviewPage