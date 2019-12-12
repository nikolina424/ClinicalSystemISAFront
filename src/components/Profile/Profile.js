import React, {Component} from 'react';
import axios from '../../axios-objects';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import {updateObject} from '../../shared/utility';

class Profile extends Component {

    state = {
        profile: {
            user: null,
            firstName: '',
            lastName: ''
        }
    }

    componentDidMount() {
        const token = sessionStorage.getItem('token');
        axios.get('/getUser', {
            headers: {
                'Authorization' : 'Bearer ' + token
            }
        }).then(response => {
            const updatedObject = updateObject(this.state.profile, {
                user: response.data
            });
            this.setState({profile : updatedObject});
        }).catch(err => {
            console.log(err);
        });
    }

    inputChangeHandler = (event, type) => {
        let updatedObject = updateObject(this.state.profile, {
            [type]: event.target.value
        });

        this.setState({auth: updatedObject});
    }

    editProfileHandler = () => {
        const token = sessionStorage.getItem('token');
        const data = {
            firstName: this.state.profile.firstName,
            lastName: this.state.profile.lastName
        }

        axios.put('/editUserProfile', data, {
            headers: {
                'Authorization' : 'Bearer ' + token
            }
        }).then(response => {
            console.log(response);
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        return (
            <Auxiliary>
                {this.state.profile.user === null ? <p>Log in first, please.</p> :
                <Auxiliary>
                    <input type="text" value={this.state.profile.user.firstName} 
                        onChange={(event) => this.inputChangeHandler(event, 'firstName')}/>
                    <input type="text" value={this.state.profile.user.lastName} 
                        onChange={(event) => this.inputChangeHandler(event, 'lastName')}/>
                    <button onClick={this.editProfileHandler}>Save changes</button>
                </Auxiliary>
                }
            </Auxiliary>
        );
    }
}

export default Profile;