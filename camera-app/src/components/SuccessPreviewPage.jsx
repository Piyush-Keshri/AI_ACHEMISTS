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
          <Box sx={{ marginTop: '2rem', display: 'flex', alignItems: 'center', justifyCenter: 'center', background: '#555', height: 'fit-content', padding: '2rem', borderRadius: '5px' }}>
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
            
            <Typography sx={{ height: '3rem', width: '100%', background: '#58d651', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '1rem' }}>
              Buy 👍
            </Typography>

            <Button onClick={handleExpand} variant="contained">
              {expanded ? 'Show less' : 'Nutritional Breakdown'}
            </Button>
            <Collapse in={expanded} transitionComponent={Fade}>
              <Box sx={{ width: '100%', textAlign: 'left', margin: '2rem auto' }}>
                <Typography variant='h6' sx={{ fontWeight: 'bolder' }}>Explanation:</Typography>
                <Typography>Based on the provided nutritional information and your personal information, here's a detailed analysis of whether you should purchase and use this oatmeal product:</Typography>

                <Typography sx={{ marginTop: '1rem', fontWeight: 'bolder' }} variant='h6'>Reasoning:</Typography>

                <List>
                  <ListItem >
                      <ListItemText>
                      <b>Nutritional Content:</b><br />
                      <span style={{ color: '#bbb' }}>
                      The oatmeal product appears to be a good choice for you, as it is low in added sugars and saturated fat. It contains dietary fiber, which can be beneficial for managing diabetes and promoting weight loss. Fiber helps stabilize blood sugar levels and promotes a feeling of fullness, which can assist in controlling your appetite.
                      </span>
                      </ListItemText>
                  </ListItem>
                  
                  <ListItem >
                      <ListItemText>
                      <b>Caloric Content:</b><br />
                      <span style={{ color: '#bbb' }}>
                      The energy content is reasonable and can fit well within a balanced diet. Since you're looking to lose weight, it's important to monitor your caloric intake to create a calorie deficit, which is essential for weight loss.
                      </span>
                      </ListItemText>
                  </ListItem>

                  <ListItem >
                      <ListItemText>
                      <b>Allergies:</b><br /> 
                      <span style={{ color: '#bbb' }}>
                      The oatmeal product contains only one ingredient: Rolled Oats. Since you mentioned having allergies to peanuts, there is no indication that this product contains peanuts or peanut-derived ingredients. Therefore, it appears to be safe for you in terms of allergies.
                      </span>
                      </ListItemText>
                  </ListItem>

                  <ListItem >
                      <ListItemText>
                      <b>Age and Gender:</b><br /> 
                      <span style={{ color: '#bbb' }}>
                      The oatmeal product is suitable for individuals of all genders and age groups, including yours.
                      </span>
                      </ListItemText>
                  </ListItem>

                  <ListItem >
                      <ListItemText>
                      <b>Diabetes Management:</b><br /> 
                      <span style={{ color: '#bbb' }}>
                      The low glycemic index of oatmeal can be beneficial for managing diabetes. It provides a slow and steady release of glucose into the bloodstream, helping to prevent rapid spikes in blood sugar levels. However, always monitor your blood sugar levels and consult with your healthcare provider before making any significant changes to your diet.
                      </span>
                      </ListItemText>
                  </ListItem>

                  <ListItem >
                      <ListItemText>
                      <b>Weight Loss:</b><br /> 
                      <span style={{ color: '#bbb' }}>
                      Oatmeal is a commonly recommended food for weight loss due to its fiber content and ability to promote satiety. It can help you feel full for longer periods, which may aid in reducing overall calorie intake.
                      </span>
                      </ListItemText>
                  </ListItem>

                  <ListItem >
                      <ListItemText>
                      <b>Other Nutrients:</b><br /> 
                      <span style={{ color: '#bbb' }}>
                      The oatmeal product contains iron, magnesium, and zinc, which are important minerals for overall health.
                      </span>
                      </ListItemText>
                  </ListItem>
                </List>


                <Typography variant='h6' sx={{ fontWeight: 'bolder' }}>Potential concerns:</Typography>
                <List>
                <ListItem >
                      <ListItemText>
                      <b>Carbohydrate Intake:</b><br /> 
                      <span style={{ color: '#bbb' }}>
                      While the product is low in carbohydrates and sugars, it's still important to be mindful of your total carbohydrate intake, especially if you're managing diabetes. Monitor your blood sugar levels after consuming the oatmeal to ensure it doesn't cause any unwanted spikes.
                      </span>
                      </ListItemText>
                  </ListItem>


                  <ListItem >
                      <ListItemText>
                      <b>Medications:</b><br /> 
                      <span style={{ color: '#bbb' }}>
                      If you're taking any medications for diabetes, weight loss, or other health conditions, it's recommended to consult with your healthcare provider before making significant dietary changes.
                      </span>
                      </ListItemText>
                  </ListItem>

                  <ListItem >
                      <ListItemText>
                      <b>Portion Control:</b><br /> 
                      <span style={{ color: '#bbb' }}>
                      While oatmeal is a nutritious choice, portion control is key, especially if you're aiming to lose weight. Be mindful of serving sizes to manage your calorie intake effectively.
                      </span>
                      </ListItemText>
                  </ListItem>
                </List>


                <Typography>
                In conclusion, based on the provided information and your personal details, the oatmeal product seems like a suitable choice for you. However, it's crucial to consult with your healthcare provider or a registered dietitian before making any major changes to your diet, especially since you have diabetes. They can provide personalized guidance based on your specific health needs and goals.
                </Typography>

              </Box>
            </Collapse>
          </Box>

          )}

        </Container>
      );
    }
  };


export default SuccessPreviewPage