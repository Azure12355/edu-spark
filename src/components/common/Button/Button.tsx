// src/components/common/Button/Button.tsx
import React from 'react';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  href?: string; // If the button acts as a link
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', href, children, className, ...props }) => {
  const buttonClasses = `
    ${styles.btn}
    ${variant === 'primary' ? styles.primary : ''}
    ${variant === 'secondary' ? styles.secondary : ''}
    ${className || ''}
  `;

  if (href) {
    return (
      <a href={href} className={buttonClasses}>
        {children}
      </a>
    );
  }

  return (
    <button className={buttonClasses.trim()} {...props}>
      {children}
    </button>
  );
};

export default Button;