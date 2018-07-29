import React, { Component } from 'react'
import axios from 'axios'

import { DropBox } from './dropBox'
import { Search } from './search'
import { Details } from './details'

const ALL_COUNTRIES_API = 'https://restcountries.eu/rest/v2/all'
const SEARCH_BY_NAME_API = 'https://restcountries.eu/rest/v2/name/'

class Countries extends Component {
  state = {
    countries: [],
  }

  async getData(country) {
    const response = await axios.get(`${SEARCH_BY_NAME_API}${country}`,
    {
      header:
        {'Content-Type': 'application/json'}
      })
    return response
  }

  handleChange = (ev) => {
    console.log(ev.target.value)
    const selectedCountry = ev.target.value
    const response = this.getData(selectedCountry)

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
    console.log('state is', this.state)
    return this.state.countries.slice(0,10)
  }

  async initCountriesState() {

    const response = await axios.get('https://restcountries.eu/rest/v2/all',
    {
      header:
        {'Content-Type': 'application/json'}
      })

    return response.data
  }

  componentDidMount() {
    var initPromise = this.initCountriesState()

    let names
    initPromise
    .then(countries => (
      names = countries.map(country => country.name),
      this.setState((prevState, props) => ({
        countries,
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
