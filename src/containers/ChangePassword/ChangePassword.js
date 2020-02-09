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
            },
            validation: false,
            validate: {
                oldPassV: false,
                newPassV: false,
                newRepeatPassV: false
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
        const {oldPassV, newPassV, newRepeatPassV} = this.state.validate;
        let val = {
            oldPassV,
            newPassV,
            newRepeatPassV
        }
        if (pass.oldPass === '')
            val.oldPassV = true;
        if (pass.newPass === '')
            val.newPassV = true;
        if (pass.newRepeatPass === '')
            val.newRepeatPassV = true;
        this.setState({validate: val});

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
            this.setState({validation: true});
            console.log(err);
        }
    }

    inputChangeHandler = (event, type) => {
        let updatedObject = updateObject(this.state.auth, {
            [type]: event.target.value
        });

        this.setState({auth: updatedObject});

        let updatedObject2 = updateObject(this.state.validate, {
            [type] : false
        })

        this.setState({validate: updatedObject2});
    }

    render() {
        return (
            <div className="wrapper fadeInDown">
                <div id="formContent">
                    <form>
                        {this.state.validate.oldPassV ? 
                        <input type="password" className="fadeIn first" name="oldPassword" placeholder="Old password"
                            onChange={(event) => this.inputChangeHandler(event, 'oldPassV')} style={{borderColor: 'red'}} /> :
                        <input type="password" className="fadeIn first" name="oldPassword" placeholder="Old password"
                            onChange={(event) => this.inputChangeHandler(event, 'oldPass')}/>}

                        {this.state.validate.newPassV ? 
                        <input type="password" className="fadeIn second" name="newPassword" placeholder="New password"
                            onChange={(event) => this.inputChangeHandler(event, 'newPassV')} style={{borderColor: 'red'}} /> :
                        <input type="password" className="fadeIn second" name="newPassword" placeholder="New password"
                            onChange={(event) => this.inputChangeHandler(event, 'newPass')}/>}

                        {this.state.validate.newRepeatPassV ?
                        <input type="password" className="fadeIn third" name="repeatPassword" placeholder="Repeat new password"
                            onChange={(event) => this.inputChangeHandler(event, 'newRepeatPassV')} style={{borderColor: 'red'}} /> :
                        <input type="password" className="fadeIn third" name="repeatPassword" placeholder="Repeat new password"
                            onChange={(event) => this.inputChangeHandler(event, 'newRepeatPass')}/>}

                        <input type="submit" className="fadeIn fourth" value="Change password" style={{cursor: 'pointer'}}
                            onClick={(event) => this.changePassHandler(event)} />
                    </form>
                    <div id="formFooter">
                        {this.state.validation ? <p style={{color: 'red'}} >Invalide input values!</p> : null}
                        <a>Change your password for security reasons!</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChangePassword;