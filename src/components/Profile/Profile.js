import React, {Component} from 'react';
import classes from './Profile.css';
import Calendar from 'react-calendar';
import {updateObject} from '../../shared/utility';

class Profile extends Component {

    state = {
        surgery: {
            desc: '',
            duration: null,
            date: ''
        }
    }

    componentDidUpdate() {
        console.log(this.state.surgery);
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
                <button className={classes.Button}>Schedule surgery</button>
            </div>
        );
    }

}

export default Profile;