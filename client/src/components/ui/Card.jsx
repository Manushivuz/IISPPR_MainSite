import React from 'react';

const Card = ({ 
  children, 
  className = '',
  hover = false,
  padding = true,
  shadow = true,
  rounded = true
}) => {
  const baseClasses = 'bg-white';
  
  const conditionalClasses = {
    padding: padding ? 'p-6' : '',
    shadow: shadow ? 'shadow-lg' : '',
    rounded: rounded ? 'rounded-lg' : '',
    hover: hover ? 'transition-transform duration-300 hover:-translate-y-1' : ''
  };

  const classes = `${baseClasses} ${conditionalClasses.padding} ${conditionalClasses.shadow} ${conditionalClasses.rounded} ${conditionalClasses.hover} ${className}`;

  return (
    <div className={classes}>
      {children}
    </div>
  );
};

export default Card;
