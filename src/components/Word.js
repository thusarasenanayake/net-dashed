import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { getJSON, validateData } from '../utils/fetch';
import { CircularProgress, IconButton, Paper, Stack } from '@mui/material';
import { Box } from '@mui/system';

function Word() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const play = (url) => {
    new Audio(url).play();
  };

  useEffect(() => {
    getJSON(`${process.env.REACT_APP_API_DOMAIN}/words/single`).then((data) =>
      validateData(data) ? setData(data) : setError('Error loading data')
    );
  }, []);

  return (
    <>
      {data ? (
        <Paper
          elevation={3}
          sx={{
            minHeight: 250,
            borderRadius: '40px',
            p: '20px',
            background:
              'linear-gradient(308deg, rgba(77,145,244,1) 0%, rgba(167,247,237,1) 68%)',
          }}
        >
          <Typography variant="body1">Word of the day</Typography>
          <Typography variant="h4" pt={2}>
            <IconButton onClick={() => play(data['phonetics'][0].audio)}>
              <VolumeUpRoundedIcon />
            </IconButton>
            {data.word}
          </Typography>
          <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
            {data.meanings[0].partOfSpeech}
          </Typography>
          <Typography variant="h6">
            {data.meanings[0].definitions[0].definition}
          </Typography>

          {data.origin ? (
            <>
              <Typography
                variant="body1"
                sx={{ fontStyle: 'italic', pt: '10px' }}
              >
                origin
              </Typography>
              <Typography variant="h6">{data.origin}</Typography>
            </>
          ) : (
            false
          )}
          <Stack direction="row" sx={{ pt: '10px' }} spacing={10}>
            {data.meanings[0].definitions[0].synonyms.length > 0 ? (
              <Box>
                <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
                  synonyms
                </Typography>
                {data.meanings[0].definitions[0].synonyms.map(
                  (element, index) =>
                    index < 3 ? (
                      <Typography variant="h6" key={index}>
                        {element}
                      </Typography>
                    ) : (
                      false
                    )
                )}
              </Box>
            ) : (
              false
            )}
            {data.meanings[0].definitions[0].antonyms.length > 0 ? (
              <Box>
                <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
                  antonyms
                </Typography>
                {data.meanings[0].definitions[0].antonyms.map(
                  (element, index) =>
                    index < 3 ? (
                      <Typography variant="h6" key={index}>
                        {element}
                      </Typography>
                    ) : (
                      false
                    )
                )}
              </Box>
            ) : (
              false
            )}
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
    </>
  );
}

export default Word;
