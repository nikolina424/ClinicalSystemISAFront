import React from 'react';
import './Room.css';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import axios from '../../../axios-objects';
import {updateObject} from '../../../shared/utility';
import Navigation from '../../../containers/Navigation/Navigation';
import { Button, Header, Image, Modal } from 'semantic-ui-react';

class PopupAdd extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            clinics: [],
            newRoom: {
                number: null,
                clinicName: 'Klinika 1'
            }
        }
    }

    componentDidMount = async() => {
        const token = sessionStorage.getItem('token');

        try {
            const response = await axios.get('/getClinics', {
                headers: {
                    'Authorization' : 'Bearer ' + token
                }
            });
            if (response) {
                this.setState({clinics: response.data});
            }
        } catch(err) {
            console.log(err);
        }
    }

    inputHandlerAdd = (event, type) => {
        let updatedObject = updateObject(this.state.newRoom, {
            [type]: event.target.value
        });
        this.setState({newRoom: updatedObject});
    }

    selectChangeHandler = (event) => {
        let updatedObject = updateObject(this.state.newRoom, {
            clinicName: event.target.value
        });

        this.setState({newRoom: updatedObject});
    }

    selectClinicsHandler() {
        return (
            <Auxiliary>
                {this.state.clinics.map((clinic, i) => {
                    return (
                        <option key={i}>{clinic.name}</option>
                    );
                })}
            </Auxiliary>
        );
    }

    addNewRoom = async(event) => {
        event.preventDefault();
        const token = sessionStorage.getItem('token');
        const newRoom = this.state.newRoom;

        try {
            const response = await axios.post('/addNewRoom', newRoom, {
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
            <Modal open={openModalAdd} onClose={() => closeModalAdd()} className="popupAdd">
                <Modal.Header>Add new room</Modal.Header>
                <Modal.Content image>
                    <Image wrapped size='medium' src='images/room.png' />
                    <Modal.Description>
                        <Header>New room number and select clinic for this room</Header>
                        <p> Room number: </p>
                        <input type="number" onChange={(event) => {this.inputHandlerAdd(event, 'number')}} />
                        <p> Choose clinic:</p>
                        <select>
                            {this.selectClinicsHandler()}
                        </select>
                    </Modal.Description>
                    <Button onClick={(event) => this.addNewRoom(event)}>Add</Button>
                </Modal.Content>
            </Modal>
        );
    }
}

class Popup extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            clinics: [],
            modifyRoom: {
                number: null,
                clinicName: '',
                roomId: null
            }
        }
    }

    componentDidMount = async() => {
        const token = sessionStorage.getItem('token');

        try {
            const response = await axios.get('/getClinics', {
                headers: {
                    'Authorization' : 'Bearer ' + token
                }
            });
            if (response) {
                this.setState({clinics: response.data});
            }
        } catch(err) {
            console.log(err);
        }
    }

    inputHandler = (event, type) => {
        let updatedObject = updateObject(this.state.modifyRoom, {
            [type]: event.target.value
        });
        this.setState({modifyRoom: updatedObject});
    }

    selectHandler = (event) => {
        let updatedObject = updateObject(this.state.modifyRoom, {
            clinicName: event.target.value
        });

        this.setState({modifyRoom: updatedObject});
    }

    optionHandler = () => {
        return (
            <Auxiliary>
                {this.state.clinics.map((clinic, i) => {
                    return (
                        <option key={i}>{clinic.name}</option>
                    );
                })}
            </Auxiliary>
        );
    }

    modifyRoom = async(event, room) => {
        event.preventDefault();
        const token = sessionStorage.getItem('token');
        const modRoom = this.state.modifyRoom;
        modRoom.roomId = room.id;
        if (this.state.modifyRoom.number === null) {
            modRoom.number = room.number;
        }
        if (this.state.modifyRoom.clinicName === '') {
            modRoom.clinicName = room.clinic.name;
        }

        try {
            const response = await axios.put('/modifyRoom', modRoom, {
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

    deleteRoom = async(event, room) => {
        event.preventDefault();
        const token = sessionStorage.getItem('token');

        try {
            const response = await axios.put('/deleteRoom', room, {
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
        const { openModal, closeModal, room } = this.props;

        return (
            <Modal open={openModal} onClose={() => closeModal()} className="popupAdd">
                <Modal.Header>Modify room</Modal.Header>
                <Modal.Content image>
                    <Image wrapped size='medium' src='images/room.png' />
                    <Modal.Description>
                        <Header>Change rooms number or move it to another clinic</Header>
                        <p> Room number: </p>
                        <input type="number" defaultValue={room !== null ? room.number : 0} 
                        onChange={(event) => this.inputHandler(event, 'number')} />
                        <p> Choose clinic:</p>
                        <select defaultValue={room !== null ? room.clinic.name : ''} onChange={(event) => this.selectHandler(event)}>
                            {this.optionHandler()}
                        </select>
                    </Modal.Description>
                    {room !== null ? (!room.reserved ? <Button onClick={(event) => this.modifyRoom(event, room)}>Modify</Button> :
                    <Button style={{cursor: 'not-allowed'}}>Modify</Button>) : null}
                    {room !== null ? (!room.reserved ? <Button onClick={(event) => this.deleteRoom(event, room)}>Delete</Button> :
                    <Button style={{cursor: 'not-allowed'}}>Delete</Button>) : null}
                </Modal.Content>
            </Modal>
        );
    }
}

class Room extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            rooms: [],
            searchedRooms: [],
            openModal: false,
            openModalAdd: false,
            choosenRoom: null,
            inputSearch: ''
        }
    }

    componentDidMount = async() => {
        const token = sessionStorage.getItem('token');

        try {
            const response = await axios.get('/getAllRooms', {
                headers: {
                    'Authorization' : 'Bearer ' + token
                }
            });
            if (response) {
                this.setState({rooms: response.data});
            }
        } catch(err) {
            console.log(err);
        }
    }

    closeModalAdd = () => {
        this.setState({openModalAdd: false});
    }

    closeModal = () => {
        this.setState({openModal: false});
    }

    addRoom = (event) => {
        event.preventDefault();
        this.setState({openModalAdd: true});
    }

    pickRoom = (event, room) => {
        event.preventDefault();
        this.setState({openModal: true});
        this.setState({choosenRoom: room});
    }

    inputSearchHandler = (event) => {
        event.preventDefault();
        this.setState({inputSearch: event.target.value});
    }

    searchRooms = (event) => {
        event.preventDefault();
        const oldRooms = this.state.rooms;
        let newRooms = [];
        const searchString = this.state.inputSearch;
        for(let i = 0; i < oldRooms.length; i++) {
            if(oldRooms[i].clinic.name.indexOf(searchString) > -1) {
                newRooms.push(oldRooms[i]);
            }
        }

        this.setState({searchedRooms: newRooms});
    }

    renderRooms() {
        return (
            <Auxiliary>
                <div className="searchDiv">
                    <input type="text" placeholder="Search rooms by clinic names" style={{width: '50%'}} 
                        onChange={(event) => this.inputSearchHandler(event)} /> 
                    <button className="ui primary button" style={{width: '10%'}} onClick={(event) => this.searchRooms(event)}>
                        <i className="search icon" style={{marginRight: '1.5vw'}}>Search</i>
                    </button>
                </div>
                
                <div className="ui link cards" style={{marginTop: '10px', justifyContent: 'center'}}>
                    {this.state.searchedRooms.length === 0 ? this.state.rooms.map((room, i) => {
                        return (
                            <div className="card" key={i} onClick={(event) => this.pickRoom(event, room)}>
                                <div className="image">
                                    <img src="/images/room.png" alt="RoomPicture"/>
                                </div>
                                <div className="content">
                                    <div className="header">Room number {room.number} </div>
                                    <div className="meta">
                                        <label>{room.reserved ? 'Reserved' : 'Free'}</label>
                                    </div>
                                    <div className="description">
                                        Room is in {room.clinic.name}.
                                    </div>
                                </div>
                            </div>
                        );
                    }) :
                    this.state.searchedRooms.map((room, i) => {
                        return (
                            <div className="card" key={i} onClick={(event) => this.pickRoom(event, room)}>
                                <div className="image">
                                    <img src="/images/room.png" alt="RoomPicture"/>
                                </div>
                                <div className="content">
                                    <div className="header">Room number {room.number} </div>
                                    <div className="meta">
                                        <label>{room.reserved ? 'Reserved' : 'Free'}</label>
                                    </div>
                                    <div className="description">
                                        Room is in {room.clinic.name}.
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    <div className="card" style={{boxShadow: 'none', cursor: 'default'}}>
                        <button className="buttonAdd" onClick={(event) => this.addRoom(event)} 
                        data-tooltip="Add room to your feed" data-inverted="">
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
                    {this.renderRooms()}
                    <PopupAdd openModalAdd={this.state.openModalAdd} closeModalAdd={this.closeModalAdd} />
                    <Popup room={this.state.choosenRoom} openModal={this.state.openModal} closeModal={this.closeModal} /> 
            </Auxiliary>
        );
    }
}

export default Room;