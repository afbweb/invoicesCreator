import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick?: () => void;
}

const Button = ({
  children,
  variant = 'primary',
  size = 'small',
  disabled = false,
  onClick,
  ...rest
}: ButtonProps) => {
  let buttonClass = `button ${variant} ${size} ${disabled ? 'disabled' : ''}`;

  return (
    <button className={buttonClass} onClick={onClick} disabled={disabled} {...rest}>
      {children}
    </button>
  );
};

export default Button;
