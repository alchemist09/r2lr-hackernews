import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

export const Button = ({onClick, className, children}) =>
  <button
   onClick={onClick}
   className={className}
   type="button"
  >
    {children}
  </button>

Button.defaultProps = {
  className: '',
  // type: 'button'
}

Button.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node.isRequired
}