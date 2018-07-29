import React from 'react'
import propTypes from 'prop-types'

export const Search = ({handleKeyUp}) => {
  return (
    <input
      id="search"
      className="search"
      onKeyUp={handleKeyUp}
      placeholder="add country names with commas"
      type="text"
    />
  )
}

Search.propTypes = {
  handleKeyUp: propTypes.func.isRequired,
}
