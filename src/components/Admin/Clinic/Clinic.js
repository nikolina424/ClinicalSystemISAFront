import React from 'react';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Navigation from '../../../containers/Navigation/Navigation';
import axios from '../../../axios-objects';
import { Button, Header, Image, Modal } from 'semantic-ui-react';
import {updateObject} from '../../../shared/utility';

class Popup extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            modifyClinic: {
                name: '',
                description: '',
                address: '',
                clinicId: null
            }
        }
    }

    inputHandler = (event, type) => {
        let updatedObject = updateObject(this.state.modifyClinic, {
            [type]: event.target.value
        });
        this.setState({modifyClinic: updatedObject});
    }

    changeClinic = async(event, clinic) => {
        event.preventDefault();
        const token = sessionStorage.getItem('token');
        let modClinic = this.state.modifyClinic;
        modClinic.clinicId = clinic.id;
        if (modClinic.name === '') {
            modClinic.name = clinic.name;
        }
        if (modClinic.description === '') {
            modClinic.description = clinic.description;
        }
        if (modClinic.address === '') {
            modClinic.address = clinic.address;
        }

        try {
            const response = await axios.put('/modifyClinic', modClinic, {
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
        const { openModal, closeModal, clinic } = this.props;

        return (
            <Modal open={openModal} onClose={() => closeModal()} className="popupAdd">
                <Modal.Header>Modify clinic</Modal.Header>
                <Modal.Content image>
                    <Image wrapped size='medium' src='images/room.png' />
                    <Modal.Description>
                        <Header>Change clinics informations</Header>
                        <p> Clinic name: </p>
                        <input type="text" defaultValue={clinic !== null ? clinic.name : ''} 
                        onChange={(event) => this.inputHandler(event, 'name')} />
                        <p> Clinic description: </p>
                        <input type="text" defaultValue={clinic !== null ? clinic.description : ''} 
                        onChange={(event) => this.inputHandler(event, 'description')} />
                        <p> Clinic address: </p>
                        <input type="text" defaultValue={clinic !== null ? clinic.address : ''} 
                        onChange={(event) => this.inputHandler(event, 'address')} />
                    </Modal.Description>
                    {clinic !== null ? <Button onClick={(event) => this.changeClinic(event, clinic)}>Modify</Button> : null}
                </Modal.Content>
            </Modal>
        );
    }
}

class Clinic extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            clinic: null,
            openModal: false
        }
    }

    componentDidMount = async() => {
        const token = sessionStorage.getItem('token');

        try {
            const response = await axios.get('/userClinic', {
                headers: {
                    'Authorization' : 'Bearer ' + token
                }
            });
            if (response) {
                this.setState({clinic: response.data});
            }
        } catch(err) {
            console.log(err);
        }
    }

    closeModal = () => {
        this.setState({openModal: false});
    }

    modifyClinic = (event) => {
        event.preventDefault();
        this.setState({openModal: true});
    }

    renderClinic = () => {
        return (
            <Auxiliary>
                {this.state.clinic !== null ?
                <div className="card" style={{cursor: 'default'}}>
                    <div className="image">
                    <img src="/images/clinicImage.png" alt="ClinicPicture"/>
                    </div>
                    <div className="content">
                        <div className="header">{this.state.clinic.name}</div>
                    <div className="meta">
                        <a style={{cursor: 'default'}}>{this.state.clinic.description}</a>
                    </div>
                    <div className="description">
                    {this.state.clinic.name} is at {this.state.clinic.address}. She is part of
                    {' ' + this.state.clinic.clinicCenter.name} and {this.state.clinic.admin.firstName} {this.state.clinic.admin.lastName + ' '}
                    rules it.
                    </div>
                    </div>
                    <div className="extra content">
                    <span className="right floated">
                        Joined in 2020
                    </span>
                    <span style={{cursor: 'pointer'}} onClick={(event) => this.modifyClinic(event)}>
                        <i className="user icon"></i>
                        Modify clinic
                    </span>
                    </div>
                </div> : null}
            </Auxiliary>
        );
    }

    render() {
        return (
            <Auxiliary>
                <Navigation />
                <div className="ui link cards" style={{marginTop: '10px', justifyContent: 'center'}}>
                    {this.renderClinic()}
                </div>
                <Popup clinic={this.state.clinic} openModal={this.state.openModal} closeModal={this.closeModal} /> 
            </Auxiliary>
        );
    }
}

export default Clinic;