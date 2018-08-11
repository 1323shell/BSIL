import React, {Component} from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';
import AllFiltersPeople from './AllFiltersPeople';
import AllFiltersJobs from './AllFiltersJobs';
import { firebaseApp, firebaseData, filterDataForUpdate } from '../firebase';
import FaQuote from 'react-icons/lib/md/filter-center-focus';
import FaParentheses from 'react-icons/lib/fa/stack-exchange';
import FaAnd from 'react-icons/lib/fa/plus';
import FaNot from 'react-icons/lib/fa/close';
import FaOR from 'react-icons/lib/fa/arrows-h';

class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            value: '',
            filterName: false,
            isNewFilter: false,
            nameColor: '#e6e6e6',
            savedSearchFilters: [],
            userSavedFiltersChecked: null,
            selectedLocations: [],
            selectedConnections: [],
            selectedCurrentCompanies: [],
            selectedLinkedInFeatures: [],
            selectedCompany: [],
            selectedExperienceLevel: [],
            showPeopleFilters: true,
            showJobsFilters: false,
            showAllFilters: false,
            enterPressed: false,
            url: 'https://www.linkedin.com/',
            userPeopleAllFilters: false,
            userJobsFilter: false,
            userJobsAllFilters: false,
            selectedFilter: null,
            userID: '',
            savedSearchRef: ''
        }
    }

    handleChangeUserSavedFilters = (userSavedFiltersChecked) => {
        this.setState({userSavedFiltersChecked});
        const selectedFilter = this.state.savedSearchFilters[userSavedFiltersChecked.value];

        this.refs.serachField.value = '';
        this.refs.searchPeople.checked = this.refs.searchJobs.checked = this.refs.searchContent.checked =
            this.refs.searchCompanies.checked = this.refs.searchGroups.checked = this.refs.searchSchools.checked = false;
        this.setState({showPeopleFilters: false, showJobsFilters: false, showAllFilters: false});

        if (selectedFilter.searchPeople) {
            if (selectedFilter.value) {
                this.refs.serachField.value = selectedFilter.value;
                this.setState({value: selectedFilter.value});
            }
            this.refs.searchPeople.checked = true;

            if (selectedFilter.showAllFilters) {
                this.setState({showAllFilters: true});
                this.setState({userPeopleAllFilters: true, selectedFilter: selectedFilter});

            } else {
                this.setState({showPeopleFilters: true});
                this.setState({selectedLocations: [], selectedConnections: [], selectedCurrentCompanies: []});

                if (selectedFilter.selectedLocations) {
                    this.setState({selectedLocations: selectedFilter.selectedLocations});
                }
                if (selectedFilter.selectedConnections) {
                    this.setState({selectedConnections: selectedFilter.selectedConnections});
                }
                if (selectedFilter.selectedCurrentCompanies) {
                    this.setState({selectedCurrentCompanies: selectedFilter.selectedCurrentCompanies});
                }
            }

        } else if (selectedFilter.searchJobs) {
            if (selectedFilter.value) {
                this.refs.serachField.value = selectedFilter.value;
                this.setState({value: selectedFilter.value});
            }
            this.refs.searchJobs.checked = true;

            if (selectedFilter.showAllFilters) {
                this.setState({showAllFilters: true});
                this.setState({userJobsAllFilters: true, selectedFilter: selectedFilter});

            } else {
                this.setState({showJobsFilters: true});
                this.setState({selectedLinkedInFeatures: [], selectedCompany: [], selectedExperienceLevel: []});

                if (selectedFilter.selectedLinkedInFeatures) {
                    this.setState({selectedLinkedInFeatures: selectedFilter.selectedLinkedInFeatures});
                }
                if (selectedFilter.selectedCompany) {
                    this.setState({selectedCompany: selectedFilter.selectedCompany});
                }
                if (selectedFilter.selectedExperienceLevel) {
                    this.setState({selectedExperienceLevel: selectedFilter.selectedExperienceLevel});
                }

                this.setState({userJobsFilter: true, selectedFilter: selectedFilter});
            }

        } else if (selectedFilter.searchContent || selectedFilter.searchCompanies || selectedFilter.searchGroups || selectedFilter.searchSchools) {
            this.refs.serachField.value = selectedFilter.value;
            this.setState({value: selectedFilter.value});

            this.refs.searchContent.checked = selectedFilter.searchContent;
            this.refs.searchCompanies.checked = selectedFilter.searchCompanies;
            this.refs.searchGroups.checked = selectedFilter.searchGroups;
            this.refs.searchSchools.checked = selectedFilter.searchSchools;

        } else {
            this.refs.serachField.value = selectedFilter.value;
            this.setState({value: selectedFilter.value});
        }

        console.log(selectedFilter);
    };

    handleChangeLocations = (value) => {
        this.setState({ selectedLocations: value});
    };

    handleChangeConnections = (value) => {
        this.setState({ selectedConnections: value});
    };

    handleChangeCurrentCompanies = (value) => {
        this.setState({ selectedCurrentCompanies: value});
    };

    handleChangeLinkedInFeatures = (value) => {
        this.setState({ selectedLinkedInFeatures: value});
    };

    handleChangeExperienceLevel = (value) => {
        this.setState({ selectedExperienceLevel: value});
    };

    handleChangeCompany = (value) => {
        this.setState({ selectedCompany: value});
    };

    showAllFilters() {
        this.setState({showAllFilters: true, showPeopleFilters: false, showJobsFilters: false});
    }

    clearFilters() {
        if (this.refs.searchPeople.checked) {
            this.refs.peopleFiltersData.refs.firstName.value = this.refs.peopleFiltersData.refs.lastName.value =
                this.refs.peopleFiltersData.refs.title.value = this.refs.peopleFiltersData.refs.company.value =
                    this.refs.peopleFiltersData.refs.school.value = '';

            this.refs.peopleFiltersData.setState({selectedConnections: [], selectedLocations: [],
                selectedCurrentCompanies: [], selectedPastCompanies: [], selectedIndustries: [], selectedSchools: [],
                selectedLanguages: [], selectedNonProfitInterests: []});

        } else if (this.refs.searchJobs.checked) {
            this.refs.jobsFiltersData.refs.dp4.checked = true;

            this.refs.jobsFiltersData.setState({selectedLinkedInFeatures: [], selectedJobTypes: [],
                selectedCompany: [], selectedIndustries: [], selectedJobFunction: [], selectedExperienceLevel: []});
        }
    }

    hideAllFilters() {
        this.setState({showAllFilters: false});

        if (this.refs.searchPeople.checked) {
            this.setState({showPeopleFilters: true});
        } else if (this.refs.searchJobs.checked) {
            this.setState({showJobsFilters: true});
        }
    }

    serachFieldChanged(e) {
        this.setState({value: e.target.value});
    }

    serachFieldKeyUp(e) {
        if (e.keyCode === 13) {
            this.setState({enterPressed: true});
            this.search(e);
        }
    }

    searchPeopleFilters(currentCompanies, locations, connections, newUrl) {
        if (currentCompanies.length !== 0) {
            newUrl += 'facetCurrentCompany=%5B"';

            for (let i=0; i < currentCompanies.length; i++) {
                if (i === currentCompanies.length - 1) {
                    newUrl += currentCompanies[i].value + '"%5D&';
                    break;
                } else {
                    newUrl += currentCompanies[i].value + '"%2C"';
                }
            }
        }
        if (locations.length !== 0) {
            newUrl += 'facetGeoRegion=%5B"';

            for (let i=0; i < locations.length; i++) {
                if (i === locations.length - 1) {
                    newUrl += locations[i].value + '%3A0"%5D&';
                    break;
                } else {
                    newUrl += locations[i].value + '%3A0"%2C"';
                }
            }
        }
        if (this.state.showAllFilters) {
            let industries = this.refs.peopleFiltersData.state.selectedIndustries;

            if (industries.length !== 0) {
                newUrl += 'facetIndustry=%5B"';

                for (let i=0; i < industries.length; i++) {
                    if (i === industries.length - 1) {
                        newUrl += industries[i].value + '"%5D&';
                        break;
                    } else {
                        newUrl += industries[i].value + '"%2C"';
                    }
                }
            }
        }
        if (connections.length !== 0) {
            newUrl += 'facetNetwork=%5B"';

            for (let i=0; i < connections.length; i++) {
                if (i === connections.length - 1) {
                    newUrl += connections[i].value + '"%5D&';
                    break;
                } else {
                    newUrl += connections[i].value + '"%2C"';
                }
            }
        }

        if (this.state.showAllFilters) {
            let pastCompanies = this.refs.peopleFiltersData.state.selectedPastCompanies;
            let languages = this.refs.peopleFiltersData.state.selectedLanguages;
            let schools = this.refs.peopleFiltersData.state.selectedSchools;
            let nonProfitInterests = this.refs.peopleFiltersData.state.selectedNonProfitInterests;

            if (nonProfitInterests.length !== 0) {
                newUrl += 'facetNonprofitInterest=%5B"';

                for (let i=0; i < nonProfitInterests.length; i++) {
                    if (i === nonProfitInterests.length - 1) {
                        newUrl += nonProfitInterests[i].value + '"%5D&';
                        break;
                    } else {
                        newUrl += nonProfitInterests[i].value + '"%2C"';
                    }
                }
            }
            if (pastCompanies.length !== 0) {
                newUrl += 'facetPastCompany=%5B"';

                for (let i=0; i < pastCompanies.length; i++) {
                    if (i === pastCompanies.length - 1) {
                        newUrl += pastCompanies[i].value + '"%5D&';
                        break;
                    } else {
                        newUrl += pastCompanies[i].value + '"%2C"';
                    }
                }
            }
            if (languages.length !== 0) {
                newUrl += 'facetProfileLanguage=%5B"';

                for (let i=0; i < languages.length; i++) {
                    if (i === languages.length - 1) {
                        newUrl += languages[i].value + '"%5D&';
                        break;
                    } else {
                        newUrl += languages[i].value + '"%2C"';
                    }
                }
            }
            if (schools.length !== 0) {
                newUrl += 'facetSchool=%5B"';

                for (let i=0; i < schools.length; i++) {
                    if (i === schools.length - 1) {
                        newUrl += schools[i].value + '"%5D&';
                        break;
                    } else {
                        newUrl += schools[i].value + '"%2C"';
                    }
                }
            }
        }

        return newUrl;
    }

    searchJobsFilters(company, experienceLevel, linkedInFeatures, dp4, newUrl) {
        if (company.length !== 0) {
            newUrl += 'f_C=';
            for (let i=0; i < company.length; i++) {
                if (i === company.length - 1) {
                    newUrl += company[i].value + '&';
                    break;
                } else {
                    newUrl += company[i].value + '%2C';
                }
            }
        }
        if (experienceLevel.length !== 0) {
            newUrl += 'f_E=';

            for (let i=0; i < experienceLevel.length; i++) {
                if (i === experienceLevel.length - 1) {
                    newUrl += experienceLevel[i].value + '&';
                    break;
                } else {
                    newUrl += experienceLevel[i].value + '%2C';
                }
            }
        }

        if (this.state.showAllFilters) {
            let jobFunction = this.refs.jobsFiltersData.state.selectedJobFunction;
            let industries = this.refs.jobsFiltersData.state.selectedIndustries;
            let jobTypes = this.refs.jobsFiltersData.state.selectedJobTypes;

            if (jobFunction.length !== 0) {
                newUrl += 'f_F=';

                for (let i=0; i < jobFunction.length; i++) {
                    if (i === jobFunction.length - 1) {
                        newUrl += jobFunction[i].value + '&';
                        break;
                    } else {
                        newUrl += jobFunction[i].value + '%2C';
                    }
                }
            }
            if (industries.length !== 0) {
                newUrl += 'f_I=';

                for (let i=0; i < industries.length; i++) {
                    if (i === industries.length - 1) {
                        newUrl += industries[i].value + '&';
                        break;
                    } else {
                        newUrl += industries[i].value + '%2C';
                    }
                }
            }
            if (jobTypes.length !== 0) {
                newUrl += 'f_JT=';

                for (let i=0; i < jobTypes.length; i++) {
                    if (i === jobTypes.length - 1) {
                        newUrl += jobTypes[i].value + '&';
                        break;
                    } else {
                        newUrl += jobTypes[i].value + '%2C';
                    }
                }
            }
        }

        if (linkedInFeatures.length !== 0) {
            newUrl += 'f_LF=f_';

            for (let i=0; i < linkedInFeatures.length; i++) {
                if (i === linkedInFeatures.length - 1) {
                    newUrl += linkedInFeatures[i].value + '&';
                    break;
                } else {
                    newUrl += linkedInFeatures[i].value + '%2Cf_';
                }
            }
        }
        if (!dp4) {
            newUrl += 'f_TP=';

            if (this.state.showAllFilters) {
                if (this.refs.jobsFiltersData.refs.dp1.checked) {
                    newUrl += this.refs.jobsFiltersData.refs.dp1.value + '&';
                } else if (this.refs.jobsFiltersData.refs.dp2.checked) {
                    newUrl += this.refs.jobsFiltersData.refs.dp2.value + '&';
                } else {
                    newUrl += this.refs.jobsFiltersData.refs.dp3.value + '&';
                }
            } else {
                if (this.refs.dp1.checked) {
                    newUrl += this.refs.dp1.value + '&';
                } else if (this.refs.dp2.checked) {
                    newUrl += this.refs.dp2.value + '&';
                } else {
                    newUrl += this.refs.dp3.value + '&';
                }
            }
        }

        return newUrl;
    }

    changeBooleanFilters(e) {
        if (e.target.tagName === "INPUT") {
            let selectedArea = window.getSelection();

            /*if there is a selected text in seerch input*/
            if (selectedArea.toString()) {
                if (selectedArea.anchorNode.className === "input-group search-field-container" &&
                    selectedArea.focusNode.className === "input-group search-field-container") {
                    let selectedText = selectedArea.toString();

                    if (e.target.value === '""') {
                        selectedText = ' ' + '"' + selectedText + '"' + ' ';
                    } else if (e.target.value === '()') {
                        selectedText = ' ' + '(' + selectedText + ')' + ' ';
                    } else {
                        selectedText = ' ' + e.target.value + ' ' + selectedText;
                    }

                    document.execCommand("insertText", false, selectedText);
                    this.refs.serachField.value = this.refs.serachField.value.trim().replace(/ +/g, ' ');
                }
            } else {
                let searchValue = this.refs.serachField.value.trim().replace(/ +/g, ' ');
                this.refs.serachField.value = searchValue + ' ';

                if (e.target.value === '""' || e.target.value === '()') {
                    if (searchValue.endsWith('""') || searchValue.endsWith('()')) {
                        this.refs.serachField.value = searchValue.slice(0, searchValue.length - 2);
                    }

                    this.refs.serachField.value += e.target.value;
                    this.refs.serachField.value = this.refs.serachField.value.trim().replace(/ +/g, ' ');
                    this.refs.serachField.focus();
                    this.refs.serachField.setSelectionRange(this.refs.serachField.value.length - 1, this.refs.serachField.value.length - 1);
                }

                if (e.target.value === 'NOT' || e.target.value === 'AND' || e.target.value === 'OR') {
                    if (searchValue.endsWith('NOT') || searchValue.endsWith('AND')) {
                        this.refs.serachField.value = searchValue.slice(0, searchValue.length - 3);
                    } else if (searchValue.endsWith(' OR')) {
                        this.refs.serachField.value = searchValue.slice(0, searchValue.length - 2);
                    }

                    this.refs.serachField.value += e.target.value + ' ';
                    this.refs.serachField.focus();
                }
            }
        }
    }

    search(e) {
        if (this.state.enterPressed) return;

        let value = this.state.value.trim();
        let newUrl = this.state.url + 'search/results/';

        if(this.refs.searchPeople.checked) {
            newUrl += 'people/?';

            if (this.state.showAllFilters) {
                newUrl += 'company=';

                if (this.refs.peopleFiltersData.refs.company.value.trim()) {
                    newUrl += this.refs.peopleFiltersData.refs.company.value.replace(/ +/g, '%20');
                }

                newUrl += '&';

                newUrl = this.searchPeopleFilters(this.refs.peopleFiltersData.state.selectedCurrentCompanies,
                    this.refs.peopleFiltersData.state.selectedLocations, this.refs.peopleFiltersData.state.selectedConnections, newUrl);

                newUrl += 'firstName=';

                if (this.refs.peopleFiltersData.refs.firstName.value.trim()) {
                    newUrl += this.refs.peopleFiltersData.refs.firstName.value.replace(/ +/g, '%20');
                }

                if (value) {
                    newUrl += '&keywords=' + value.replace(/ +/g, '%20');
                }

                newUrl += '&lastName=';

                if (this.refs.peopleFiltersData.refs.lastName.value.trim()) {
                    newUrl += this.refs.peopleFiltersData.refs.lastName.value.replace(/ +/g, '%20');
                }

                newUrl += '&school=';

                if (this.refs.peopleFiltersData.refs.school.value.trim()) {
                    newUrl += this.refs.peopleFiltersData.refs.school.value.replace(/ +/g, '%20');
                }

                newUrl += '&title=';

                if (this.refs.peopleFiltersData.refs.title.value.trim()) {
                    newUrl += this.refs.peopleFiltersData.refs.title.value.replace(/ +/g, '%20');
                }
            } else {
                newUrl = this.searchPeopleFilters(this.state.selectedCurrentCompanies, this.state.selectedLocations, this.state.selectedConnections, newUrl);

                if (value) {
                    newUrl += 'keywords=' + value.replace(/ +/g, '%20');
                } else {
                    newUrl = newUrl.slice(0, newUrl.length - 1);
                }
            }

        } else if (this.refs.searchJobs.checked) {
            newUrl = 'https://www.linkedin.com/jobs/search/?';

            if (this.state.showAllFilters) {
                newUrl = this.searchJobsFilters(this.refs.jobsFiltersData.state.selectedCompany, this.refs.jobsFiltersData.state.selectedExperienceLevel,
                    this.refs.jobsFiltersData.state.selectedLinkedInFeatures, this.refs.jobsFiltersData.refs.dp4.checked, newUrl);
            } else {
                newUrl = this.searchJobsFilters(this.state.selectedCompany, this.state.selectedExperienceLevel,
                    this.state.selectedLinkedInFeatures, this.refs.dp4.checked, newUrl);
            }

            if (value) {
                newUrl += 'keywords=' + value.replace(/ +/g, '%20');
            } else {
                newUrl = newUrl.slice(0, newUrl.length - 1);
            }

        } else if(this.refs.searchContent.checked) {
            newUrl += 'content/' + ( value ? ('?keywords=' + value.replace(/ +/g, '%20')) : '');
        } else if(this.refs.searchCompanies.checked) {
            newUrl += 'companies/' + ( value ? ('?keywords=' + value.replace(/ +/g, '%20')) : '');
        } else if(this.refs.searchGroups.checked) {
            newUrl += 'groups/' + ( value ? ('?keywords=' + value.replace(/ +/g, '%20')) : '');
        } else if(this.refs.searchSchools.checked) {
            newUrl += 'schools/' + ( value ? ('?keywords=' + value.replace(/ +/g, '%20')) : '');
        } else {
            newUrl += 'index/' + ( value ? ('?keywords=' + value.replace(/ +/g, '%20')) : '');
        }
        this.setState({url: newUrl});
        console.log('newUrl===' + newUrl);

        //e.preventDefault();
    }

    saveFilters(savedFilterName, updatedFilter) {
        console.log(savedFilterName);
        console.log(updatedFilter);
        if (!savedFilterName.trim()) {
            this.setState({nameColor: 'red'});
            return;
        }

        const value = this.refs.serachField.value.trim();
        let savedData;

        if (this.refs.searchPeople.checked) {
            const searchPeople = this.refs.searchPeople.checked;

            if (!this.state.showAllFilters) {
                const {selectedLocations, selectedConnections, selectedCurrentCompanies} = this.state;
                savedData = {savedFilterName, value, searchPeople, selectedLocations, selectedConnections, selectedCurrentCompanies};
            } else {
                const {showAllFilters} = this.state;
                const firstName = this.refs.peopleFiltersData.refs.firstName.value,
                    lastName = this.refs.peopleFiltersData.refs.lastName.value,
                    title = this.refs.peopleFiltersData.refs.title.value,
                    company = this.refs.peopleFiltersData.refs.company.value,
                    school = this.refs.peopleFiltersData.refs.school.value;
                const {selectedConnections, selectedLocations, selectedCurrentCompanies, selectedPastCompanies,
                    selectedIndustries, selectedSchools, selectedLanguages, selectedNonProfitInterests} = this.refs.peopleFiltersData.state;

                savedData = {savedFilterName, value, searchPeople, showAllFilters, firstName, lastName, title, company, school,
                    selectedConnections, selectedLocations, selectedCurrentCompanies, selectedPastCompanies,
                    selectedIndustries, selectedSchools, selectedLanguages, selectedNonProfitInterests};
            }
        } else if (this.refs.searchJobs.checked) {
            const searchJobs = this.refs.searchJobs.checked;

            if (!this.state.showAllFilters) {
                const datePosted = {
                    'dp1': this.refs.dp1.checked,
                    'dp2': this.refs.dp2.checked,
                    'dp3': this.refs.dp3.checked,
                    'dp4': this.refs.dp4.checked
                };
                const {selectedLinkedInFeatures, selectedCompany, selectedExperienceLevel} = this.state;
                savedData = {savedFilterName, value, searchJobs, datePosted, selectedLinkedInFeatures, selectedCompany, selectedExperienceLevel};
            } else {
                const {showAllFilters} = this.state;
                const datePosted = {
                    'dp1': this.refs.jobsFiltersData.refs.dp1.checked,
                    'dp2': this.refs.jobsFiltersData.refs.dp2.checked,
                    'dp3': this.refs.jobsFiltersData.refs.dp3.checked,
                    'dp4': this.refs.jobsFiltersData.refs.dp4.checked
                };
                const {selectedLinkedInFeatures, selectedJobTypes, selectedCompany, selectedIndustries,
                    selectedJobFunction, selectedExperienceLevel} = this.refs.jobsFiltersData.state;

                savedData = {savedFilterName, value, searchJobs, showAllFilters, datePosted, selectedLinkedInFeatures,
                    selectedJobTypes, selectedCompany, selectedIndustries, selectedJobFunction, selectedExperienceLevel};
            }
        } else if (this.refs.searchContent.checked || this.refs.searchCompanies.checked || this.refs.searchGroups.checked || this.refs.searchSchools.checked) {
            const searchContent = this.refs.searchContent.checked,
                searchCompanies = this.refs.searchCompanies.checked,
                searchGroups = this.refs.searchGroups.checked,
                searchSchools = this.refs.searchSchools.checked;

            savedData = {savedFilterName, value, searchContent, searchCompanies, searchGroups, searchSchools};
    } else {
            savedData = {savedFilterName, value};
        }

        if (updatedFilter) {
            const updates = {};
            updates['/savedSearchParameters/' + this.state.userID + '/' + updatedFilter.serverKey] = savedData;
            filterDataForUpdate.update(updates);
        } else {
            this.state.savedSearchRef.push(savedData);
        }

        this.setState({filterName: false, isNewFilter: false});
    }

    signOut() {
        firebaseApp.auth().signOut();
    }

    componentWillMount() {
        firebaseData.ref('userID').on('value', snap => {
            let savedSearchFiltersFromServer = [];
            snap.forEach(savedSearchFilter => {
                savedSearchFiltersFromServer.push(savedSearchFilter.val());
            });

            this.setState({userID: savedSearchFiltersFromServer[0]});
        });
    }

    componentDidUpdate() {
        if (this.state.enterPressed) {
            this.refs.searchButton.click();
            this.setState({enterPressed: false});
        }

        if (this.state.userJobsFilter) {
            this.refs.dp3.checked = true;
            if (this.state.selectedFilter.datePosted.dp3) {
                this.refs.dp3.checked = true;
            } else if (this.state.selectedFilter.datePosted.dp2) {
                this.refs.dp2.checked = true;
            } else if (this.state.selectedFilter.datePosted.dp1) {
                this.refs.dp1.checked = true;
            }

            this.setState({userJobsFilter: false, selectedFilter: null});
        }

        if (this.state.userPeopleAllFilters) {
            this.refs.peopleFiltersData.refs.firstName.value = this.state.selectedFilter.firstName;
            this.refs.peopleFiltersData.refs.lastName.value = this.state.selectedFilter.lastName;
            this.refs.peopleFiltersData.refs.title.value = this.state.selectedFilter.title;
            this.refs.peopleFiltersData.refs.company.value = this.state.selectedFilter.company;
            this.refs.peopleFiltersData.refs.school.value = this.state.selectedFilter.school;

            this.refs.peopleFiltersData.setState({selectedConnections: [], selectedLocations: [],
                selectedCurrentCompanies: [], selectedPastCompanies: [], selectedIndustries: [], selectedSchools: [],
                selectedLanguages: [], selectedNonProfitInterests: []});

            if (this.state.selectedFilter.selectedConnections) {
                this.refs.peopleFiltersData.setState({selectedConnections: this.state.selectedFilter.selectedConnections});
            }
            if (this.state.selectedFilter.selectedLocations) {
                this.refs.peopleFiltersData.setState({selectedLocations: this.state.selectedFilter.selectedLocations});
            }
            if (this.state.selectedFilter.selectedCurrentCompanies) {
                this.refs.peopleFiltersData.setState({selectedCurrentCompanies: this.state.selectedFilter.selectedCurrentCompanies});
            }
            if (this.state.selectedFilter.selectedPastCompanies) {
                this.refs.peopleFiltersData.setState({selectedPastCompanies: this.state.selectedFilter.selectedPastCompanies});
            }
            if (this.state.selectedFilter.selectedIndustries) {
                this.refs.peopleFiltersData.setState({selectedIndustries: this.state.selectedFilter.selectedIndustries});
            }
            if (this.state.selectedFilter.selectedSchools) {
                this.refs.peopleFiltersData.setState({selectedSchools: this.state.selectedFilter.selectedSchools});
            }
            if (this.state.selectedFilter.selectedLanguages) {
                this.refs.peopleFiltersData.setState({selectedLanguages: this.state.selectedFilter.selectedLanguages});
            }
            if (this.state.selectedFilter.selectedNonProfitInterests) {
                this.refs.peopleFiltersData.setState({selectedNonProfitInterests: this.state.selectedFilter.selectedNonProfitInterests});
            }

            this.setState({userPeopleAllFilters: false, selectedFilter: null});
        }

        if (this.state.userJobsAllFilters) {
            this.refs.jobsFiltersData.refs.dp3.checked = true;
            if (this.state.selectedFilter.datePosted.dp3) {
                this.refs.jobsFiltersData.refs.dp3.checked = true;
            } else if (this.state.selectedFilter.datePosted.dp2) {
                this.refs.jobsFiltersData.refs.dp2.checked = true;
            } else if (this.state.selectedFilter.datePosted.dp1) {
                this.refs.jobsFiltersData.refs.dp1.checked = true;
            }

            this.refs.jobsFiltersData.setState({selectedLinkedInFeatures: [], selectedJobTypes: [],
                selectedCompany: [], selectedIndustries: [], selectedJobFunction: [], selectedExperienceLevel: []});

            if (this.state.selectedFilter.selectedLinkedInFeatures) {
                this.refs.jobsFiltersData.setState({selectedLinkedInFeatures: this.state.selectedFilter.selectedLinkedInFeatures});
            }
            if (this.state.selectedFilter.selectedJobTypes) {
                this.refs.jobsFiltersData.setState({selectedJobTypes: this.state.selectedFilter.selectedJobTypes});
            }
            if (this.state.selectedFilter.selectedCompany) {
                this.refs.jobsFiltersData.setState({selectedCompany: this.state.selectedFilter.selectedCompany});
            }
            if (this.state.selectedFilter.selectedIndustries) {
                this.refs.jobsFiltersData.setState({selectedIndustries: this.state.selectedFilter.selectedIndustries});
            }
            if (this.state.selectedFilter.selectedJobFunction) {
                this.refs.jobsFiltersData.setState({selectedJobFunction: this.state.selectedFilter.selectedJobFunction});
            }
            if (this.state.selectedFilter.selectedExperienceLevel) {
                this.refs.jobsFiltersData.setState({selectedExperienceLevel: this.state.selectedFilter.selectedExperienceLevel});
            }

            this.setState({userJobsAllFilters: false, selectedFilter: null});
        }
    }

    componentDidMount() {
        let timer;

        timer = setInterval(() => {
            if (this.state.userID) {
                this.setState({savedSearchRef: firebaseData.ref('savedSearchParameters/' + this.state.userID)});

                this.state.savedSearchRef.on('value', snap => {
                    let savedSearchFiltersFromServer = [];

                    snap.forEach(savedSearchFilter => {
                        const data = savedSearchFilter.val();
                        data.serverKey = savedSearchFilter.key;
                        savedSearchFiltersFromServer.push(data);
                    });

                    this.setState({savedSearchFilters: savedSearchFiltersFromServer});
                });

                clearInterval(timer);
            }
        }, 300);
    }

    render(){
        /*style and data for select-elements*/
        const selectStyles = {
            container: (base) => ({
                ...base,
                width: 300
            }),
            valueContainer: (base) => ({
                ...base,
                width: 225,
                minHeight: 45
            }),
            placeholder: (base) => ({
                ...base,
                paddingLeft: 10
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
        const locations = [
            {value: 'by', label: 'Belarus'},
            {value: 'ru', label: 'Russian Federation'},
            {value: 'ua', label: 'Ukraine'},
            {value: 'pl', label: 'Poland'},
            {value: 'lt', label: 'Lithuania'}
        ];
        const connections = [
            {value: 'F', label: '1st'},
            {value: 'S', label: '2nd'},
            {value: 'O', label: '3rd+'}
        ];
        const currentCompanies = [
            {value: '4972', label: 'EPAM Systems'},
            {value: '238318', label: 'IBA Group'},
            {value: '127309', label: 'Wargaming'},
            {value: '10921', label: 'Itransition Group'},
            {value: '1461240', label: 'ISsoft'}
        ];
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
        const experienceLevel = [
            {value: '1', label: 'Internship'},
            {value: '2', label: 'Entry level'},
            {value: '3', label: 'Associate'},
            {value: '4', label: 'Mid-Senior level'},
            {value: '5', label: 'Director'},
            {value: '6', label: 'Executive'}
        ];
        const userSavedFilters = [];
        let savedSearchFiltersConter = 0;

        this.state.savedSearchFilters.forEach(savedSearchFilter => {
            userSavedFilters.push({value: savedSearchFiltersConter, label: savedSearchFilter.savedFilterName});
            savedSearchFiltersConter++;
        });

        return(
            <div className="app">
                <div className="header">
                    <Select
                        className="user-filters"
                        placeholder="My filters"
                        hideSelectedOptions={false}
                        value={this.state.userSavedFiltersChecked}
                        onChange={this.handleChangeUserSavedFilters}
                        options={userSavedFilters}
                        styles={selectStyles}
                    />
                    <button className="btn btn-danger sign-out" onClick={() => this.signOut()}>Sign Out</button>
                </div>
                <div className="boolean-filters" onClick={(e) => this.changeBooleanFilters(e)}>
                    <input type="checkbox" id="quotes" value='""' ref="quotes" />
                    <label className="checkbox-inline quotes-button" htmlFor="quotes"><FaQuote /></label>
                    <input type="checkbox" id="parentheses" value='()' ref="parentheses" />
                    <label className="checkbox-inline parentheses-button" htmlFor="parentheses"><FaParentheses /></label>
                    <input type="checkbox" id="not" value='NOT' ref="not" />
                    <label className="checkbox-inline not-button" htmlFor="not"><FaNot /></label>
                    <input type="checkbox" id="and" value='AND' ref="and" />
                    <label className="checkbox-inline and-button" htmlFor="and"><FaAnd /></label>
                    <input type="checkbox" id="or" value='OR' ref="or" />
                    <label className="checkbox-inline or-button" htmlFor="or"><FaOR /></label>
                </div>
                <div className="input-group search-field-container">
                    <input type="text" className="form-control search-field" placeholder="&#x1F50D;" ref="serachField" autoComplete="off"
                           onChange={e => {this.serachFieldChanged(e)}} onKeyUp={(e) => this.serachFieldKeyUp(e)} />
                    { this.state.value.trim() ?
                        <div className="input-group-btn search-icon">
                            <a href={this.state.url} className="btn btn-default" onClick={(e) => this.search(e)}>
                                <i className="glyphicon glyphicon-search"></i>
                            </a>
                        </div>: null
                    }
                </div>
                <div className="filter-category">
                    <div className="filter-category_caption"><strong>Category:</strong></div>
                    <div className="filter-category_list">
                        <input type="checkbox" id="people" name="category" ref="searchPeople" defaultChecked={true} onChange={() =>
                            this.setState({showPeopleFilters: this.refs.searchPeople.checked, showJobsFilters: false, showAllFilters: false})} />
                        <label htmlFor="people"
                               onClick={() => {
                                   this.refs.searchJobs.checked = this.refs.searchContent.checked = this.refs.searchCompanies.checked =
                                       this.refs.searchGroups.checked = this.refs.searchSchools.checked = false
                               }}>People</label>

                        <input type="checkbox" id="jobs" name="category" ref="searchJobs" onChange={() =>
                            this.setState({showPeopleFilters: false, showJobsFilters: this.refs.searchJobs.checked, showAllFilters: false})} />
                        <label htmlFor="jobs"
                               onClick={() => {
                                   this.refs.searchPeople.checked = this.refs.searchContent.checked = this.refs.searchCompanies.checked =
                                       this.refs.searchGroups.checked = this.refs.searchSchools.checked = false
                               }}>Jobs</label>

                        <input type="checkbox" id="content" name="category" ref="searchContent" onChange={() =>
                            this.setState({showPeopleFilters: false, showJobsFilters: false, showAllFilters: false})} />
                        <label htmlFor="content"
                               onClick={() => {this.refs.searchJobs.checked = this.refs.searchPeople.checked = this.refs.searchCompanies.checked =
                                   this.refs.searchGroups.checked = this.refs.searchSchools.checked = false}}>Content</label>

                        <input type="checkbox" id="companies" name="category" ref="searchCompanies" onChange={() =>
                            this.setState({showPeopleFilters: false, showJobsFilters: false, showAllFilters: false})} />
                        <label htmlFor="companies"
                               onClick={() => {this.refs.searchJobs.checked = this.refs.searchContent.checked = this.refs.searchPeople.checked =
                                   this.refs.searchGroups.checked = this.refs.searchSchools.checked = false}}>Companies</label>

                        <input type="checkbox" id="groups" name="category" ref="searchGroups" onChange={() =>
                            this.setState({showPeopleFilters: false, showJobsFilters: false, showAllFilters: false})} />
                        <label htmlFor="groups"
                               onClick={() => {this.refs.searchJobs.checked = this.refs.searchContent.checked = this.refs.searchCompanies.checked =
                                   this.refs.searchPeople.checked = this.refs.searchSchools.checked = false}}>Groups</label>

                        <input type="checkbox" id="schools" name="category" ref="searchSchools" onChange={() =>
                            this.setState({showPeopleFilters: false, showJobsFilters: false, showAllFilters: false})} />
                        <label htmlFor="schools"
                               onClick={() => {this.refs.searchJobs.checked = this.refs.searchContent.checked = this.refs.searchCompanies.checked =
                                   this.refs.searchGroups.checked = this.refs.searchPeople.checked = false}}>Schools</label>
                    </div>
                </div>

                { (this.state.showPeopleFilters || this.state.showJobsFilters || this.state.showAllFilters) ?
                    <div className="filters">
                        <div className="filters-header">
                            <div className="filters-caption"><strong>Filters:</strong></div>
                            {this.state.showAllFilters ?
                                <div className="clear-cancel-buttons">
                                    <button className="btn btn-info" onClick={() => this.clearFilters()}>Clear</button>
                                    <button className="btn btn-danger cancel-button" onClick={() => this.hideAllFilters()}>
                                        Cancel
                                    </button>
                                </div> :
                                <div>
                                    <button className="btn btn-info all-filters-button" onClick={() => this.showAllFilters()}>All Filters</button>
                                </div>
                            }
                        </div>
                        {this.state.showPeopleFilters ?
                            <div className="filters_people">
                                <div className="filters_item filters_item_locations">
                                    <div className="filters_item_title">Locations:</div>
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
                                </div>
                                <div className="filters_item filters_item_connections">
                                    <div className="filters_item_title">Connections:</div>
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
                                </div>
                                <div className="filters_item filters_item_current-companies">
                                    <div className="filters_item_title">Current Companies:</div>
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
                                </div>
                            </div> : null
                        }
                        {this.state.showJobsFilters ?
                            <div className="filters_jobs">
                                <div className="filters_item filters_item_date-posted">
                                    <div className="filters_item_title">Date Posted:</div>
                                    <label>
                                        <input type="radio" ref="dp1" name="filters_item_date-posted" value="1" />
                                        Past 24 hours
                                    </label>
                                    <label>
                                        <input type="radio" ref="dp2" name="filters_item_date-posted" value="1%2C2" />
                                        Past Week
                                    </label>
                                    <label>
                                        <input type="radio" ref="dp3" name="filters_item_date-posted" value="1%2C2%2C3%2C4" />
                                        Past Month
                                    </label>
                                    <label>
                                        <input type="radio" ref="dp4" name="filters_item_date-posted" defaultChecked={true} />
                                        Any Time
                                    </label>
                                </div>
                                <div className="filters_item">
                                    <div className="filters_item_jobs">
                                        <div className="filters_item_title">LinkedIn Features:</div>
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
                                    </div>
                                    <div className="filters_item_jobs">
                                        <div className="filters_item_title">Company:</div>
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
                                    </div>
                                    <div className="filters_item_jobs">
                                        <div className="filters_item_title">Experience Level:</div>
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
                                    </div>
                                </div>
                            </div> : null
                        }
                        { this.state.showAllFilters ?
                            <div>
                                { this.refs.searchPeople.checked ?
                                    <AllFiltersPeople ref="peopleFiltersData" /> :
                                    <AllFiltersJobs ref="jobsFiltersData" />
                                }
                            </div> : null
                        }
                    </div> : null
                }
                <div className="footer-buttons">
                    <a href={this.state.url} className="btn btn-primary search-button" ref="searchButton" onClick={(e) => this.search(e)}>Search</a>
                    { !this.state.filterName ?
                        <button className="btn btn-success" onClick={() => this.setState({filterName: true})}>Save filters</button> :
                        <div>
                            { (!this.state.userSavedFiltersChecked || this.state.isNewFilter) ?
                                <div>
                                    <input type="text" placeholder="Filter name" ref="savedFilterName" style={{borderColor: this.state.nameColor}} />
                                    <button className="btn btn-success" onClick={() => this.saveFilters(this.refs.savedFilterName.value, false)}>Save</button>
                                </div> :
                                <div>
                                    <button className="btn btn-success" onClick={() => this.saveFilters(this.state.userSavedFiltersChecked.label, this.state.savedSearchFilters[this.state.userSavedFiltersChecked.value])}>
                                        Change filter "{this.state.userSavedFiltersChecked.label}"
                                    </button>
                                    <button className="btn btn-success save-button" onClick={() => this.setState({isNewFilter: true})}>Save as new filter</button>
                                </div>
                            }
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default App;