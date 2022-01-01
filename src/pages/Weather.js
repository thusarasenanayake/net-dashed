import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Brightness5Icon from '@mui/icons-material/Brightness5';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import BrightnessMediumIcon from '@mui/icons-material/BrightnessMedium';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { Avatar, Divider, IconButton, Stack } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useContext, useEffect, useState } from 'react';
import { postJSON, validateData } from '../utils/fetch';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { capitalizeFirstLetter, formatTime } from '../utils/text';
import { getWindStatus, getWindDirection } from '../utils/wind';
import { Box } from '@mui/system';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Grid, Table, TableBody, TableCell, TableRow } from '@mui/material';
import Default from '../images/Default.jpg';
import Clear from '../images/Clear.jpg';
import Rain from '../images/Rain.jpg';
import Clouds from '../images/Clouds.jpg';
import Snow from '../images/Snow.jpg';
import { ProfileContext } from '../contexts/ProfileContext';

const availableBGS = { Clear, Rain, Clouds, Snow };

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

function Weather() {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const now = new Date();
  const { value } = useContext(ProfileContext);

  useEffect(() => {
    const abortController = new AbortController();

    postJSON(`${process.env.REACT_APP_API_DOMAIN}/weather`, {
      body: JSON.stringify({
        lat: value['latitude'],
        lon: value['longitude'],
        city: value['city'],
      }),
    }).then((data) =>
      validateData(data) ? setData(data) : setError('Error loading data')
    );
    return () => {
      abortController.abort();
    };
  }, [value]);

  const [expanded, setExpanded] = useState();

  const expandHandler = (key) => {
    if (expanded === key) {
      setExpanded('');
    } else {
      setExpanded(key);
    }
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-evenly"
      alignItems="flex-start"
      sx={{ marginTop: '48px' }}
    >
      {data ? (
        data.daily.map((day, index) => (
          <Card
            sx={{
              maxWidth: 350,
              m: '15px',
              border: '2px solid rgb(230 227 227)',
              height: ' auto',
            }}
            key={index}
          >
            <CardHeader
              avatar={
                <Avatar
                  src={`https://openweathermap.org/img/w/${day.weather[0]['icon']}.png`}
                  align="center"
                />
              }
              title={new Date(
                now.getTime() + index * 24 * 60 * 60 * 1000
              ).toDateString()}
              subheader={`${value['city']}, ${value['country']}`}
            />
            <CardContent
              sx={{
                backgroundImage: `${
                  Object.keys(availableBGS).includes(day.weather[0]['main'])
                    ? `url(${availableBGS[day['weather'][0]['main']]})`
                    : `url(${Default})`
                }`,
                color: 'white',
                backgroundSize: 'cover',
                p: '20px',
              }}
            >
              <Typography variant="body2">
                The high will be {Math.round(day.temp.max)}°C, the low will be{' '}
                {Math.round(day.temp.min)}°C.
              </Typography>
              <Typography variant="body2" sx={{ mb: '20px' }}>
                {`${capitalizeFirstLetter(
                  day.weather[0].description
                )}. ${getWindStatus(day.wind_speed)}.`}
              </Typography>

              <Typography variant="body1" sx={{ display: 'inline' }}>
                Rain : {day.rain ? `${day.rain} mm` : false} (
                {(day.pop * 100).toFixed(0)}%)
              </Typography>

              <Typography variant="body1">
                Wind speed : {day.wind_speed}m/s
                {getWindDirection(day.wind_deg)}
              </Typography>
              <Typography variant="body1">
                Pressure : {day.pressure}hPa
              </Typography>

              <Typography variant="body1">
                Humidity : {day.humidity}%
              </Typography>
              <Divider orientation="vertical" flexItem />
              <Typography variant="body1">UV : {day.uvi}</Typography>
              <Divider orientation="vertical" flexItem />
              <Typography variant="body1">
                Dew point : {day.dew_point}°C
              </Typography>

              <Stack direction="row" pt={1} spacing={1}>
                <WbSunnyIcon />
                <Typography variant="body1">
                  {formatTime(day.sunrise * 1000)}
                </Typography>
                <Divider orientation="vertical" flexItem />
                <DarkModeIcon />
                <Typography variant="body1">
                  {formatTime(day.sunset * 1000)}
                </Typography>
              </Stack>

              <Stack direction="row" pt={4} spacing={2}>
                <Box sx={{ pt: '32px' }}>
                  <Typography variant="body2">Temp.</Typography>
                  <Typography variant="body2">Feels like</Typography>
                </Box>
                <Box>
                  <Brightness5Icon sx={{ pb: '5px' }} />
                  <Typography variant="body2">
                    {Math.round(day.temp.morn)}°C
                  </Typography>
                  <Typography variant="body2">
                    {Math.round(day.feels_like.morn)}°C
                  </Typography>
                </Box>
                <Divider orientation="vertical" flexItem />
                <Box>
                  <Brightness7Icon sx={{ pb: '5px' }} />
                  <Typography variant="body2">
                    {Math.round(day.temp.morn)}°C
                  </Typography>
                  <Typography variant="body2">
                    {Math.round(day.feels_like.morn)}°C
                  </Typography>
                </Box>
                <Divider orientation="vertical" flexItem />
                <Box>
                  <BrightnessMediumIcon sx={{ pb: '5px' }} />
                  <Typography variant="body2">
                    {Math.round(day.temp.morn)}°C
                  </Typography>
                  <Typography variant="body2">
                    {Math.round(day.feels_like.morn)}°C
                  </Typography>
                </Box>
                <Divider orientation="vertical" flexItem />
                <Box>
                  <Brightness4Icon sx={{ pb: '5px' }} />
                  <Typography variant="body2">
                    {Math.round(day.temp.morn)}°C
                  </Typography>
                  <Typography variant="body2">
                    {Math.round(day.feels_like.morn)}°C
                  </Typography>
                </Box>
              </Stack>
            </CardContent>

            <CardActions disableSpacing>
              <ExpandMore
                expand={index === expanded ? true : false}
                onClick={() => expandHandler(index)}
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse
              in={index === expanded ? true : false}
              timeout="auto"
              unmountOnExit
            >
              <CardContent>
                {index === 0 ? (
                  <Table>
                    <TableBody>
                      {data.hourly.map((hour, index) => (
                        <div key={index}>
                          {index <= 24 ? (
                            <TableRow>
                              <TableCell align="left">
                                {`${formatTime(
                                  now.getTime() + 1000 * 60 * 60 * index
                                )} - ${formatTime(
                                  now.getTime() + 1000 * 60 * 60 * (index + 1)
                                )}`}
                              </TableCell>
                              <TableCell align="left">
                                {hour.weather[0]['description']}
                              </TableCell>
                            </TableRow>
                          ) : (
                            false
                          )}
                        </div>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  false
                )}
              </CardContent>
            </Collapse>
          </Card>
        ))
      ) : (
        <>
          {error ? (
            <Typography variant="h6">{error}</Typography>
          ) : (
            <Typography variant="h6">Loading ...</Typography>
          )}
        </>
      )}
    </Grid>
  );
}

export default Weather;
