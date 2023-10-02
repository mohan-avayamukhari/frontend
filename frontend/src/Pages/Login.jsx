import { Box, Button, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {FormControlLabel, Checkbox} from "@mui/material";





const Login = () => {
  const preferredMode = useMediaQuery('(prefers-color-scheme: dark)');

  const handleFormSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Box p="10% 38%" width="100%" height="100%" sx={{ backgroundColor: preferredMode ? 'primary' : 'white' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: preferredMode ? '#6ff9ff' : '#1976d2' }}>
          <LockOutlinedIcon style={{ color: preferredMode ? 'black' : 'white' }} />
        </Avatar>
        <Typography component="h1" variant="h5" fontSize="2rem" color={preferredMode ? 'white' : 'black'}>
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleFormSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
            margin="normal"
            required
            fullWidth
            type="text"
            id="user"
            label="User Name"
            name="user"
            autoComplete="user"
            sx={{
              '& .MuiInputLabel-root': {
                fontSize: '1.2rem', // Adjust label font size
                color: preferredMode ? '#CCCCCC' : '#999999',
                '&.Mui-focused': { color: preferredMode ? '#00ffff' : '#3b82f680' },
              },
              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: preferredMode ? '#00ffff' : '#3b82f6',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: preferredMode ? 'primary' : '#999999' },
                '&:hover fieldset': { borderColor: preferredMode ? '#CCCCCC' : 'black' },
                color: preferredMode ? 'white' : 'black',
                fontSize: '1.2rem', // Adjust input font size
              },
              '&:hover .MuiInputLabel-root:not(.Mui-focused)': {
                color: preferredMode ? 'white' : 'black',
              },
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            type="password"
            id="psw"
            label="Password"
            name="psw"
            autoComplete="off"
            sx={{
              '& .MuiInputLabel-root': {
                fontSize: '1.2rem', // Adjust label font size
                color: preferredMode ? '#CCCCCC' : '#999999',
                '&.Mui-focused': { color: preferredMode ? '#00ffff' : '#3b82f680' },
              },
              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: preferredMode ? '#00ffff' : '#3b82f6',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: preferredMode ? 'primary' : '#999999' },
                '&:hover fieldset': { borderColor: preferredMode ? '#CCCCCC' : 'black' },
                color: preferredMode ? 'white' : 'black',
                fontSize: '1.2rem', // Adjust input font size
              },
              '&:hover .MuiInputLabel-root:not(.Mui-focused)': {
                color: preferredMode ? 'white' : 'black',
              },
            }}
          />
          <FormControlLabel
            sx={{
              color: preferredMode ? 'white' : 'black',
              '& .MuiCheckbox-root': { color: preferredMode ? 'white' : 'black' },
              '& .MuiCheckbox-colorPrimary.Mui-checked': { color: preferredMode ? '#00ffff' : '#1976d2' },
            }}
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            mb: 2,
            bgcolor: preferredMode ? '#6ff9ff' : '#1976d2',
            color: preferredMode ? 'black' : 'white',
            fontSize: '1.2rem',
            textTransform: 'none', // Set text to normal case
            '&:hover': {
              bgcolor: preferredMode ? 'secondary.main' : '#0f4a8e',
            },
            }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;