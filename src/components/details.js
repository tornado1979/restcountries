import React from 'react'
import propTypes from 'prop-types'
import ReactJson from 'react-json-view'

export const Details = ({countries}) => {
  var totalCountries = countries.reduce((sum, obj) => {
    if(Array.isArray(obj)){
      return sum += obj.length
    } else if (typeof obj === 'object' ) {
      return sum += 1
    } else {
      return sum
    }
  },0)

  return (
    <div>
      {countries.length === 0
        && (
          <div className="loading">
            {'Countries are loading...'}
          </div>)}
      {countries.length >= 1
        && (
      <div>
        <div>Countries found: {totalCountries}</div>
        <div style={{border: '1px solid blue' }}>
            <ReactJson
              src={countries}
            />
        </div>
      </div>)}
    </div>
  )
}

Details.propTypes = {
  countries: propTypes.array.isRequired, // eslint-disable-line
}
