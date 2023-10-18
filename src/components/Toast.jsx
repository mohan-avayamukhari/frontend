import { Snackbar, Alert } from '@mui/material';

const Toast = ({ message, severity, isToastVisible, setIsToastVisible }) => {

  return (
    <Snackbar
      open={isToastVisible}
      autoHideDuration={10000}
      onClose={() => setIsToastVisible(false)}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert onClose={() => setIsToastVisible(false)} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
