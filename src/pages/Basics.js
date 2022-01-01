import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Clock from '../components/Clock';
import Weather from '../components/Weather';
import Quote from '../components/Quote';
import Word from '../components/Word';
import Pawned from '../components/Pawned';

function Basics() {
  return (
    <Box>
      <div style={{ marginTop: '48px' }}></div>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Clock />
        </Grid>

        <Grid item xs={8}>
          <Weather />
        </Grid>

        <Grid item xs={6}>
          <Quote />
        </Grid>

        <Grid item xs={6}>
          <Word />
        </Grid>

        <Grid item xs={3}>
          <Pawned />
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    </Box>
  );
}

export default Basics;
