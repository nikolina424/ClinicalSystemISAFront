import React from 'react';
import './ChangePassword.css';
import {updateObject} from '../../shared/utility';
import axios from '../../axios-objects';

class ChangePassword extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            auth: {
                oldPass: '',
                newPass: '',
                newRepeatPass: ''
            }
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
        );
    }
}

export default ChangePassword;