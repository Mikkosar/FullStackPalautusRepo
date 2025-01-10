import { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';

const Toggable = (props) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <>
      <div style={hideWhenVisible}>
        <Button variant="contained" color="primary" onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button
          variant="contained"
          color="secondary"
          onClick={toggleVisibility}
        >
          Cancel
        </Button>
      </div>
    </>
  );
};

Toggable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Toggable;
