import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import * as React from 'react';
import Container from '@mui/material/Container';
import { auth } from '../utils/firebase';
import MyLocationIcon from '@mui/icons-material/MyLocation';
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
import { ProfileContext } from '../contexts/ProfileContext';

function Settings(props) {
  const { value, setValue } = React.useContext(ProfileContext);
  const [DOB, setDOB] = React.useState(
    value['DOB'] ? new Date(value['DOB'].seconds * 1000) : null
  );
  const [firstName, setFirstName] = React.useState(value['firstName']);
  const [lastName, setLastName] = React.useState(value['lastName']);
  const [checkingEmail1, setCheckingEmail1] = React.useState(
    value['checkingEmail1']
  );
  const [checkingEmail2, setCheckingEmail2] = React.useState(
    value['checkingEmail2']
  );
  const [latitude, setLatitude] = React.useState(value['latitude']);
  const [city, setCity] = React.useState(value['city']);
  const [longitude, setLongitude] = React.useState(value['longitude']);
  const [locationError, setLocationError] = React.useState(false);
  const [country, setCountry] = React.useState(value['country']);

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
      userDataObject[pair[0]] = pair[1];
    }
    userDataObject.DOB = { seconds: DOB / 1000 };
    console.log(DOB);
    setValue(userDataObject);
    addUserRecordFB(auth['currentUser']['uid'], userDataObject)
      .then(() => {
        addUserRecordIDB(auth['currentUser']['uid'], userDataObject);
        setLoading(false);
      })

      .catch((error) => {
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
        <Box component="form" validate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
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
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
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
                value={checkingEmail1}
                onChange={(e) => setCheckingEmail1(e.target.value)}
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
                value={checkingEmail2}
                onChange={(e) => setCheckingEmail2(e.target.value)}
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
                value={city}
                onChange={(event) => setCity(event.target.value)}
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
            Save
          </LoadingButton>
        </Box>
      </Box>
    </Container>
  );
}

export default Settings;
