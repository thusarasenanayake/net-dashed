import { useState } from 'react';
import Box from '@mui/material/Box';
import { Tab, Tabs } from '@mui/material';
import DashboardPanel from '../components/DashboardPanel';
const availableTabs = [
  'Basics',
  'Local news',
  'Foreign news',
  'Weather',
  // 'Todo',
  // 'Projects',
  // 'Countdown',
  'Technology',
  // 'Messages',
];

function Dashboard() {
  const [selectedTabID, setSelectedTabID] = useState(0);

  const handleChange = (e, value) => {
    setSelectedTabID(value);
  };

  return (
    <div className="App">
      <>
        <Tabs
          value={selectedTabID}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            zIndex: '5',
            borderBottom: '1px solid #e8e8e8',
            '& .MuiTabs-indicator': {
              backgroundColor: '#1890ff',
            },
            position: 'fixed',
            width: '100vw',
            backgroundColor: '#fff',
          }}
        >
          {availableTabs.map((tab) => (
            <Tab
              label={tab}
              key={availableTabs.indexOf(tab)}
              sx={{
                textTransform: 'none',
                color: 'rgba(0, 0, 0, 0.85)',
                fontFamily: [
                  '-apple-system',
                  'BlinkMacSystemFont',
                  '"Segoe UI"',
                  'Roboto',
                  '"Helvetica Neue"',
                  'Arial',
                  'sans-serif',
                  '"Apple Color Emoji"',
                  '"Segoe UI Emoji"',
                  '"Segoe UI Symbol"',
                ].join(','),
                '&:hover': {
                  color: '#40a9ff',
                  opacity: 1,
                },
                '&.Mui-selected': {
                  color: '#1890ff',
                },
                '&.Mui-focusVisible': {
                  backgroundColor: '#d1eaff',
                },
              }}
            />
          ))}
        </Tabs>
        {availableTabs.map((tab) => (
          <DashboardPanel
            selectedTabID={selectedTabID}
            selectedTabName={tab}
            index={availableTabs.indexOf(tab)}
            key={availableTabs.indexOf(tab)}
          ></DashboardPanel>
        ))}
        <Box sx={{ p: 3 }} />
      </>
    </div>
  );
}
export default Dashboard;
