import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { getJSON, validateData } from '../utils/fetch';

function Technology() {
  const [error, setError] = useState(null);
  const [data, setData] = useState();

  useEffect(() => {
    getJSON(`${process.env.REACT_APP_API_DOMAIN}/foreign_news/technology`).then(
      (data) =>
        validateData(data)
          ? setData(data.articles)
          : setError('Error loading data')
    );
  }, []);

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-evenly"
      sx={{ marginTop: '48px' }}
    >
      {data ? (
        data.map((record, index) => (
          <Grid key={index} item xs="auto">
            <Card
              elevation={2}
              sx={{
                m: '15px',
                maxWidth: 345,
                borderRadius: '40px',
                p: '20px',
                background:
                  'linear-gradient(308deg, rgba(77,145,244,1) 0%, rgba(167,247,237,1) 68%)',
              }}
            >
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {record.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {record.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  target="_blank"
                  rel="noopener"
                  href={record.url}
                >
                  Read More
                </Button>
              </CardActions>
            </Card>
          </Grid>
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

export default Technology;
