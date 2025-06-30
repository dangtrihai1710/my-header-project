import React, { FC } from 'react'
import { Form, InputGroup } from 'react-bootstrap'
import IconSVG from '@components/common/IconSVG'
import './style.css'

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
