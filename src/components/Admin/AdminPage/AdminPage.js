import React from 'react';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Navigation from '../../../containers/Navigation/Navigation';
import axios from '../../../axios-objects';
import {updateObject} from '../../../shared/utility';

class AdminPage extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            loggedUser: {
                user: null
            },
            ccadmins: [],
            openList: false,
            newAdmin: {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                address: '',
                city: '',
                country: '',
                phoneNumber: null,
                userId: null
            }
        }
    }

    componentDidMount = async() => {
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
            }
        } catch(err) {
            console.log(err);
        }

        try {
            const response = await axios.get('/getClinicCenterAdmins', {
                headers: {
                    'Authorization' : 'Bearer ' + token
                }
            });
            if (response) {
                this.setState({ccadmins: response.data});
            }
        } catch(err) {
            console.log(err);
        }
    }

    inputChangeHandler = (event, type) => {
        let newAdmin = updateObject(this.state.newAdmin, {
            [type]: event.target.value
        });

        this.setState({ newAdmin });
    }

    showFormHandler = (event) => {
        event.preventDefault();
        this.setState((prevState) => ({openList: !prevState.openList}));
    }

    addNewClinicCenterAdmin = async (event) => {
        event.preventDefault();
        const token = sessionStorage.getItem('token');
        const {firstName, lastName, email, password, address, city, country, phoneNumber, userId} = this.state.newAdmin;
        const admin = {
            firstName,
            lastName,
            email,
            password,
            repeatPassword: password,
            address,
            city,
            country,
            phoneNumber,
            userId,
            role: 'ADMINCC'
        }
        if (this.state.loggedUser.user.role === 'ADMINCC' && this.state.loggedUser.user.predefined) {
            try {
                const response = await axios.post('/addNewClinicCenterAdmin', admin, {
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
                <Navigation />
                <div>
                    <p>Number of clinic center admins: {this.state.ccadmins.length} </p>
                    {this.state.ccadmins.map((ad, i) => {
                        return (
                            <div key={i}>
                                <div className="ui card">
                                    <div className="image">
                                        {ad.image !== null ? <img src={'images/' + ad.image} alt="slika" style={{width: '40px', height: '40px'}}/> : null }
                                    </div>
                                    <div className="content">
                                        <p className="header">{ad.firstName} {ad.lastName}</p>
                                        <div className="meta">
                                        <span className="date">Joined in 2020</span>
                                        </div>
                                        <div className="description">
                                            {ad.phoneNumber}
                                        </div>
                                    </div>
                                    <div className="extra content">
                                        {ad.id === this.state.loggedUser.user.id ? <a href="/profile">
                                        <i className="user icon"></i>
                                            See your profile
                                        </a> : null }
                                    </div>
                                    </div>
                            </div>
                        );
                    })}
                    <button onClick={(event) => this.showFormHandler(event)}>Add new Clinic Center Admin</button>
                    {this.state.openList ? 
                        <Auxiliary>
                            {(this.state.loggedUser.user.role === 'ADMINCC' && this.state.loggedUser.user.predefined) ?
                            <Auxiliary>
                                <input type="text" placeholder="First Name" onChange={(event) => this.inputChangeHandler(event, 'firstName')}/> 
                                <input type="text" placeholder="Last Name" onChange={(event) => this.inputChangeHandler(event, 'lastName')}/>
                                <input type="text" placeholder="Email" onChange={(event) => this.inputChangeHandler(event, 'email')}/> 
                                <input type="password" placeholder="Password" onChange={(event) => this.inputChangeHandler(event, 'password')}/> 
                                <input type="text" placeholder="Address" onChange={(event) => this.inputChangeHandler(event, 'address')}/> 
                                <input type="text" placeholder="City" onChange={(event) => this.inputChangeHandler(event, 'city')}/>
                                <input type="text" placeholder="Country" onChange={(event) => this.inputChangeHandler(event, 'country')}/>  
                                <input type="number" placeholder="Phone Number" onChange={(event) => this.inputChangeHandler(event, 'phoneNumber')}/>
                                <input type="number" placeholder="User ID" onChange={(event) => this.inputChangeHandler(event, 'userId')}/>  
                                <button onClick={(event) => this.addNewClinicCenterAdmin(event)}>Add</button>
                            </Auxiliary>
                            : null }
                        </Auxiliary>
                    : null}
                </div>
            </Auxiliary>
        );
    }
}

export default AdminPage;