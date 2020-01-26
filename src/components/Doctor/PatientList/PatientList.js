import React from 'react';
import axios from '../../../axios-objects';
import Navigation from '../../../containers/Navigation/Navigation';

class PatientList extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            patients: []
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

    render() {
        return (
            <div>
                <Navigation />
                {this.state.patients.map((pat, i) => {
                    return (
                        <div key={i}>
                            <p>Patient: {pat.firstName} {pat.lastName}</p>
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default PatientList;