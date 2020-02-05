import React from 'react';
import classes from './Schedule.css';
import Calendar from 'react-calendar';
import {updateObject} from '../../../shared/utility';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import axios from '../../../axios-objects';
import Navigation from '../../../containers/Navigation/Navigation';

class Schedule extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            openScheduleSurgery: false,
            openScheduleExamination: false,
            doctors: [],
            rooms: [],
            surgery: {
                description: '',
                duration: null,
                dateTime: '',
                price: null,
                doctor: null,
                room: null
            },
            examination: {
                description: '',
                duration: null,
                dateTime: '',
                price: null,
                doctor: null,
                room: null
            }
        }
    }

    componentDidMount = async() => {
        const token = sessionStorage.getItem('token');

        if (sessionStorage.getItem('role') === 'ADMINC') {
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

            try {
                const response = await axios.get('/getClinicRooms', {
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
        } else if (sessionStorage.getItem('role') === 'DOCTOR') {
            try {
                const response = await axios.get('/getClinicRoomsFromDoctor', {
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
    }

    formatDate = (string) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return new Date(string).toLocaleDateString([],options);
    }

    openScheduleSurgery = (event) => {
        event.preventDefault();
        this.setState((prevState) => ({openScheduleSurgery: !prevState.openScheduleSurgery}));
    }

    selectChangeHandler = (event, type) => {
        let newDoc = null;
        let newRoom = null;

        if (type === 'doctor') {
            for(let i = 0; i < this.state.doctors.length; i++) {
                if (this.state.doctors[i].firstName.concat(' ').concat(this.state.doctors[i].lastName) === event.target.value) {
                    newDoc = this.state.doctors[i];
                    break;
                }
            }
        } else if (type === 'room') {
            for(let i = 0; i < this.state.rooms.length; i++) {
                if (this.state.rooms[i].number.toString() === event.target.value.split(" ")[1]) {
                    newRoom = this.state.rooms[i];
                    break;
                }
            }
        }

        if (type === 'doctor') {
            let updatedObject = updateObject(this.state.surgery, {
                doctor: newDoc
            });
    
            this.setState({surgery: updatedObject});
        }

        if (type === 'room') {
            let updatedObject2 = updateObject(this.state.surgery, {
                room: newRoom
            });
    
            this.setState({surgery: updatedObject2});
        }
    }

    inputChangeHandler = (event, type) => {
        let updatedObject = updateObject(this.state.surgery, {
            [type]: event.target.value
        });

        this.setState({surgery: updatedObject});
    }

    onChange = date => {
        const splitDate = this.formatDate(date).split("/");
        const newDate = splitDate[2] + "-" + splitDate[0] + "-" + splitDate[1];
        let updatedObject = updateObject(this.state.surgery, {
            dateTime: newDate
        });

        this.setState({surgery: updatedObject});
    }

    scheduleSurgery = async (event) => {
        event.preventDefault();
        const { description, duration, dateTime, price, doctor, room } = this.state.surgery;
        const surg = {
            description,
            duration,
            dateTime,
            price,
            doctor,
            room
        };
        if (surg.doctor === null) {
            surg.doctor = this.state.doctors[0];
        }
        if (surg.room === null) {
            surg.room = this.state.rooms[0];
        }
        const token = sessionStorage.getItem('token');

        try {
            const response = await axios.post('/scheduleSurgery', surg, {
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

    openScheduleExamination = (event) => {
       event.preventDefault();
       this.setState((prevState) => ({openScheduleExamination: !prevState.openScheduleExamination}));
    }

    inputChangeHandlerEx = (event, type) => {
        let updatedObject = updateObject(this.state.examination, {
            [type]: event.target.value
        });

        this.setState({examination: updatedObject});
    }

    selectChangeHandlerEx = (event, type) => {
        let newDoc = null;
        let newRoom = null;

        if (type === 'doctor') {
            for(let i = 0; i < this.state.doctors.length; i++) {
                if (this.state.doctors[i].firstName.concat(' ').concat(this.state.doctors[i].lastName) === event.target.value) {
                    newDoc = this.state.doctors[i];
                    break;
                }
            }
        } else if (type === 'room') {
            for(let i = 0; i < this.state.rooms.length; i++) {
                if (this.state.rooms[i].number.toString() === event.target.value.split(" ")[1]) {
                    newRoom = this.state.rooms[i];
                    break;
                }
            }
        }

        if (type === 'doctor') {
            let updatedObject = updateObject(this.state.examination, {
                doctor: newDoc
            });
    
            this.setState({examination: updatedObject});
        }

        if (type === 'room') {
            let updatedObject2 = updateObject(this.state.examination, {
                room: newRoom
            });
    
            this.setState({examination: updatedObject2});
        }
    }

    onChangeEx = date => {
        const splitDate = this.formatDate(date).split("/");
        const newDate = splitDate[2] + "-" + splitDate[0] + "-" + splitDate[1];
        let updatedObject = updateObject(this.state.examination, {
            dateTime: newDate
        });
        this.setState({examination: updatedObject});
    }

    scheduleExamination = async(event) => {
        event.preventDefault();
        const { description, duration, dateTime, price, doctor, room } = this.state.examination;
        const exam = {
            description,
            duration,
            dateTime,
            price,
            doctor,
            room
        };
        if (exam.doctor === null) {
            exam.doctor = this.state.doctors[0];
        }
        if (exam.room === null) {
            exam.room = this.state.rooms[0];
        }
        const token = sessionStorage.getItem('token');

        try {
            const response = await axios.post('/scheduleExamination', exam, {
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

    renderSurgeryButton = () => {
        return (
            <Auxiliary>
                <button className={classes.Button}
                    onClick={(event) => this.openScheduleSurgery(event)}>Surgery</button>
            </Auxiliary>
        );
    }

    renderExaminationButton = () => {
        return (
            <Auxiliary>
                <button className={classes.Button}
                    onClick={(event) => this.openScheduleExamination(event)}>Examination</button>
            </Auxiliary>
        );
    }

    renderSurgeryDiv = () => {
        return (
            <Auxiliary>
                <div className="mainDiv">
                    <input className={classes.Input} type="text" style={{width: '30%'}}
                        onChange={(event) => this.inputChangeHandler(event, 'description')}
                        placeholder="Description of surgery"/>
                    <input className={classes.Input} type="number" style={{display: 'block', margin: 'auto', justifyContent: 'center'}}
                        onChange={(event) => this.inputChangeHandler(event, 'duration')}
                        placeholder="Duration in hours"/>
                    <input className={classes.Input} type="number" style={{display: 'block', margin: '10px auto', justifyContent: 'center'}}
                        onChange={(event) => this.inputChangeHandler(event, 'price')}
                        placeholder="Price in euros"/>
                    {this.state.doctors.length !== 0 ? 
                    <Auxiliary>
                        <p>Doctor: </p>
                        <select onChange={(event) => this.selectChangeHandler(event, 'doctor')}>
                            {this.state.doctors.map((doc, i) => {
                                return (
                                    <option key={i}>
                                        {doc.firstName} {doc.lastName}
                                    </option>
                                );
                            })}
                        </select>
                    </Auxiliary>
                     : null}
                     <p>Available room: </p>
                    <select onChange={(event) => this.selectChangeHandler(event, 'room')}>
                        {this.state.rooms.map((room, i) => {
                            return (
                                <option key={i}>
                                    Room {room.number}
                                </option>
                            );
                        })}
                    </select>
                    <div style={{margin: '10px auto', display: 'table'}}>
                        <Calendar className={classes.Calendar} onChange={this.onChange} />
                    </div>
                    <button className={classes.Button} 
                        onClick={(event) => this.scheduleSurgery(event)}>Schedule Surgery</button>
                </div>
            </Auxiliary>
        );
    }

    renderExaminationDiv = () => {
        return (
            <Auxiliary>
                <div className="mainDiv">
                    <input className={classes.Input} type="text" style={{width: '30%'}}
                        onChange={(event) => {this.inputChangeHandlerEx(event, 'description')}}
                        placeholder="Description of examination"/>
                    <input className={classes.Input} type="number" style={{display: 'block', margin: 'auto', justifyContent: 'center'}}
                        onChange={(event) => this.inputChangeHandlerEx(event, 'duration')}
                        placeholder="Duration in hours"/>
                    <input className={classes.Input} type="number" style={{display: 'block', margin: '10px auto', justifyContent: 'center'}}
                        onChange={(event) => this.inputChangeHandlerEx(event, 'price')}
                        placeholder="Price in euros"/>
                    {this.state.doctors.length !== 0 ? 
                    <Auxiliary>
                        <p>Doctor: </p>
                        <select onChange={(event) => this.selectChangeHandlerEx(event, 'doctor')}>
                            {this.state.doctors.map((doc, i) => {
                                return (
                                    <option key={i}>
                                        {doc.firstName} {doc.lastName}
                                    </option>
                                );
                            })}
                        </select>
                    </Auxiliary>
                     : null}
                     <p>Available room: </p>
                    <select onChange={(event) => this.selectChangeHandlerEx(event, 'room')}>
                        {this.state.rooms.map((room, i) => {
                            return (
                                <option key={i}>
                                    Room {room.number}
                                </option>
                            );
                        })}
                    </select>
                    <div style={{margin: '10px auto', display: 'table'}}>
                        <Calendar className={classes.Calendar} onChange={this.onChangeEx}/>
                    </div>
                    <button className={classes.Button} 
                        onClick={(event) => this.scheduleExamination(event)}>Schedule Examination</button>
                </div>
            </Auxiliary>
        );
    }

    render() {
        return (
            <div>
                <Navigation />
                <div className="mainDiv">
                    {this.renderSurgeryButton()}
                    {this.state.openScheduleSurgery ? this.renderSurgeryDiv() : null}
                    {this.renderExaminationButton()}
                    {this.state.openScheduleExamination ? this.renderExaminationDiv() : null}
                </div>
            </div>
        );
    }
}

export default Schedule;