import React, { Component } from 'react'
import axios from 'axios'

import { DropBox } from './dropBox'
import { Search } from './search'
import { Details } from './details'
import { CustomButton } from './customButton'

const END_POINTS = {
   ALL_COUNTRIES_API: 'https://restcountries.eu/rest/v2/all',
   SEARCH_BY_NAME_API: 'https://restcountries.eu/rest/v2/name/',
}

class Countries extends Component {
  state = {
    countries: [],
    searchString: '',
    names: [],
  }

  async getData(END_POINT) {
    this.setState((prevState, props) => ({
      countries: [],
    }))
    try{
      const response = await axios.get(END_POINT,
        {
          header:
            {'Content-Type': 'application/json'}
          })
        return response
    } catch(err) {
      // i catch the return server error
      console.log('Serer error:', err)
      return []
    }
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

  // event for search input change
  handleKeyUp = (ev) => {
    const searchString = ev.target.value
    // update state
  }

  SearchCountriesArray = () => {

    const countriesArray = this.state.searchString.split(',')
    let promises = []
    const that = this
    for(let i=0; i<countriesArray.length; i++){
      promises[i] = this.getData(`${END_POINTS.SEARCH_BY_NAME_API}${countriesArray[i]}`)
    }

    Promise.all([...promises])
    .then(function(res) {
      console.log('search results: ', res);
      const countries = res.map(countriesData => countriesData.data)
      that.setState({
        countries,
      })
    })
    .catch(err => console.log('error: ', err));
  }


  // handle button click
  handleClick = (ev) => {
    // get values from <input>
    const searchInput = document.getElementById('search').value

    this.setState((prevState, props) => ({
      searchString: searchInput,
    }))

    // loop through the search String array and request server for countries
    setTimeout(() =>
      {
        this.SearchCountriesArray.apply(this)
    },0)
    // this.getData()
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
        <div className="search-block">
          <div>
            - Or search country1,country2,country3.
          </div>
          <Search
            handleKeyUp={this.handleKeyUp} />
          <CustomButton
            handleClick={this.handleClick} />
        </div>
        - Get countries here.
          <Details
            countries={this.getCountriesByNumber(10)}
          />
      </div>
    )
  }
}

export default Countries
