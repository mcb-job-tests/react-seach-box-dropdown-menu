import React, { Component } from 'react';
import './App.css';

import countries from './data/countries.json';

const sortedCountries = countries.sort();

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            matchedCountries : [],
            isCountrySelected : false,
            countrySelected: ''
        };
    }

    handleOnChange(event){
        if (!sortedCountries.includes(event.target.value)){
            this.setState({
                isCountrySelected: false
            })
        }
        this.setState({
            countrySelected: event.target.value,
            matchedCountries: sortedCountries.filter((country)=>country.toLowerCase().startsWith(event.target.value.toLowerCase()))
        });
    }

    handleSelectCountry(country){
        console.log("handleSelectCountry", country);
        this.setState({
            isCountrySelected: true,
            countrySelected: country
        })
    }

    dropDownCountriesList(){
        return(
            <div className="country-list">
                {this.state.matchedCountries.map((country, index) => {
                    return(
                        <input key={index}
                               type="text"
                               className="dropdown-item"
                               value={country}
                               readOnly="readOnly"
                               onClick={this.handleSelectCountry.bind(this, country)}
                        />
                    )
                })}
            </div>
        )
    }
    render() {
        const searchBoxStyle = this.state.isCountrySelected ? {
            border: "2px solid limegreen"
        } : {};
        return (
            <div className="App">

                <header className="App-header">
                    <input
                        style={searchBoxStyle}
                        className="search-box"
                        type="search"
                        name="CountrySearch"
                        placeholder="Search..."
                        value={this.state.countrySelected}
                        onChange={this.handleOnChange.bind(this)}
                        autoFocus
                    />

                    <div className="country-list-container">
                        { !this.state.isCountrySelected && this.state.countrySelected.length > 0 && this.state.matchedCountries && this.dropDownCountriesList() }
                    </div>
                </header>

            </div>
        );
    }
}

export default App;
