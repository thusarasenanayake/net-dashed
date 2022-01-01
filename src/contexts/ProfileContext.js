import { createContext, useContext, useEffect, useState } from 'react';
import Localbase from 'localbase';
import { AuthContext } from './AuthContext';
import { auth, db } from '../utils/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { addUserRecordIDB } from '../utils/dbFunctions';
import { Box } from '@mui/system';
import { CircularProgress } from '@mui/material';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [loaded, setLoaded] = useState(false);
  const [value, setValue] = useState({
    firstName: '',
    DOB: null,
  });
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const idb = new Localbase('net-dashed');
    if (currentUser) {
      idb
        .collection(auth.currentUser.uid)
        .get()
        .then((settings) => {
          if (settings.length >= 1) {
            setValue(settings[0]);
            setLoaded(true);
          } else {
            const docRef = doc(db, 'users', auth.currentUser.uid);
            getDoc(docRef).then((docSnap) => {
              if (docSnap.exists()) {
                setValue(docSnap.data());
                setLoaded(true);
                addUserRecordIDB(auth.currentUser.uid, docSnap.data());
              }
            });
          }
        });
    } else {
      idb.delete();
    }
  }, [currentUser]);

  return (
    <ProfileContext.Provider
      value={{
        value,
        setValue,
      }}
    >
      {currentUser && !loaded ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 250,
          }}
        >
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <>{children}</>
      )}
    </ProfileContext.Provider>
  );
};
