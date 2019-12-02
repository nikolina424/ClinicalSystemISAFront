import React, {Component} from 'react';
import classes from './Profile.css';
import Calendar from 'react-calendar';
import {updateObject} from '../../shared/utility';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import {Redirect} from 'react-router-dom';

class Profile extends Component {

    state = {
        surgery: {
            desc: '',
            duration: null,
            date: ''
        }
    }

    formatDate = (string) => {
        var options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return new Date(string).toLocaleDateString([],options);
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
            date: newDate
        });

        this.setState({surgery: updatedObject});
    }

    scheduleSurgery = (event) => {
        event.preventDefault();
        const getDataPromise = () => new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.props.schedule(this.state.surgery.desc, this.state.surgery.date, this.state.surgery.duration));
            }, 300);
        });

        const processDataAsycn = async () => {
            let data = await getDataPromise();
            return data;
        };

        processDataAsycn().then((data) => {
            if (this.props.scheduled)
                this.props.history.push("/");
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        return (
            <div>
                <input className={classes.Input} type="text" 
                    onChange={(event) => this.inputChangeHandler(event, 'desc')}
                    placeholder="Description"/>
                <input className={classes.Input} type="number" 
                    onChange={(event) => this.inputChangeHandler(event, 'duration')}
                    placeholder="Durations in hours"/>
                <Calendar className={classes.Calendar} onChange={this.onChange}/>
                <button className={classes.Button} 
                    onClick={(event) => this.scheduleSurgery(event)}>Schedule surgery</button>
                {!this.props.schedule ? <Redirect to="/" /> : null}
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        scheduled: state.schedule.scheduledSurgery == false
    };
};

const mapDispatchToProps = dispatch => {
    return {
        schedule: (desc, date, time) => dispatch(actions.addSurgery(desc, date, time))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);