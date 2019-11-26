import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import classes from './ChangePassword.css';
import {updateObject} from '../../shared/utility';

class ChangePassword extends Component {

    state = {
        auth: {
            oldPass: '',
            newPass: '',
            newRepeatPass: ''
        }
    }

    changePassHandler = (event) => {
        event.preventDefault();
        this.props.onChangePassword(this.state.auth.oldPass, this.state.auth.newPass, this.state.auth.newRepeatPass);
        this.props.history.push('/');
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
                    onChange={(event) => this.inputChangeHandler(event, 'oldPass')} />
                <input type="password" className={classes.Input} 
                    onChange={(event) => this.inputChangeHandler(event, 'newPass')} />
                <input type="password" className={classes.Input} 
                    onChange={(event) => this.inputChangeHandler(event, 'newRepeatPass')} />
                <button className={classes.Button} 
                    onClick={(event) => {this.changePassHandler(event)}}
                >Save</button>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onChangePassword: (oldPass, newPass, newRepeatPass) => dispatch(actions.changePassword(oldPass, newPass, newRepeatPass))
    }
}

export default connect(null, mapDispatchToProps)(ChangePassword);