import React from 'react'
import IconSVG from '@components/common/IconSVG'
import './style.css'

// Mock Bootstrap components if react-bootstrap is not installed
const Form = {
  Control: (props: React.InputHTMLAttributes<HTMLInputElement>) => {
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

interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface InputGroupTextProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  id?: string;
}

const InputGroup = (props: InputGroupProps) => {
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

interface SearchBarProps {
  placeholderSearchBar: string
  visibleFilterIcon: boolean
  onClick: (href: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholderSearchBar, onClick }) => {
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