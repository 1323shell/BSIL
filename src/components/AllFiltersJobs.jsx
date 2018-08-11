import React, {Component} from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';

class AllFiltersJobs extends Component {
    constructor(props){
        super(props);

        this.state = {
            selectedLinkedInFeatures: [],
            selectedJobTypes: [],
            selectedCompany: [],
            selectedIndustries: [],
            selectedJobFunction: [],
            selectedExperienceLevel: []
        }
    }

    handleChangeLinkedInFeatures = (value) => {
        this.setState({ selectedLinkedInFeatures: value});
    }

    handleChangeCompany = (value) => {
        this.setState({ selectedCompany: value});
    }

    handleChangeJobTypes = (value) => {
        this.setState({ selectedJobTypes: value});
    }

    handleChangeIndustries = (value) => {
        this.setState({ selectedIndustries: value});
    }

    handleChangeJobFunction = (value) => {
        this.setState({ selectedJobFunction: value});
    }

    handleChangeExperienceLevel = (value) => {
        this.setState({ selectedExperienceLevel: value});
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
        const linkedinFeatures = [
            {value: 'JIYN', label: 'In Your Network'},
            {value: 'EA', label: 'Under 10 Applicants'},
            {value: 'AL', label: 'Easy Apply'}
        ];
        const company = [
            {value: '4972', label: 'EPAM Systems'},
            {value: '238318', label: 'IBA Group'},
            {value: '127309', label: 'Wargaming'},
            {value: '10921', label: 'Itransition Group'},
            {value: '1461240', label: 'ISsoft'}
        ];
        const jobTypes = [
            {value: 'F', label: 'Full-time'},
            {value: 'C', label: 'Contract'},
            {value: 'I', label: 'Internship'},
            {value: 'P', label: 'Part-time'},
            {value: 'T', label: 'Temporary'}
        ];
        const industries = [
            {value: '96', label: 'Information Technology and Services'},
            {value: '6', label: 'Internet'},
            {value: '4', label: 'Computer Software'},
            {value: '137', label: 'Human Resources'},
            {value: '104', label: 'Staffing and Recruiting'}
        ];
        const jobFunction = [
            {value: 'it', label: 'Information Technology'},
            {value: 'eng', label: 'Engineering'},
            {value: 'mrkt', label: 'Marketing'},
            {value: '137', label: 'Sales'},
            {value: 'sale', label: 'Other'}
        ];
        const experienceLevel = [
            {value: '1', label: 'Internship'},
            {value: '2', label: 'Entry level'},
            {value: '3', label: 'Associate'},
            {value: '4', label: 'Mid-Senior level'},
            {value: '5', label: 'Director'},
            {value: '6', label: 'Executive'}
        ];

        return(
            <div className="all-filters">
                <div className="all-filters_jobs">
                    <div className="all-filters_item all-filters_item_date-posted">
                        <div className="filters_item_title">Date Posted:</div>
                        <label><input type="radio" ref="dp1" name="all-filters_item_date-posted" value="1" />Past 24 hours</label>
                        <label><input type="radio" ref="dp2" name="all-filters_item_date-posted" value="1%2C2" />Past Week</label>
                        <label><input type="radio" ref="dp3" name="all-filters_item_date-posted" value="1%2C2%2C3%2C4" />Past Month</label>
                        <label><input type="radio" ref="dp4" name="all-filters_item_date-posted" value="Any Time" defaultChecked={true} />Any Time</label>
                    </div>
                    <div className="all-filters_item">
                        <label>
                            <div className="filters_item_title">LinkedIn Features</div>
                            <Select
                                isMulti
                                components={makeAnimated()}
                                closeMenuOnSelect={false}
                                hideSelectedOptions={false}
                                isSearchable={false}
                                value={this.state.selectedLinkedInFeatures}
                                onChange={(...args) => this.handleChangeLinkedInFeatures(...args)}
                                options={linkedinFeatures}
                                styles={selectStyles}
                            />
                        </label>
                        <label>
                            <div className="filters_item_title">Job Type</div>
                            <Select
                                isMulti
                                components={makeAnimated()}
                                closeMenuOnSelect={false}
                                hideSelectedOptions={false}
                                isSearchable={false}
                                value={this.state.selectedJobTypes}
                                onChange={(...args) => this.handleChangeJobTypes(...args)}
                                options={jobTypes}
                                styles={selectStyles}
                            />
                        </label>
                        <label>
                            <div className="filters_item_title">Company</div>
                            <Select
                                isMulti
                                components={makeAnimated()}
                                closeMenuOnSelect={false}
                                hideSelectedOptions={false}
                                value={this.state.selectedCompany}
                                onChange={(...args) => this.handleChangeCompany(...args)}
                                options={company}
                                styles={selectStyles}
                            />
                        </label>
                    </div>
                    <div className="all-filters_item">
                        <label>
                            <div className="filters_item_title">Industry</div>
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
                            <div className="filters_item_title">Job Function</div>
                            <Select
                                isMulti
                                components={makeAnimated()}
                                closeMenuOnSelect={false}
                                hideSelectedOptions={false}
                                value={this.state.selectedJobFunction}
                                onChange={(...args) => this.handleChangeJobFunction(...args)}
                                options={jobFunction}
                                styles={selectStyles}
                            />
                        </label>
                        <label>
                            <div className="filters_item_title">Experience Level</div>
                            <Select
                                isMulti
                                components={makeAnimated()}
                                closeMenuOnSelect={false}
                                hideSelectedOptions={false}
                                isSearchable={false}
                                value={this.state.selectedExperienceLevel}
                                onChange={(...args) => this.handleChangeExperienceLevel(...args)}
                                options={experienceLevel}
                                styles={selectStyles}
                            />
                        </label>
                    </div>
                </div>
            </div>
        )
    }
}

export default AllFiltersJobs;