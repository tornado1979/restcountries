import React, { Component } from 'react'
import axios from 'axios'

import { DropBox } from './dropBox'
import { Search } from './search'
import { Details } from './details'

const END_POINTS = {
   ALL_COUNTRIES_API: 'https://restcountries.eu/rest/v2/all',
   SEARCH_BY_NAME_API: 'https://restcountries.eu/rest/v2/name/',
}

class Countries extends Component {
  state = {
    countries: [],
    names: [],
  }

  async getData(END_POINT) {
    const response = await axios.get(END_POINT,
    {
      header:
        {'Content-Type': 'application/json'}
      })
    return response
  }

  handleChange = (ev) => {
    const selectedCountry = ev.target.value

    const response = this.getData(`${END_POINTS.SEARCH_BY_NAME_API}${selectedCountry}`)

    response
    .then(countries => (
      this.setState((prevState, props) => ({
        countries: countries.data,
      }))
    ))

  }

  // get Names from countries and update state
  getNames(){
    const names = this.state.countries.map(country => country.name)
    this.setState((prevState, props) => ({
      names,
    }))
  }

  // return n countries
  getCountriesByNumber(n) {
    return this.state.countries.slice(0,10)
  }

  componentDidMount() {
    var initPromise = this.getData(END_POINTS.ALL_COUNTRIES_API)

    let names
    initPromise
    .then(countries => (
      names = countries.data.map(country => country.name),
      this.setState((prevState, props) => ({
        countries: countries.data,
        names,
      }))
    ))
  }

  render(){
    return (
      <div>
        - Select a country.
        <DropBox
          handleChange={this.handleChange}
          names={this.state.names} />
        - Or search country1,country2,country3.
        <Search />
        - Get countries here.
        <Details
          countries={this.getCountriesByNumber(10)}
        />
      </div>
    )
  }
}

export default Countries
