import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Copyright from './Copyright';
import * as React from 'react';
import Container from '@mui/material/Container';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebase';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { useHistory } from 'react-router';
import {
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { DatePicker, LoadingButton, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { addUserRecordFB, addUserRecordIDB } from '../utils/dbFunctions';

function SignUp(props) {
  const [DOB, setDOB] = React.useState(null);
  const history = useHistory();
  const [error, setError] = React.useState(false);
  const [latitude, setLatitude] = React.useState(null);
  const [longitude, setLongitude] = React.useState(null);
  const [locationError, setLocationError] = React.useState(false);
  const [country, setCountry] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const getLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
    } else {
      setLocationError(true);
    }
  };

  const handleSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    const userData = new FormData(event.currentTarget);
    const userDataObject = {};

    for (const pair of userData.entries()) {
      if (pair[0] === 'password') {
        continue;
      }

      userDataObject[pair[0]] = pair[1];
    }
    userDataObject.DOB = DOB;

    createUserWithEmailAndPassword(
      auth,
      userData.get('email'),
      userData.get('password')
    )
      .then((userCredential) => {
        addUserRecordFB(userCredential['user']['uid'], userDataObject).then(
          () => {
            addUserRecordIDB(userCredential['user']['uid'], userDataObject);
            history.push('/dashboard');
          }
        );
      })
      .catch((error) => {
        setError(true);
        setLoading(false);
        console.error(error);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" validate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={error}
                required
                type="email"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                error={error}
                fullWidth
                label="Password"
                type="password"
                id="password"
                name="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  name="dob"
                  label="Birthday"
                  value={DOB}
                  onChange={(newValue) => {
                    setDOB(newValue);
                  }}
                  renderInput={(params) => <TextField fullWidth {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Divider
                textAlign="left"
                sx={{ color: 'rgb(68 57 57 / 87%)', fontSize: 'small' }}
              >
                email addresses to check breaches
              </Divider>
            </Grid>

            <Grid item xs={12}>
              <TextField
                type="email"
                required
                fullWidth
                label="Email Address 1"
                name="checkingEmail1"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="email"
                fullWidth
                label="Email Address 2"
                name="checkingEmail2"
                autoComplete="email"
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Divider
                textAlign="left"
                sx={{
                  color: 'rgb(68 57 57 / 87%)',
                  fontSize: 'small',
                }}
              >
                location for weather services
              </Divider>
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                error={locationError}
                required
                autoComplete="latitude"
                name="latitude"
                fullWidth
                id="latitude"
                label="Latitude"
                value={latitude ? latitude : ''}
                onChange={(e) => setLatitude(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={5}>
              <TextField
                error={locationError}
                required
                fullWidth
                id="longitude"
                label="Longitude"
                name="longitude"
                autoComplete="longitude"
                value={longitude ? longitude : ''}
                onChange={(e) => setLongitude(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={2} alignSelf="center">
              <IconButton
                color="primary"
                component="span"
                onClick={getLocation}
              >
                <MyLocationIcon />
              </IconButton>
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                fullWidth
                id="city"
                label="City"
                name="city"
                required
                autoComplete="address-line1"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel id="country-select-label">Country</InputLabel>
                <Select
                  id="country"
                  label="Country"
                  required
                  value={country}
                  labelId="country-select-label"
                  name="country"
                  onChange={(event) => setCountry(event.target.value)}
                >
                  <MenuItem value="LK">🇱🇰 Sri Lanka</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <LoadingButton
            loading={loading}
            disabled={loading}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </LoadingButton>

          <Grid container>
            <Grid item xs>
              <Typography
                sx={{
                  color: 'primary.main',

                  mb: 1,
                  '&:hover': { cursor: 'pointer', textDecoration: 'underline' },
                }}
                variant="body2"
                onClick={() => props.setRSidePanel('signIn')}
              >
                Already have an account? Sign in
              </Typography>

              <Box sx={{ mt: 4 }}>
                <Copyright />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default SignUp;
