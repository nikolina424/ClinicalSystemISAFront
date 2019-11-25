import React, {Component} from 'react';
import classes from './ChangePassword.css';
import {updateObject} from '../../shared/utility';

class ChangePassword extends Component {

    state = {
        auth: {
            old: '',
            new: '',
            newRepeat: ''
        }
    }

    inputChangeHandler = (event, type) => {
        let updatedObject = updateObject(this.state.auth, {
            [type]: event.target.value
        });

        this.setState({auth: updatedObject});
    }

    render() {
        return (
            <div>
                <input type="password" className={classes.Input} 
                    onChange={(event) => this.inputChangeHandler(event, 'old')} />
                <input type="password" className={classes.Input} 
                    onChange={(event) => this.inputChangeHandler(event, 'new')} />
                <input type="password" className={classes.Input} 
                    onChange={(event) => this.inputChangeHandler(event, 'newRepeat')} />
                <button className={classes.Button} 
                    onClick={(event) => {this.loginHandler(event)}}
                >Save</button>
            </div>
        );
    }
}

export default ChangePassword;