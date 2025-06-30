// src/components/bootstrap/mock.tsx
// Mock Bootstrap components nếu react-bootstrap chưa được cài đặt

import React, { HTMLAttributes, InputHTMLAttributes } from 'react';

// Mock Form components
export const Form = {
  Control: (props: InputHTMLAttributes<HTMLInputElement>) => {
    const { className, style, ...rest } = props;
    return (
      <input 
        className={`form-control ${className || ''}`}
        style={style}
        {...rest}
      />
    );
  }
};

// Mock InputGroup components
interface InputGroupProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface InputGroupTextProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  id?: string;
}

export const InputGroup = (props: InputGroupProps) => {
  const { children, className, ...rest } = props;
  return (
    <div className={`input-group ${className || ''}`} {...rest}>
      {children}
    </div>
  );
};

InputGroup.Text = (props: InputGroupTextProps) => {
  const { children, className, ...rest } = props;
  return (
    <div className={`input-group-text ${className || ''}`} {...rest}>
      {children}
    </div>
  );
};