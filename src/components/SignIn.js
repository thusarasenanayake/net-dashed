import Avatar from '@mui/material/Avatar';
import LockResetIcon from '@mui/icons-material/LockReset';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';

import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Copyright from './Copyright';
import { useHistory } from 'react-router';
import { auth } from '../utils/firebase';
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { useState } from 'react';
import { LoadingButton } from '@mui/lab';

function SignIn(props) {
  const [error, setError] = useState(false);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [reset, setReset] = useState(false);
  const [resetError, setResetError] = useState(false);
  const [feedback, setFeedback] = useState(false);

  const resetPassword = () => {
    const actionCodeSettings = {
      url: process.env.REACT_APP_DOMAIN,
    };

    setLoading(true);
    sendPasswordResetEmail(auth, resetEmail, actionCodeSettings)
      .then(() => {
        setFeedback(true);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setResetError(true);
        setFeedback(false);
      });
  };

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const credentials = new FormData(event.currentTarget);
    const email = credentials.get('email');
    const password = credentials.get('password');

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        history.push('/dashboard');
      })

      .catch((error) => {
        setError(true);
        setLoading(false);
      });
  };
  return (
    <>
      {!reset ? (
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" Validate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              error={error}
              type="email"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              error={error}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <LoadingButton
              loading={loading}
              disabled={loading}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </LoadingButton>
            <Grid container>
              <Grid item xs>
                <Typography
                  sx={{
                    color: 'primary.main',

                    mb: 1,
                    '&:hover': {
                      textDecoration: 'underline',
                      cursor: 'pointer',
                    },
                  }}
                  variant="body2"
                  onClick={() => setReset(true)}
                >
                  Forgot password?
                </Typography>

                <Typography
                  sx={{
                    color: 'primary.main',
                    '&:hover': {
                      textDecoration: 'underline',
                      cursor: 'pointer',
                    },
                  }}
                  variant="body2"
                  onClick={() => props.setRSidePanel('signUp')}
                >
                  Don't have an account? Sign Up
                </Typography>
                <Box sx={{ mt: 4 }}>
                  <Copyright />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockResetIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset Password
          </Typography>
          <Box sx={{ mt: 1 }}>
            <TextField
              label="Email Address"
              error={resetError}
              margin="normal"
              fullWidth
              autoComplete="email"
              autoFocus
              name="email"
              value={resetEmail}
              onChange={(e) => {
                setResetEmail(e.target.value);
                setResetError(false);
              }}
            />

            <LoadingButton
              loading={loading}
              disabled={loading}
              onClick={resetPassword}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Reset
            </LoadingButton>
            <Grid container>
              <Grid item xs>
                {feedback ? (
                  <Alert severity="success" sx={{ mb: 2 }}>
                    A password reset message was sent to your email address.
                    Please click the link in that message to reset your
                    password.
                  </Alert>
                ) : (
                  false
                )}

                <Typography
                  sx={{
                    color: 'primary.main',

                    mb: 1,
                    '&:hover': {
                      cursor: 'pointer',
                      textDecoration: 'underline',
                    },
                  }}
                  variant="body2"
                  onClick={() => setReset(false)}
                >
                  Already have an account? Sign in
                </Typography>
                <Typography
                  sx={{
                    color: 'primary.main',
                    '&:hover': {
                      textDecoration: 'underline',
                      cursor: 'pointer',
                    },
                  }}
                  variant="body2"
                  onClick={() => props.setRSidePanel('signUp')}
                >
                  Don't have an account? Sign Up
                </Typography>
                <Box sx={{ mt: 4 }}>
                  <Copyright />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}
    </>
  );
}

export default SignIn;
