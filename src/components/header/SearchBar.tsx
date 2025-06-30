import React, { FC } from 'react'
// import { Form, InputGroup } from 'react-bootstrap' // Comment out if not installed
import IconSVG from '@components/common/IconSVG'
import './style.css'

// Mock Bootstrap components if react-bootstrap is not installed
const Form = {
  Control: FC<React.InputHTMLAttributes<HTMLInputElement>>(({ className, style, ...props }) => (
    <input 
      className={`form-control ${className || ''}`}
      style={style}
      {...props}
    />
  ))
};

const InputGroup: FC<{ children: React.ReactNode; className?: string; onClick?: () => void; style?: React.CSSProperties }> & {
  Text: FC<{ children: React.ReactNode; className?: string; id?: string }>
} = ({ children, className, ...props }) => (
  <div className={`input-group ${className || ''}`} {...props}>
    {children}
  </div>
);

InputGroup.Text = ({ children, className, ...props }) => (
  <div className={`input-group-text ${className || ''}`} {...props}>
    {children}
  </div>
);

interface SearchBarProps {
  placeholderSearchBar: string
  visibleFilterIcon: boolean
  onClick: (href: string) => void
}

const SearchBar: FC<SearchBarProps> = ({ placeholderSearchBar, onClick }) => {
  return (
    <InputGroup
      className='rounded-pill overflow-hidden bg-white d-flex flex-nowrap align-items-center sticky-top border-input-group-header flex-1'
      onClick={() => onClick('/search')}
      style={{
        height: 33,
        zIndex: 1,
      }}
    >
      <InputGroup.Text
        className='input-group-text-header'
        id='search-input-icon'
      >
        <IconSVG
          name='search'
          color='#344054'
          size={20}
          className='mb-1'
        />
      </InputGroup.Text>
      <Form.Control
        placeholder={placeholderSearchBar}
        style={{ height: 28 }}
        className='form-control-search-header shadow-none px-2'
      />
    </InputGroup>
  )
}

export default SearchBar