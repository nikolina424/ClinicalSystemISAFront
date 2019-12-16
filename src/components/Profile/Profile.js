import React, {Component} from 'react';
import axios from '../../axios-objects';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import {updateObject} from '../../shared/utility';
import './Profile.css';

class Profile extends Component {

    state = {
        loggedUser: {
            user: null
        },
        profile: {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: null,
            userId: null,
            address: '',
            city: '',
            country: ''
        }
    }

    componentDidMount = async () => {
        const token = sessionStorage.getItem('token');

        try {
            const response = await axios.get('/getUser', {
                headers: {
                    'Authorization' : 'Bearer ' + token
                }
            });
            if (response) {
                const loggedUser = updateObject(this.state.loggedUser, {
                    user: response.data
                });
                this.setState({ loggedUser });
                const profile = updateObject(this.state.profile, {
                    firstName : response.data.firstName,
                    lastName : response.data.lastName,
                    email : response.data.email,
                    phoneNumber : response.data.phoneNumber,
                    userId : response.data.userId,
                    address : response.data.address,
                    city : response.data.city,
                    country : response.data.country
                });
                this.setState({ profile });
            }
        } catch(err) {
            console.log(err);
        }
    }

    inputChangeHandler = (event, type) => {
        let updatedObject = updateObject(this.state.profile, {
            [type]: event.target.value
        });

        this.setState({profile: updatedObject});
    }

    editProfileHandler = async () => {
        const token = sessionStorage.getItem('token');
        const {firstName, lastName, email, phoneNumber, userId, address, city, country} = this.state.profile;
        const data = {
            firstName,
            lastName,
            email,
            phoneNumber,
            userId,
            address,
            city,
            country
        }

        try {
            const response = axios.put('/editUserProfile', data, {
                headers: {
                    'Authorization' : 'Bearer ' + token
                }
            });
            if (response) {
                this.props.history.push('/');
            }
        } catch(err) {
            console.log(err);
        }
    }

    render() {
        return (
            <Auxiliary>
                {this.state.loggedUser.user === null ? <p>Log in first, please.</p> :
                <Auxiliary>
                    <input type="text" defaultValue={this.state.loggedUser.user.firstName}
                        onChange={(event) => this.inputChangeHandler(event, 'firstName')}/>
                    <input type="text" defaultValue={this.state.loggedUser.user.lastName} 
                        onChange={(event) => this.inputChangeHandler(event, 'lastName')}/>
                    <input type="text" defaultValue={this.state.loggedUser.user.email} 
                        onChange={(event) => this.inputChangeHandler(event, 'email')}/>
                    <input type="text" defaultValue={this.state.loggedUser.user.phoneNumber} 
                        onChange={(event) => this.inputChangeHandler(event, 'phoneNumber')}/>
                    <input type="text" defaultValue={this.state.loggedUser.user.userId} 
                        onChange={(event) => this.inputChangeHandler(event, 'userId')}/>
                    <input type="text" defaultValue={this.state.loggedUser.user.city} 
                        onChange={(event) => this.inputChangeHandler(event, 'city')}/>
                    <input type="text" defaultValue={this.state.loggedUser.user.country} 
                        onChange={(event) => this.inputChangeHandler(event, 'country')}/>
                    <button onClick={this.editProfileHandler}>Save changes</button>
                </Auxiliary>
                }
            </Auxiliary>
        );
    }
}

export default Profile;