import React, {Component} from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';

class AllFiltersPeople extends Component {
    constructor(props){
        super(props);

        this.state = {
            selectedConnections: [],
            selectedLocations: [],
            selectedCurrentCompanies: [],
            selectedPastCompanies: [],
            selectedIndustries: [],
            selectedSchools: [],
            selectedLanguages: [],
            selectedNonProfitInterests: []
        }
    }

    handleChangeConnections = (value) => {
        this.setState({ selectedConnections: value});
    }

    handleChangeLocations = (value) => {
        this.setState({ selectedLocations: value});
    }

    handleChangeCurrentCompanies = (value) => {
        this.setState({ selectedCurrentCompanies: value});
    }

    handleChangePastCompanies = (value) => {
        this.setState({ selectedPastCompanies: value});
    }

    handleChangeIndustries = (value) => {
        this.setState({ selectedIndustries: value});
    }

    handleChangeSchools = (value) => {
        this.setState({ selectedSchools: value});
    }

    handleChangeLanguages = (value) => {
        this.setState({ selectedLanguages: value});
    }

    handleChangeNonProfitInterests = (value) => {
        this.setState({ selectedNonProfitInterests: value});
    }

    render(){
        const selectStyles = {
            container: (base) => ({
                ...base,
                width: 300,
                fontWeight: 400
            }),
            valueContainer: (base) => ({
                ...base,
                width: 225
            }),
            control: (base) => ({
                ...base,
                cursor: 'pointer'
            }),
            option: (base) => ({
                ...base,
                cursor: 'pointer'
            })

        };
        const connections = [
            {value: 'F', label: '1st'},
            {value: 'S', label: '2nd'},
            {value: 'O', label: '3rd+'}
        ];
        const locations = [
            {value: 'by', label: 'Belarus'},
            {value: 'ru', label: 'Russian Federation'},
            {value: 'ua', label: 'Ukraine'},
            {value: 'pl', label: 'Poland'},
            {value: 'lt', label: 'Lithuania'}
        ];
        const currentCompanies = [
            {value: '4972', label: 'EPAM Systems'},
            {value: '238318', label: 'IBA Group'},
            {value: '127309', label: 'Wargaming'},
            {value: '10921', label: 'Itransition Group'},
            {value: '1461240', label: 'ISsoft'}
        ];
        const pastCompanies = [
            {value: '4972', label: 'EPAM Systems'},
            {value: '238318', label: 'IBA Group'},
            {value: '127309', label: 'Wargaming'},
            {value: '10921', label: 'Itransition Group'},
            {value: '1461240', label: 'ISsoft'}
        ];
        const industries = [
            {value: '96', label: 'Information Technology and Services'},
            {value: '6', label: 'Internet'},
            {value: '4', label: 'Computer Software'},
            {value: '137', label: 'Human Resources'},
            {value: '104', label: 'Staffing and Recruiting'}
        ];
        const schools = [
            {value: '10749', label: 'Belarusian State University'},
            {value: '43296', label: 'Belarusian State University of Informatics and Radioelectronics'},
            {value: '156063', label: 'Belarusian National Technical University'},
            {value: '3164034', label: 'Belarusian State Technological University'},
            {value: '155041', label: 'IT Academy'}
        ];
        const languages = [
            {value: 'en', label: 'English'},
            {value: 'ru', label: 'Russian'},
            {value: 'fr', label: 'French'},
            {value: 'de', label: 'German'},
            {value: 'es', label: 'Spanish'}
        ];
        const nonProfitInterests = [
            {value: 'volunteer', label: 'Skilled Volunteering'},
            {value: 'nonprofitboard', label: 'Board Service'}
        ];

        return(
            <div className="all-filters">
                <div className="all-filters_people">
                    <div className="all-filters_item">
                        <label>
                            <div className="all-filters_item_title">First name</div>
                            <input type="text" ref="firstName" />
                        </label>
                        <label>
                            <div className="all-filters_item_title">Last name</div>
                            <input type="text" ref="lastName" />
                        </label>
                        <label>
                            <div className="all-filters_item_title">Title</div>
                            <input type="text" ref="title" />
                        </label>
                    </div>
                    <div className="all-filters_item">
                        <label>
                            <div className="all-filters_item_title">Company</div>
                            <input type="text" ref="company" />
                        </label>
                        <label>
                            <div className="all-filters_item_title">School</div>
                            <input type="text" ref="school" />
                        </label>
                    </div>
                    <div className="all-filters_item">
                        <label>
                            <div className="all-filters_item_title">Connections</div>
                            <Select
                                isMulti
                                components={makeAnimated()}
                                closeMenuOnSelect={false}
                                hideSelectedOptions={false}
                                isSearchable={false}
                                value={this.state.selectedConnections}
                                onChange={(...args) => this.handleChangeConnections(...args)}
                                options={connections}
                                styles={selectStyles}
                            />
                        </label>
                        <label>
                            <div className="all-filters_item_title">Locations</div>
                            <Select
                                isMulti
                                components={makeAnimated()}
                                closeMenuOnSelect={false}
                                hideSelectedOptions={false}
                                value={this.state.selectedLocations}
                                onChange={(...args) => this.handleChangeLocations(...args)}
                                options={locations}
                                styles={selectStyles}
                            />
                        </label>
                        <label>
                            <div className="all-filters_item_title">Current companies</div>
                            <Select
                                isMulti
                                components={makeAnimated()}
                                closeMenuOnSelect={false}
                                hideSelectedOptions={false}
                                value={this.state.selectedCurrentCompanies}
                                onChange={(...args) => this.handleChangeCurrentCompanies(...args)}
                                options={currentCompanies}
                                styles={selectStyles}
                            />
                        </label>
                    </div>
                    <div className="all-filters_item">
                        <label>
                            <div className="all-filters_item_title">Past companies</div>
                            <Select
                                isMulti
                                components={makeAnimated()}
                                closeMenuOnSelect={false}
                                hideSelectedOptions={false}
                                value={this.state.selectedPastCompanies}
                                onChange={(...args) => this.handleChangePastCompanies(...args)}
                                options={pastCompanies}
                                styles={selectStyles}
                            />
                        </label>
                        <label>
                            <div className="all-filters_item_title">Industries</div>
                            <Select
                                isMulti
                                components={makeAnimated()}
                                closeMenuOnSelect={false}
                                hideSelectedOptions={false}
                                value={this.state.selectedIndustries}
                                onChange={(...args) => this.handleChangeIndustries(...args)}
                                options={industries}
                                styles={selectStyles}
                            />
                        </label>
                        <label>
                            <div className="all-filters_item_title">Schools</div>
                            <Select
                                isMulti
                                components={makeAnimated()}
                                closeMenuOnSelect={false}
                                hideSelectedOptions={false}
                                value={this.state.selectedSchools}
                                onChange={(...args) => this.handleChangeSchools(...args)}
                                options={schools}
                                styles={selectStyles}
                            />
                        </label>
                    </div>
                    <div className="all-filters_item">
                        <div className="all-filters_item_title">Profile language</div>
                        <Select
                            isMulti
                            components={makeAnimated()}
                            closeMenuOnSelect={false}
                            hideSelectedOptions={false}
                            value={this.state.selectedLanguages}
                            onChange={(...args) => this.handleChangeLanguages(...args)}
                            options={languages}
                            styles={selectStyles}
                        />
                    </div>
                    <div className="all-filters_item">
                        <div className="all-filters_item_title">Nonprofit interests</div>
                        <Select
                            isMulti
                            components={makeAnimated()}
                            closeMenuOnSelect={false}
                            hideSelectedOptions={false}
                            value={this.state.selectedNonProfitInterests}
                            onChange={(...args) => this.handleChangeNonProfitInterests(...args)}
                            options={nonProfitInterests}
                            styles={selectStyles}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default AllFiltersPeople;