import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../Button';
import './Search.css'

export const Search = ({value, onChange, onSubmit, children}) => 
  <form onSubmit={onSubmit}>
    <input
      type="text"
      value={value}
      onChange={onChange}
      onSubmit={onSubmit}
    />
    <Button type="submit">{children}</Button>
  </form>
  
  Search.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
  }