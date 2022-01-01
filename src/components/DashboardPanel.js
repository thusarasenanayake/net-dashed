import Box from '@mui/material/Box';
import Basics from '../pages/Basics';
import LocalNews from '../pages/LocalNews';
import ForeignNews from '../pages/ForeignNews';
import Weather from '../pages/Weather';
import Technology from '../pages/Technology';

const components = {
  Basics,
  'Local news': LocalNews,
  'Foreign news': ForeignNews,
  Weather,
  Technology,
};

function AppPanel(props) {
  const { selectedTabID, index, selectedTabName } = props;
  const SelectedTab = components[selectedTabName];

  return (
    <>
      {selectedTabID === index && (
        <Box sx={{ p: 3 }}>
          <SelectedTab {...props} />
        </Box>
      )}
    </>
  );
}

export default AppPanel;
