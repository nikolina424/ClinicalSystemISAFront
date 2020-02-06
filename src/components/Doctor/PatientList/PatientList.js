import React from 'react';
import axios from '../../../axios-objects';
import Navigation from '../../../containers/Navigation/Navigation';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';

class PatientList extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            patients: [],
            inputSearch: '',
            searchPatients: []
        }
    }

    componentDidMount = async() => {
        const token = sessionStorage.getItem('token');

        try {
            const response = await axios.get('/getPatients', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            if (response) {
                this.setState({patients: response.data});
            }
        } catch(err) {
            console.log(err);
        }
    }

    inputSearchHandler = (event) => {
        event.preventDefault();
        this.setState({inputSearch: event.target.value});
    }

    searchPatients = (event) => {
        event.preventDefault();
        let newPatients = [];
        const string = this.state.inputSearch;
        for(let i = 0; i < this.state.patients.length; i++) {
            if ((this.state.patients[i].firstName.indexOf(string) > -1) || (this.state.patients[i].lastName.indexOf(string) > -1)
                || ((this.state.patients[i].firstName + ' ' + this.state.patients[i].lastName).indexOf(string) > -1) ||
                ((this.state.patients[i].firstName + this.state.patients[i].lastName).indexOf(string) > -1)) {
                newPatients.push(this.state.patients[i]);
            }
        }
        this.setState({searchPatients: newPatients});
    }

    renderSearch() {
        return (
            <Auxiliary>
                <div className="searchDiv">
                    <input type="text" placeholder="Search appointments by names" style={{width: '50%'}} 
                        onChange={(event) => this.inputSearchHandler(event)} /> 
                    <button className="ui primary button" style={{width: '10%'}} onClick={(event) => this.searchPatients(event)}>
                        <i className="search icon" style={{marginRight: '1.5vw'}}>Search</i>
                    </button>
                </div>
            </Auxiliary>
        );
    }

    renderPatients() {
        return(
            <Auxiliary>
                {this.state.searchPatients.length === 0 ? this.state.patients.map((pat, i) => {
                    return (
                        <div className="card" key={i} >
                            <div className="image">
                                <img src="/images/patient.png" alt="Patient"/>
                            </div>
                            <div className="content">
                                <div className="header">{pat.firstName} {pat.lastName}</div>
                                <div className="meta">
                                    <label>Patient</label>
                                </div>
                                <div className="description">
                                    Patient email is {pat.email}. You can contact him through his phone number {pat.phoneNumber} .
                                    He lives in {pat.city}, {pat.country}.
                                </div>
                            </div>
                        </div>
                    );
                }) :
                this.state.searchPatients.map((pat, i) => {
                    return (
                        <div className="card" key={i} >
                            <div className="image">
                                <img src="/images/patient.png" alt="Patient"/>
                            </div>
                            <div className="content">
                                <div className="header">{pat.firstName} {pat.lastName}</div>
                                <div className="meta">
                                    <label>Patient</label>
                                </div>
                                <div className="description">
                                    Patient email is {pat.email}. You can contact him through his phone number {pat.phoneNumber} .
                                    He lives in {pat.city}, {pat.country}.
                                </div>
                            </div>
                        </div>
                    );
                })}
            </Auxiliary>
        );
    }

    render() {
        return (
            <Auxiliary>
                <Navigation />
                {this.renderSearch()}
                <div className="ui link cards" style={{marginTop: '10px', justifyContent: 'center'}}>
                    {this.renderPatients()}
                </div>
            </Auxiliary>
        );
    }
}

export default PatientList;