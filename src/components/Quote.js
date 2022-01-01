import { CircularProgress, Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { getJSON, validateData } from '../utils/fetch';

function Quote() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    getJSON(`${process.env.REACT_APP_API_DOMAIN}/quotes/single`).then((data) =>
      validateData(data) ? setData(data) : setError('Error loading data')
    );
  }, []);
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
          <Typography variant="body1">Quote of the day</Typography>
          <Typography variant="h4">{data.content}</Typography>
          <Typography variant="h6" pt={3}>
            - {data.author}
          </Typography>
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

export default Quote;
