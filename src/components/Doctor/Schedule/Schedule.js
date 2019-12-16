import React from 'react';
import classes from './Schedule.css';
import Calendar from 'react-calendar';
import {updateObject} from '../../../shared/utility';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';
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
                desc: '',
                duration: null,
                date: ''
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
            date: newDate
        });

        this.setState({examination: updatedObject});
    }

    scheduleExamination = (event) => {
        event.preventDefault();
        const getDataPromise = () => new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.props.scheduleEx(this.state.examination.desc, this.state.examination.date, this.state.examination.duration));
            }, 300);
        });

        const processDataAsycn = async () => {
            let data = await getDataPromise();
            return data;
        };

        processDataAsycn().then((data) => {
            if (this.props.scheduledEx)
                this.setState({openScheduleExamination: false});
        }).catch(err => {
            console.log(err);
        });
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
                    onChange={(event) => {this.inputChangeHandlerEx(event, 'desc')}}
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

const mapStateToProps = (state) => {
    return {
        scheduledSurg: state.schedule.scheduledSurgery === true,
        scheduledEx: state.schedule.scheduledExamination === true
    };
};

const mapDispatchToProps = dispatch => {
    return {
        scheduleSurg: (desc, date, time) => dispatch(actions.addSurgery(desc, date, time)),
        scheduleEx: (desc, date, time) => dispatch(actions.addExamination(desc, date, time))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);