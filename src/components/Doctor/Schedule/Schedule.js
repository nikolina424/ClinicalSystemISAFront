import React from 'react';
import classes from './Schedule.css';
import Calendar from 'react-calendar';
import {updateObject} from '../../../shared/utility';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import axios from '../../../axios-objects';

class Schedule extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            openScheduleSurgery: false,
            openScheduleExamination: false,
            surgery: {
                description: '',
                duration: null,
                dateTime: ''
            },
            examination: {
                description: '',
                duration: null,
                dateTime: ''
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
        const { description, duration, dateTime } = this.state.surgery;
        const surg = {
            description,
            duration,
            dateTime
        };
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
        const { description, duration, dateTime } = this.state.examination;
        const exam = {
            description,
            duration,
            dateTime
        };
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
                    onClick={(event) => this.openScheduleSurgery(event)}>Schedule Surgery</button>
            </Auxiliary>
        );
    }

    renderExaminationButton = () => {
        return (
            <Auxiliary>
                <button className={classes.Button}
                    onClick={(event) => this.openScheduleExamination(event)}>Schedule Examination</button>
            </Auxiliary>
        );
    }

    renderSurgeryDiv = () => {
        return (
            <Auxiliary>
                <input className={classes.Input} type="text" 
                    onChange={(event) => this.inputChangeHandler(event, 'description')}
                    placeholder="Description"/>
                <input className={classes.Input} type="number" 
                    onChange={(event) => this.inputChangeHandler(event, 'duration')}
                    placeholder="Duration in hours"/>
                <Calendar className={classes.Calendar} onChange={this.onChange}/>
                <button className={classes.Button} 
                    onClick={(event) => this.scheduleSurgery(event)}>Done</button>
            </Auxiliary>
        );
    }

    renderExaminationDiv = () => {
        return (
            <Auxiliary>
                <input className={classes.Input} type="text"
                    onChange={(event) => {this.inputChangeHandlerEx(event, 'description')}}
                    placeholder="Description"/>
                <input className={classes.Input} type="number"
                    onChange={(event) => this.inputChangeHandlerEx(event, 'duration')}
                    placeholder="Duration in hours"/>
                <Calendar className={classes.Calendar} onChange={this.onChangeEx}/>
                <button className={classes.Button} 
                    onClick={(event) => this.scheduleExamination(event)}>Done</button>
            </Auxiliary>
        );
    }

    render() {
        return (
            <div>
                {this.renderSurgeryButton()}
                {this.state.openScheduleSurgery ? this.renderSurgeryDiv() : null}
                {this.renderExaminationButton()}
                {this.state.openScheduleExamination ? this.renderExaminationDiv() : null}
            </div>
        );
    }
}

export default Schedule;