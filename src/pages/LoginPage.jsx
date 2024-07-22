import React from 'react';
//import { TextField, Checkbox, Button, Typography, Grid, Paper, Divider, Box, Avatar } from '@mui/material';
//import { styled } from '@mui/system';
import './LoginPage.css'
import { FaGoogle } from 'react-icons/fa';

//const style = {
//  color : "#BDBDBD"
//}

// const testimonials = [
//   { name: 'John Doe', message: 'Great platform! Really helped me improve my productivity.', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
//   { name: 'Jane Smith', message: 'I love the user experience, easy to navigate and very intuitive.', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
//   { name: 'Emily Johnson', message: 'Fantastic service and support!', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' }
// ];

// const StyledContainer = styled('div')({
//   minHeight: '100vh',
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   backgroundColor: '#889B9E', //first color
//   color: '#FFFFFF',
// });

// const StyledPaper = styled(Paper)({
//   padding: '2rem',
//   backgroundColor: '#152128', //second color
//   borderRadius: '10px'
// });

const Login = () => {
  return (
    <div class='login-page'>
      <div class='login-box'>

      </div>
    </div>
    // <StyledContainer>
    //     <Grid item xs={12} md={7} lg={6}>
    //       <StyledPaper>
    //         <Typography style={style} variant="h4" gutterBottom>Sign In</Typography>
    //         <TextField
    //           fullWidth
    //           label="Email"
    //           variant="outlined"
    //           margin="normal"
    //           InputLabelProps={{ style: { color: '#2A2A2A'} }}
    //           InputProps={{ style: { backgroundColor: '#BDBDBD', color: '#FFFFFF' } }}
    //         />
    //         <TextField
    //           fullWidth
    //           label="Password"
    //           type="password"
    //           variant="outlined"
    //           margin="normal"
    //           InputLabelProps={{ style: { color: '#2A2A2A' } }}
    //           InputProps={{ style: { backgroundColor: '#BDBDBD', color: '#FFFFFF' } }}
    //         />
    //         <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
    //           <Box display="flex" alignItems="center">
    //             <Checkbox style={{ color: '#BDBDBD' }} />
    //             <Typography variant="body2">Remember me</Typography>
    //           </Box>
    //           <Button color="secondary">Forgot password?</Button>
    //         </Box>
    //         <Button variant="contained" color="primary" fullWidth style={{ margin: '1rem 0' }}>Sign In</Button>
    //         <Divider style={{ backgroundColor: '#BDBDBD', margin: '1rem 0' }}>Or</Divider>
    //         <Button variant="outlined" color="secondary" fullWidth startIcon={<FaGoogle />}>Sign in with Google</Button>
    //       </StyledPaper>
    //     <Grid item xs={12} md={5} lg={6}>
    //       <Grid container spacing={2}>
    //         {testimonials.map((testimonial, index) => (
    //           <Grid item xs={12} key={index}>
    //             <Paper style={{ backgroundColor: '#152128', padding: '1rem', borderRadius: '10px', display: 'flex', alignItems: 'center', color: '#BDBDBD' }}>
    //               <Avatar src={testimonial.avatar} style={{ border: '2px solid #BDBDBD', margin: '0 1rem 0 0' }} />
    //               <Box>
    //                 <Typography variant="h6">{testimonial.name}</Typography>
    //                 <Typography variant="body2">{testimonial.message}</Typography>
    //               </Box>
    //             </Paper>
    //           </Grid>
    //         ))}
    //       </Grid>
    //     </Grid>
    //   </Grid>
    // </StyledContainer>
  );
};

export default Login;