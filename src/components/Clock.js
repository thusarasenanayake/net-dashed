import { Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import React, { useContext, useEffect, useState } from 'react';
import { ProfileContext } from '../contexts/ProfileContext';
import { getAge } from '../utils/calc';
import { formatTime, getGreeting } from '../utils/text';
import NotificationBar from './NotificationBar';

function Clock() {
  const { value } = useContext(ProfileContext);
  const [age, setAge] = useState(
    value['DOB'] ? getAge(value['DOB'].seconds * 1000) : false
  );
  const [greeting, setGreeting] = useState(getGreeting(value['firstName']));
  const [time, setTime] = useState(formatTime());
  const [date, setDate] = useState(new Date().toDateString());

  useEffect(() => {
    const interval = setInterval(
      () => setTime(formatTime()),
      setDate(new Date().toDateString()),
      setAge(value['DOB'] ? getAge(value['DOB'].seconds * 1000) : false),
      setGreeting(getGreeting(value['firstName'])),
      60000
    );

    return () => {
      clearInterval(interval);
    };
  }, [value]);

  return (
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
      <Typography variant="h6">{greeting}</Typography>
      <Typography variant="h1" sx={{ fontSize: '85px', p: '10px 0' }}>
        {time}
      </Typography>
      <Typography variant="h4">{date}</Typography>
      <Typography variant="body2">
        {value['DOB']
          ? `${age.years} years, ${age.months} months, ${age.days} days`
          : false}
      </Typography>
      <NotificationBar />
    </Paper>
  );
}

export default Clock;
