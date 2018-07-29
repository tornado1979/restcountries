import React from 'react'
import ReactJson from 'react-json-view'

export const CustomButton = ({handleClick}) => {
  return (
    <button onClick={handleClick}>Search</button>
  )
}
