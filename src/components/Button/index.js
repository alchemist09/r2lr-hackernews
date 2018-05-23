import React from 'react';
import './Button.css';

export const Button = ({onClick, className = '', type='button', children}) =>
  <button
   onClick={onClick}
   className={className}
  >
    {children}
  </button>