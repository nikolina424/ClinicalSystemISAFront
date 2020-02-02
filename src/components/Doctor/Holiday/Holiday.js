import React from 'react';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Navigation from '../../../containers/Navigation/Navigation';
import {updateObject} from '../../../shared/utility';
import axios from '../../../axios-objects';

class Holiday extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            showForm: false,
            newHoliday: {
                startDate: null,
                finishDate: null,
                description: '',
                user: null
            }
        }
    }

    componentDidMount = async() => {
        const token = sessionStorage.getItem('token');

        try {
            const response = await axios.get('/getUser', {
                headers: {
                    'Authorization' : 'Bearer ' + token
                }
            });
            if (response) {
                const newHoliday = updateObject(this.state.newHoliday, {
                    user: response.data
                });
                this.setState({ newHoliday });
            }
        } catch(err) {
            console.log(err);
        }
    }

    showFormHandler = (event) => {
        event.preventDefault();
        this.setState((prevState) => ({showForm: !prevState.showForm}));
    }

    inputChangeHandler = (event, type) => {
        event.preventDefault();
        let newHoliday = updateObject(this.state.newHoliday, {
            [type] : event.target.value
        });
        this.setState({ newHoliday });
    }

    requestHoliday = async (event) => {
        event.preventDefault();
        const token = sessionStorage.getItem('token');
        const holiday = this.state.newHoliday;

        try {
            const response = await axios.post('/requestHoliday', holiday, {
                headers: {
                    'Authorization' : 'Bearer ' + token
                }
            });
            if (response) {
                window.location.reload();
            }
        } catch(err) {
            console.log(err);
        }
    }

    render() {
        return (
            <Auxiliary>
                <Navigation />
                <div className="d1" style={{width:'100%', height:'auto', display:'flex', flexDirection:'row'}}>
                    <div style={{float:'left', height:'100vw', width:'50%'}}>
                        <button className="mx-auto" style={{display:'block', marginTop: '20px'}} onClick={(event) => this.showFormHandler(event)}>Request Holiday</button>

                        {this.state.showForm ? 
                        <div style={{margin: '10px'}}>
                            <label style={{display:'block', textAlign:'center'}}>Start of holiday:</label>
                            <input type="date" className="mx-auto" style={{display:'block'}} onChange={(event) => this.inputChangeHandler(event, 'startDate')}/> 
                            <label style={{display:'block', textAlign:'center'}}>End of holiday:</label>
                            <input type="date" className="mx-auto" style={{display:'block'}} onChange={(event) => this.inputChangeHandler(event, 'finishDate')}/> 
                            <input type="text" className="mx-auto" style={{display:'block'}} placeholder="Description" onChange={(event) => this.inputChangeHandler(event, 'description')}/>
                            <button className="mx-auto" style={{display:'block'}} onClick={(event) => this.requestHoliday(event)}>Request</button>
                        </div> : null}
                    </div>
                </div>
            </Auxiliary>
        );
    }
}

export default Holiday;