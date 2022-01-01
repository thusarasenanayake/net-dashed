import Typography from '@mui/material/Typography';
import CloudIcon from '@mui/icons-material/Cloud';
import NearMeIcon from '@mui/icons-material/NearMe';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import { CircularProgress, Divider, Paper, Stack } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useContext, useEffect, useState } from 'react';
import { postJSON, validateData } from '../utils/fetch';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { capitalizeFirstLetter, formatTime } from '../utils/text';
import { getWindStatus, getWindDirection } from '../utils/wind';
import { Box } from '@mui/system';
import { ProfileContext } from '../contexts/ProfileContext';

function Weather() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const { value } = useContext(ProfileContext);
  useEffect(() => {
    postJSON(`${process.env.REACT_APP_API_DOMAIN}/weather`, {
      body: JSON.stringify({
        lat: value['latitude'],
        lon: value['longitude'],
        city: value['city'],
      }),
    }).then((data) => {
      if (validateData(data)) {
        setData(data);
      } else {
        setData(null);
        setError(data.message || 'Error loading data');
      }
    });
  }, [value]);
  return (
    <div>
      {data ? (
        <Paper
          elevation={3}
          sx={{
            borderRadius: '40px',
            p: '20px',
            minHeight: 250,
            background:
              'linear-gradient(308deg, rgba(77,145,244,1) 0%, rgba(167,247,237,1) 68%)',
          }}
        >
          <Typography variant="body2">
            {value['city'] ? value['city'] + ', ' : false}{' '}
            {value['country'] ? value['country'] : false}
          </Typography>
          <Typography variant="h4">
            {Math.round(data.current.temp)}°C
            <Box
              component="img"
              src={`https://openweathermap.org/img/w/${data.current.weather[0].icon}.png`}
              alt="weather image"
              align="center"
            />
          </Typography>
          <Typography variant="body2">
            The high will be {Math.round(data.daily[0].temp.max)}°C, the low
            will be {Math.round(data.daily[0].temp.min)}°C.
          </Typography>

          <Typography variant="body2">
            {`${capitalizeFirstLetter(
              data.daily[0].weather[0].description
            )}. ${getWindStatus(data.daily[0].wind_speed)}.`}
          </Typography>

          <Stack direction="row" pt={2} spacing={1}>
            <CloudIcon />
            <Typography variant="body1" sx={{ display: 'inline' }}>
              {data.daily[0].rain ? data.daily[0].rain + ' mm' : false} (
              {data.daily[0].pop * 100}%)
            </Typography>
            <Divider orientation="vertical" flexItem />
            <NearMeIcon />
            <Typography variant="body1">
              {data.daily[0].wind_speed}m/s{' '}
              {getWindDirection(data.daily[0].wind_deg)}
            </Typography>
            <Divider orientation="vertical" flexItem />
            <BubbleChartIcon />
            <Typography variant="body1">{data.daily[0].pressure}hPa</Typography>
            <Divider orientation="vertical" flexItem />
            <Typography variant="body1">
              Humidity {data.daily[0].humidity}%
            </Typography>
            <Divider orientation="vertical" flexItem />
            <Typography variant="body1">UV {data.daily[0].uvi}</Typography>
            <Divider orientation="vertical" flexItem />
            <Typography variant="body1">
              Dew point {data.daily[0].dew_point}°C
            </Typography>
          </Stack>

          <Stack direction="row" pt={1} spacing={1}>
            <WbSunnyIcon />
            <Typography variant="body1">
              {formatTime(data.current.sunrise * 1000)}
            </Typography>
            <Divider orientation="vertical" flexItem />
            <DarkModeIcon />
            <Typography variant="body1">
              {formatTime(data.current.sunset * 1000)}
            </Typography>
          </Stack>

          <Stack direction="row" pt={2} spacing={3}>
            <Box>
              <Typography variant="h6">Morning</Typography>
              <Typography variant="body2">
                {Math.round(data.daily[0].feels_like.morn)}°C
              </Typography>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box>
              <Typography variant="h6">Afternoon</Typography>
              <Typography variant="body2">
                {Math.round(data.daily[0].feels_like.day)}°C
              </Typography>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box>
              <Typography variant="h6"> Evening </Typography>
              <Typography variant="body2">
                {Math.round(data.daily[0].feels_like.eve)}°C
              </Typography>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box>
              <Typography variant="h6">Night</Typography>
              <Typography variant="body2">
                {Math.round(data.daily[0].feels_like.night)}°C
              </Typography>
            </Box>
          </Stack>
        </Paper>
      ) : (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 250,
          }}
        >
          {error ? (
            <Typography variant="body2">{error}</Typography>
          ) : (
            <CircularProgress color="secondary" />
          )}
        </Box>
      )}
    </div>
  );
}

export default Weather;
