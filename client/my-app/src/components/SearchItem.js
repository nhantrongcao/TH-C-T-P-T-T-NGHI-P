import React, { memo } from 'react';
import icons from '../ultils/icons';
import './SearchItem.css';

const { AiOutlineDown } = icons;

const SearchItem = ({ name, activeClick, changeActiveFitler }) => {
  return (
    <div 
    onClick={() => changeActiveFitler}
    className="search-item-wrapper123">
      <span className="capitalize">{name}</span>
      <AiOutlineDown />
      {activeClick === name && (
        <div className="search-item-content">
          content
        </div>
      )}
    </div>
  );
};

export default memo(SearchItem);
