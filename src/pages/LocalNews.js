import { Tabs, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useEffect, useState } from 'react';
import LocalNewsPanel from '../components/LocalNewsPanel';
import { getJSON, validateData } from '../utils/fetch';

const drawerWidth = 200;
function LocalNews(props) {
  const [selectedTabID, setSelectedTabID] = useState(0);
  const [data, setData] = useState(null);
  const [categories, setcategories] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (value) => {
    setSelectedTabID(value);
  };
  useEffect(() => {
    getJSON(`${process.env.REACT_APP_API_DOMAIN}/local_news`).then((data) => {
      if (validateData(data)) {
        setData(data);
        setcategories(Object.keys(data));
      } else {
        setError('Error loading data');
      }
    });
  }, []);
  return (
    <Box sx={{ display: 'flex', marginTop: '48px', justifyContent: 'center' }}>
      {data ? (
        <>
          <Drawer
            sx={{
              zIndex: '1',
              width: drawerWidth,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
              },
            }}
            variant="permanent"
            anchor="left"
          >
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={selectedTabID}
              sx={{ mt: '48px' }}
            >
              {categories &&
                categories.map((category, index) => (
                  <ListItem
                    button
                    key={index}
                    onClick={() => handleChange(index)}
                  >
                    <ListItemText primary={category} />
                  </ListItem>
                ))}
            </Tabs>
          </Drawer>
          {categories &&
            categories.map((category, index) => (
              <LocalNewsPanel
                key={index}
                selectedTabID={selectedTabID}
                value={index}
                data={data[category]}
              />
            ))}
        </>
      ) : (
        <>
          {error ? (
            <Typography variant="h6">{error}</Typography>
          ) : (
            <Typography variant="h6">Loading ...</Typography>
          )}
        </>
      )}
    </Box>
  );
}

export default LocalNews;
