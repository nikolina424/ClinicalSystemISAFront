import React from 'react';
import axios from '../../axios-objects'
import { updateObject } from '../../shared/utility';

class MedicalRecord extends React.PureComponent {
    constructor(props){
        super(props);

        this.state = {
            medicalRecord: {
                    mRecord: []

            }
        }
    }

    componentDidMount = async() => {
        const token = sessionStorage.getItem('token');
        try{
            const response = await axios.get('/getMedicalRecord', {
                headers: {
                    'Authorization' : 'Bearer ' + token
                }
            });
            if(response){
                const medicalRecord = updateObject(this.state.medicalRecord, {
                    mRecord: response.data
                });
                this.setState({medicalRecord});

                console.log(this.state.medicalRecord.mRecord);
                console.log(response);
            }                
        }catch(err){
            console.log(err);
        }
    }

    render(){
        return (
            <div>
            </div>
        );
    }
}

export default MedicalRecord;