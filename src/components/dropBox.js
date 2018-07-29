import React from 'react'
import propTypes from 'prop-types'

export const DropBox = ({names=[], handleChange}) => {
  function loadNames(names) {
    return names.map(name => <option className="select-items" key={name}>{name}</option>)
  }

  return (
    <div>
      {names.length === 0
        && (
          <div className="loading">
            {'Names are loading...'}
          </div>)}

      {names.length > 0
        && (
          <select className="select" onChange={handleChange}>
            {loadNames(names)}
          </select>)}
    </div>
  )
}

DropBox.propTypes = {
  handleChange: propTypes.func.isRequired,
  names: propTypes.array.isRequired,
}
