import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';

function TabPanel(props) {
  const { data, selectedTabID, value } = props;
  return (
    <>
      {selectedTabID === value && (
        <Grid container direction="row" justifyContent="space-evenly">
          {data.map((record, index) => (
            <Card
              elevation={2}
              key={index}
              sx={{
                m: '15px 5px',
                maxWidth: 280,
                borderRadius: '40px',
                p: '20px',
                background:
                  'linear-gradient(308deg, rgba(77,145,244,1) 0%, rgba(167,247,237,1) 68%)',
              }}
            >
              <CardContent>
                <Typography
                  sx={{ fontWeight: 'bold' }}
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  {record.heading}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontWeight: '600' }}
                >
                  {record.content ? `${record.content} ...` : false}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  target="_blank"
                  rel="noopener"
                  href={record.link}
                >
                  Read More
                </Button>
              </CardActions>
            </Card>
          ))}
        </Grid>
      )}
    </>
  );
}

export default TabPanel;
