import Link from '@mui/material/Link';

import Typography from '@mui/material/Typography';
function Copyright() {
  return (
    <Typography pb={2} variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link
        color="inherit"
        href="https://thusarasenanayake.github.io/net-dashed"
      >
        NET-DASHED{' '}
      </Link>
      {new Date().getFullYear()}
    </Typography>
  );
}

export default Copyright;
