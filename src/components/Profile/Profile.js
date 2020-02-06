import React from 'react';
import axios from '../../axios-objects';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import {updateObject} from '../../shared/utility';
import './Profile.css';
import Navigation from '../../containers/Navigation/Navigation';

class Profile extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            showPasswordDiv: false,
            pass: {
                oldPass: '',
                newPass: '',
                newRepeatPass: ''
            },
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
                country: '',
                image: null
            }
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

    showPassword = (event) => {
        event.preventDefault();
        this.setState((prevState) => ({showPasswordDiv: !prevState.showPasswordDiv}));
    }

    inputChangeHandler = (event, type) => {
        let updatedObject = updateObject(this.state.profile, {
            [type]: event.target.value
        });

        this.setState({profile: updatedObject});
    }

    inputPasswordHandler = (event, type) => {
        let updatedObject = updateObject(this.state.pass, {
            [type]: event.target.value
        });

        this.setState({pass: updatedObject});
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

    imageHandler = async (event) => {
        const token = sessionStorage.getItem('token');
        const file = event.target.files[0];
        let formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('/addImageToUser', formData, {
                headers: {
                    'Authorization' : 'Bearer ' + token,
                    'content-type' : 'multipart/form-data'
                }
            });
            if (response) {
                const profile = updateObject(this.state.profile, {
                    image: response.data.image
                });
                this.setState({profile});
                const loggedUser = updateObject(this.state.loggedUser, {
                    user: response.data
                });
                this.setState({loggedUser});
            }
        } catch(err) {
            console.log(err);
        }
    }

    changePassword = async(event) => {
        event.preventDefault();
        const token = sessionStorage.getItem('token');
        const {oldPass, newPass, newRepeatPass} = this.state.pass;
        const data = {
            oldPass,
            newPass,
            newRepeatPass
        }

        if(this.state.loggedUser.user.role === 'ADMINCC' || this.state.loggedUser.user === 'ADMINC') {
            try {
                const response = await axios.put('/changeAdminPassword', data, {
                    headers: {
                        'Authorization' : 'Bearer ' + token 
                    }
                });
                if (response) {
                    window.location.reload();
                }
            } catch(err) {
                console.log(err);
            }
        }
    }

    render() {
        return (
            <Auxiliary>
                {this.state.loggedUser.user === null ? <p>Log in first, please.</p> :
                <Auxiliary>
                    <Navigation />
                    <div className="container bootstrap snippet">
                        <div className="row">
                        <div className="col-sm-10" style={{marginTop: '30px', marginBottom: '30px'}}><h1>{this.state.loggedUser.user.firstName} {this.state.loggedUser.user.lastName}</h1></div>
                        </div>
                        <div className="row">
                            <div className="col-sm-3">
                                <div className="text-center" style={{marginLeft: '27px', marginBottom: '30px'}}>
                                    <img src={'images/' + this.state.loggedUser.user.image} className="avatar img-circle img-thumbnail" alt="Profile" />
                                    <h6>Upload a different photo</h6>
                                    <input type="file" className="text-center center-block file-upload" style={{width: '90px'}}
                                    onChange={(event) => this.imageHandler(event)} name="file"/>
                                </div>
                            </div>
                        </div>  
                            <div className="tab-content">
                                <div className="tab-pane active" id="home">
                                    
                                    <form className="form" action="##" method="post" id="registrationForm">
                                        <div className="form-group">
                                            
                                            <div className="col-xs-6">
                                                <label htmlFor="first_name" style={{width: '115px'}}><h4>First name</h4></label>
                                                <input type="text" style={{width: '980px'}} defaultValue={this.state.loggedUser.user.firstName}
                                                 onChange={(event) => this.inputChangeHandler(event, 'firstName')}/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            
                                            <div className="col-xs-6">
                                                <label htmlFor="last_name" style={{width: '115px'}}><h4>Last name</h4></label>
                                                <input type="text" style={{width: '980px'}} defaultValue={this.state.loggedUser.user.lastName} 
                                                 onChange={(event) => this.inputChangeHandler(event, 'lastName')}/>
                                            </div>
                                        </div>
                            
                                        <div className="form-group">
                                            
                                            <div className="col-xs-6">
                                                <label htmlFor="phone" style={{width: '115px'}}><h4>Phone</h4></label>
                                                <input type="text" style={{width: '980px'}} defaultValue={'+381' + this.state.loggedUser.user.phoneNumber} 
                                                 onChange={(event) => this.inputChangeHandler(event, 'phoneNumber')}/>
                                            </div>
                                        </div>
                            
                                        <div className="form-group">
                                            <div className="col-xs-6">
                                                <label htmlFor="country" style={{width: '115px'}}><h4>Country</h4></label>
                                                <input type="text" style={{width: '980px'}} defaultValue={this.state.loggedUser.user.country} 
                                                 onChange={(event) => this.inputChangeHandler(event, 'country')}/>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <div className="col-xs-6">
                                                <label htmlFor="city" style={{width: '115px'}}><h4>City</h4></label>
                                                <input type="text" style={{width: '980px'}} defaultValue={this.state.loggedUser.user.city} 
                                                 onChange={(event) => this.inputChangeHandler(event, 'city')}/>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <div className="col-xs-6">
                                                <label htmlFor="email" style={{width: '115px'}}><h4>Email</h4></label>
                                                <input type="text" style={{width: '980px'}} defaultValue={this.state.loggedUser.user.email} 
                                                 onChange={(event) => this.inputChangeHandler(event, 'email')}/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="col-xs-6">
                                                <label htmlFor="jmbg" style={{width: '115px'}}><h4>User ID</h4></label>
                                                <input type="text" style={{width: '980px'}} defaultValue={this.state.loggedUser.user.userId} 
                                                 onChange={(event) => this.inputChangeHandler(event, 'userId')}/>
                                            </div>
                                        </div>
                                        {(this.state.loggedUser.user.role === 'ADMINC' || this.state.loggedUser.user.role === 'ADMINCC') ?
                                        <Auxiliary>
                                            <button className="btn btn-lg btn-success" onClick={(event) => this.showPassword(event)}>
                                                <i className="glyphicon glyphicon-ok-sign"></i> Change password
                                            </button>
                                            {this.state.showPasswordDiv ? 
                                                <Auxiliary> 
                                                    <div className="form-group">
                                                        <div className="col-xs-6">
                                                            <label htmlFor="oldPassword" style={{width: '115px'}}></label>
                                                            <input type="password" style={{width: '980px'}} placeholder="Old password"
                                                            onChange={(event) => this.inputPasswordHandler(event, 'oldPass')}/>
                                                            <label htmlFor="password" style={{width: '115px'}}></label>
                                                            <input type="password" style={{width: '980px'}} placeholder="New password"
                                                            onChange={(event) => this.inputPasswordHandler(event, 'newPass')}/>
                                                            <label htmlFor="repeatPassword" style={{width: '115px'}}></label>
                                                            <input type="password" style={{width: '980px'}} placeholder="Repeat password"
                                                            onChange={(event) => this.inputPasswordHandler(event, 'newRepeatPass')}/>
                                                        </div>
                                                    </div>
                                                    <button className="btn btn-lg btn-success" onClick={(event) => this.changePassword(event)}>
                                                        <i className="glyphicon glyphicon-ok-sign"></i> Save password
                                                    </button>
                                                </Auxiliary> : null }
                                        </Auxiliary> : null}
                                        <div className="form-group">
                                            <div className="col-xs-12">
                                                    <br></br>
                                            </div>
                                        </div>
                                    </form>
                                    <button className="btn btn-lg btn-success" onClick={this.editProfileHandler}><i className="glyphicon glyphicon-ok-sign"></i> Save</button>
                                </div>
                            </div>
                        </div>
                    </Auxiliary>
                }
            </Auxiliary>
        );
    }
}

export default Profile;