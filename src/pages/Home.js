import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import BG from '../images/bg.jpg';

export default function Home({ setUser }) {
  const [rSidePanel, setRSidePanel] = React.useState('signIn');
  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        sm={9}
        sx={{
          backgroundImage: `url(${BG})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',

          backgroundAttachment: 'fixed',
        }}
      />
      <Grid item sm={3} component={Paper} elevation={6} square>
        {rSidePanel === 'signIn' ? (
          <SignIn setRSidePanel={setRSidePanel} />
        ) : (
          <SignUp setRSidePanel={setRSidePanel} />
        )}
      </Grid>
    </Grid>
  );
}
