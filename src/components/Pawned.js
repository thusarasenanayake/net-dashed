import { CircularProgress, Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { useEffect, useState, useContext } from 'react';
import { postJSON, validateData } from '../utils/fetch';
import { ProfileContext } from '../contexts/ProfileContext';

function Pawned() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { value } = useContext(ProfileContext);

  useEffect(() => {
    postJSON(`${process.env.REACT_APP_API_DOMAIN}/pawned`, {
      body: JSON.stringify({
        emails: [value['checkingEmail1'], value['checkingEmail2']],
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
    <Paper
      elevation={3}
      sx={{
        borderRadius: '40px',
        p: '20px',
        background:
          'linear-gradient(308deg, rgba(77,145,244,1) 0%, rgba(167,247,237,1) 68%)',
      }}
    >
      {data ? (
        Object.keys(data).map((element, index) => (
          <Box key={index} sx={{ p: '10px' }}>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              {element} :
            </Typography>
            <Typography sx={{ fontStyle: 'italic' }}>
              {data[element]['status']}
            </Typography>
          </Box>
        ))
      ) : (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 120,
          }}
        >
          {error ? (
            <Typography variant="body2">{error}</Typography>
          ) : (
            <CircularProgress color="secondary" />
          )}
        </Box>
      )}
    </Paper>
  );
}

export default Pawned;
