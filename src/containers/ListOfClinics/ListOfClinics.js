import React from 'react';
import axios from '../../axios-objects'
import {updateObject} from '../../shared/utility'

class ListOfClinics extends React.PureComponent {

    constructor(props){
        super(props);

        this.state = {
            listOfClinics: {
                clinics: []
            }
        }
    }

    componentDidMount = async () => {
        const token = sessionStorage.getItem('token');

        try {
            const response = await axios.get('/getClinics', {
                headers: {
                    'Authorization' : 'Bearer ' + token
                }
            });
            if(response){
                const listOfClinics = updateObject(this.state.listOfClinics, {
                    clinics: response.data
                });
                this.setState({listOfClinics});
                console.log(this.state.listOfClinics.clinics);
            }
            
        } catch(err){
            console.log(err);
        }
    }

    render() {
        return (
            <div>
                {this.state.listOfClinics.clinics.map((cl, i) =>{
                    return (
                        <div key={i}>
                            <p>Clinic: {cl.name}</p>
                        </div>
                    )
                })}
            </div>
        );
    }

}

export default ListOfClinics;