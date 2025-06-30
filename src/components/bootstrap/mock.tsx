// src/components/bootstrap/mock.tsx
// Mock Bootstrap components nếu react-bootstrap chưa được cài đặt

import React, { FC, HTMLAttributes, InputHTMLAttributes } from 'react';

// Mock Form components
export const Form = {
  Control: FC<InputHTMLAttributes<HTMLInputElement>>(({ className, style, ...props }) => (
    <input 
      className={`form-control ${className || ''}`}
      style={style}
      {...props}
    />
  ))
};

// Mock InputGroup components
interface InputGroupProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface InputGroupTextProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  id?: string;
}

export const InputGroup: FC<InputGroupProps> = ({ children, className, ...props }) => (
  <div className={`input-group ${className || ''}`} {...props}>
    {children}
  </div>
);

InputGroup.Text = FC<InputGroupTextProps>(({ children, className, ...props }) => (
  <div className={`input-group-text ${className || ''}`} {...props}>
    {children}
  </div>
));

// Cách sử dụng trong SearchBar.tsx:
// import { Form, InputGroup } from './bootstrap/mock';