import React from 'react'
import { Button } from '../Button';

export const Sort = ({ sortKey, activeSortKey, onSort, children }) => {
  const sortClass = ['button-inlnie'];
  if (sortKey === activeSortKey) {
    sortClass.push('button-active');
  }

  return (
    <Button 
      onClick={() => onSort(sortKey)}
      className={sortClass.join(' ')}>
      {children}
    </Button>
  )
  
}
  
