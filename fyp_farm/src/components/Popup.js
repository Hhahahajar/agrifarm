/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { useDispatch } from 'react-redux';
import MuiAlert from '@mui/material/Alert';
import { Snackbar } from '@mui/material';
import { underControl } from '../pages/redux/userRelated/userSlice';

const Popup = ({ message, setShowPopup, showPopup }) => {
  const dispatch = useDispatch();

  const vertical = 'top';
  const horizontal = 'right';

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowPopup(false);
    dispatch(underControl());
  };

  return (
    <Snackbar open={showPopup} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal}>
      {
                    (message === 'Done Successfully')
                      ? (
                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                          {message}
                        </Alert>
                      )
                      : (
                        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                          {message}
                        </Alert>
                      )
                }
    </Snackbar>
  );
};

export default Popup;

const Alert = React.forwardRef((props, ref) => <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />);
