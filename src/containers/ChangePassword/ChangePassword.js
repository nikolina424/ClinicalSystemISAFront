import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
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

    changePassHandler = (event) => {
        event.preventDefault();
        this.props.onChangePassword(this.state.auth.old, this.state.auth.new, this.state.auth.newRepeat);
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
                    onChange={(event) => this.inputChangeHandler(event, 'old')} />
                <input type="password" className={classes.Input} 
                    onChange={(event) => this.inputChangeHandler(event, 'new')} />
                <input type="password" className={classes.Input} 
                    onChange={(event) => this.inputChangeHandler(event, 'newRepeat')} />
                <button className={classes.Button} 
                    onClick={(event) => {this.changePassHandler(event)}}
                >Save</button>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onChangePassword: (oldP, newP, repeat) => dispatch(actions.changePassword(oldP, newP, repeat))
    }
}

export default connect(null, mapDispatchToProps)(ChangePassword);