import React from 'react';
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