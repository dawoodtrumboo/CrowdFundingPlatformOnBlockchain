import React from 'react';

const CategoryButton = ({ category }) => {
  return <option value={category}>{category}</option>;
};

export default CategoryButton;