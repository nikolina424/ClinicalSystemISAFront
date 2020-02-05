import React from 'react';
import Navigation from '../../../containers/Navigation/Navigation';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import axios from '../../../axios-objects';
import {updateObject} from '../../../shared/utility';
import { Button, Header, Image, Modal } from 'semantic-ui-react';

class PopupAdd extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            newDoctor: {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                address: '',
                city: '',
                country: '',
                phoneNumber: null,
                userId: null,
                role: 'DOCTOR'
            }
        }
    }

    inputHandlerAdd = (event, type) => {
        let updatedObject = updateObject(this.state.newDoctor, {
            [type]: event.target.value
        });
        this.setState({newDoctor: updatedObject});
    }

    selectChangeHandler = (event) => {
        let updatedObject = updateObject(this.state.newDoctor, {
            nesto: event.target.value
        });

        this.setState({newDoctor: updatedObject});
    }

    addNewDoctor = async(event) => {
        event.preventDefault();
        const token = sessionStorage.getItem('token');
        const newDoctor = this.state.newDoctor;

        try {
            const response = await axios.post('/addNewDoctor', newDoctor, {
                headers: {
                    'Authorization' : 'Bearer ' + token
                }
            });
            if(response) {
                window.location.reload();
            }
        } catch(err) {
            console.log(err);
        }
    }

    render() {
        const { openModalAdd, closeModalAdd } = this.props;
        return (
            <Modal open={openModalAdd} onClose={() => closeModalAdd()} className="popupAdd" style={{overflowY: 'initial'}}>
                <Modal.Header>Add new doctor</Modal.Header>
                <Modal.Content image>
                    <Image wrapped size='medium' src='images/doctor.png' />
                    <Modal.Description style={{width: '70%'}}>
                        <Header>Add new doctor to the clinic</Header>
                        <p> Doctor first name: </p>
                        <input className="displayInput" type="text" onChange={(event) => {this.inputHandlerAdd(event, 'firstName')}} />
                        <p> Doctor last name: </p>
                        <input className="displayInput" type="text" onChange={(event) => {this.inputHandlerAdd(event, 'lastName')}} />
                        <p> Doctor email: </p>
                        <input className="displayInput" type="text" onChange={(event) => {this.inputHandlerAdd(event, 'email')}} />
                        <p> Doctor password: </p>
                        <input className="displayInput" type="password" onChange={(event) => {this.inputHandlerAdd(event, 'password')}} />
                        <p> Doctor address: </p>
                        <input className="displayInput" type="text" onChange={(event) => {this.inputHandlerAdd(event, 'address')}} />
                        <p> Doctor city: </p>
                        <input className="displayInput" type="text" onChange={(event) => {this.inputHandlerAdd(event, 'city')}} />
                        <p> Doctor country: </p>
                        <input className="displayInput" type="text" onChange={(event) => {this.inputHandlerAdd(event, 'country')}} />
                        <p> Doctor phone number: </p>
                        <input className="displayInput" type="number" onChange={(event) => {this.inputHandlerAdd(event, 'phoneNumber')}} />
                        <p> Doctor user id: </p>
                        <input className="displayInput" type="number" onChange={(event) => {this.inputHandlerAdd(event, 'userId')}} />
                    </Modal.Description>
                    <Button style={{height: '300px'}} onClick={(event) => this.addNewDoctor(event)}>Add</Button>
                </Modal.Content>
            </Modal>
        );
    }
}

class Doctors extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            doctors: [],
            openModalAdd: false,
            inputSearch: '',
            searchedDoctors: []
        }
    }

    componentDidMount = async() => {
        const token = sessionStorage.getItem('token');

        try {
            const response = await axios.get('/getDoctorsClinic', {
                headers: {
                    'Authorization' : 'Bearer ' + token
                }
            });
            if (response) {
                this.setState({doctors: response.data});
            }
        } catch(err) {
            console.log(err);
        }
    }

    closeModalAdd = () => {
        this.setState({openModalAdd: false});
    }

    addDoctor = (event) => {
        event.preventDefault();
        this.setState({openModalAdd: true});
    }

    deleteDoctor = async(event, doc) => {
        event.preventDefault();
        const token = sessionStorage.getItem('token');
        
        try {
            const response = await axios.put('/deleteUser', doc, {
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

    inputSearchHandler = (event) => {
        event.preventDefault();
        this.setState({inputSearch: event.target.value});
    }

    searchDoctors = (event) => {
        event.preventDefault();
        const oldDoctors = this.state.doctors;
        let newDoctors = [];
        const searchString = this.state.inputSearch;

        for(let i = 0; i < oldDoctors.length; i++) {
            if((oldDoctors[i].firstName.indexOf(searchString) > -1) || (oldDoctors[i].lastName.indexOf(searchString) > -1)) {
                newDoctors.push(oldDoctors[i]);
            }
        }

        this.setState({searchedDoctors: newDoctors});
    }

    renderDoctors = () => {
        return (
            <Auxiliary>
                <div className="searchDiv">
                    <input type="text" placeholder="Search doctors by their names" style={{width: '50%'}} 
                        onChange={(event) => this.inputSearchHandler(event)} /> 
                    <button className="ui primary button" style={{width: '10%'}} onClick={(event) => this.searchDoctors(event)}>
                        <i className="search icon" style={{marginRight: '1.5vw'}}>Search</i>
                    </button>
                </div>

                <div className="ui link cards" style={{marginTop: '10px', justifyContent: 'center'}}>
                    {this.state.searchedDoctors.length === 0 ? this.state.doctors.map((doc, i) => {
                        return (
                            <div className="card" style={{cursor: 'default'}} key={i}>
                                <div className="image">
                                    {doc.image === null ? <img src="/images/doctor.png" alt="DoctorPicture"/>
                                    : <img src={'images/' + doc.image} alt="DoctorPicture" />}
                                </div>
                                <div className="content">
                                    <div className="header">{doc.firstName} {doc.lastName}</div>
                                <div className="meta">
                                    <a style={{cursor: 'default'}}>{doc.email}</a>
                                </div>
                                <div className="description">
                                {doc.firstName} {doc.lastName} lives in {doc.city}, {doc.country}. You can contact him through
                                email, or on his cellphone - 0{doc.phoneNumber}.
                                </div>
                                </div>
                                <div className="extra content">
                                <span className="right floated">
                                    Delete doctor   
                                    <i className="delete icon" style={{cursor: 'pointer'}} onClick={(event) => this.deleteDoctor(event, doc)}></i>
                                </span>
                                <span>
                                    <i className="user icon"></i>
                                    Doctors card
                                </span>
                                </div>
                            </div>
                        );
                    }) :
                    this.state.searchedDoctors.map((doc, i) => {
                        return (
                            <div className="card" style={{cursor: 'default'}} key={i}>
                                <div className="image">
                                    {doc.image === null ? <img src="/images/doctor.png" alt="DoctorPicture"/>
                                    : <img src={'images/' + doc.image} alt="DoctorPicture" />}
                                </div>
                                <div className="content">
                                    <div className="header">{doc.firstName} {doc.lastName}</div>
                                <div className="meta">
                                    <a style={{cursor: 'default'}}>{doc.email}</a>
                                </div>
                                <div className="description">
                                {doc.firstName} {doc.lastName} lives in {doc.city}, {doc.country}. You can contact him through
                                email, or on his cellphone - 0{doc.phoneNumber}.
                                </div>
                                </div>
                                <div className="extra content">
                                <span className="right floated">
                                    Delete doctor   
                                    <i className="delete icon" style={{cursor: 'pointer'}} onClick={(event) => this.deleteDoctor(event, doc)}></i>
                                </span>
                                <span>
                                    <i className="user icon"></i>
                                    Doctors card
                                </span>
                                </div>
                            </div>
                        );
                    })}
                    <div className="card" style={{boxShadow: 'none', cursor: 'default'}}>
                        <button className="buttonAdd" onClick={(event) => this.addDoctor(event)} 
                        data-tooltip="Add doctor to your feed" data-inverted="">
                            <i className="add icon"></i>
                        </button>
                    </div>
                </div>
            </Auxiliary>
        );
    }

    render() {
        return (
            <Auxiliary>
                <Navigation />
                {this.renderDoctors()}
                <PopupAdd openModalAdd={this.state.openModalAdd} closeModalAdd={this.closeModalAdd} />
            </Auxiliary>
        );
    }
}

export default Doctors;