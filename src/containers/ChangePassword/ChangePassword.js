import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import './ChangePassword.css';
import {updateObject} from '../../shared/utility';
import axios from '../../axios-objects';

class ChangePassword extends Component {

    state = {
        auth: {
            oldPass: '',
            newPass: '',
            newRepeatPass: ''
        }
    }

    changePassHandler = async (event) => {
        event.preventDefault();
        const {oldPass, newPass, newRepeatPass} = this.state.auth;
        const pass = {
            oldPass, 
            newPass,
            newRepeatPass
        };
        const token = sessionStorage.getItem('token');

        try {
            const response = await axios.put('/changePassword', pass, {
                headers: {
                    'Authorization' : 'Bearer ' + token
                }
            });
            if (response) {
                this.props.history.push('/');
                sessionStorage.setItem('firstTimeLogged', false);
            }
                
        } catch(err) {
            console.log(err);
        }
        // this.props.onChangePassword(this.state.auth.oldPass, this.state.auth.newPass, this.state.auth.newRepeatPass);
        // this.props.history.push('/');
    }

    inputChangeHandler = (event, type) => {
        let updatedObject = updateObject(this.state.auth, {
            [type]: event.target.value
        });

        this.setState({auth: updatedObject});
    }

    render() {
        return (
            <div className="wrapper fadeInDown">
                <div id="formContent">
                    <form>
                        <input type="password" className="fadeIn first" name="oldPassword" placeholder="Old password"
                            onChange={(event) => this.inputChangeHandler(event, 'oldPass')}/>
                        <input type="password" className="fadeIn second" name="newPassword" placeholder="New password"
                            onChange={(event) => this.inputChangeHandler(event, 'newPass')}/>
                        <input type="password" className="fadeIn third" name="repeatPassword" placeholder="Repeat new password"
                            onChange={(event) => this.inputChangeHandler(event, 'newRepeatPass')}/>
                        <input type="submit" className="fadeIn fourth" value="Change password" style={{cursor: 'pointer'}}
                            onClick={(event) => this.changePassHandler(event)} />
                    </form>
                    <div id="formFooter">
                        <a>Change your password for security reasons!</a>
                    </div>
                </div>
            </div>

            // <div>
            //     <input type="password" className={classes.Input} 
            //         onChange={(event) => this.inputChangeHandler(event, 'oldPass')} />
            //     <input type="password" className={classes.Input} 
            //         onChange={(event) => this.inputChangeHandler(event, 'newPass')} />
            //     <input type="password" className={classes.Input} 
            //         onChange={(event) => this.inputChangeHandler(event, 'newRepeatPass')} />
            //     <button className={classes.Button} 
            //         onClick={(event) => {this.changePassHandler(event)}}
            //     >Save</button>
            // </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onChangePassword: (oldPass, newPass, newRepeatPass) => dispatch(actions.changePassword(oldPass, newPass, newRepeatPass))
    }
}

export default connect(null, mapDispatchToProps)(ChangePassword);