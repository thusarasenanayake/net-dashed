import { LinearProgress } from '@mui/material';
import { Box } from '@mui/system';
import { createContext, useEffect, useState } from 'react';
import { auth } from '../utils/firebase';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setPending(false);
    });
  }, []);

  if (pending) {
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress color="secondary" />
      </Box>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
