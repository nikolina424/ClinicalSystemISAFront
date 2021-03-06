import React from 'react';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Navigation from '../../../containers/Navigation/Navigation';
import axios from '../../../axios-objects';
import {updateObject} from '../../../shared/utility';
import '../../../bootstrap/bootstrap.css'

class AdminPage extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            loggedUser: {
                user: null
            },
            ccadmins: [],
            requests: [],
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

        try {
            const response = await axios.get('/getRequests', {
                headers: {
                    'Authorization' : 'Bearer ' + token
                }
            });
            this.setState({requests: response.data});
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

    approveHandler = async (event, req) => {
        event.preventDefault();
        const token = sessionStorage.getItem('token');

        if (this.state.loggedUser.user.role === 'ADMINCC') {
            try {
                let newRequests = [...this.state.requests];
                for (let i = 0; i < newRequests.length; i++)
                    if (newRequests[i].id === req.id)
                        newRequests[i].pending = true;
                
                this.setState({requests: newRequests});

                const response = await axios.post('/approveRegistration', req, {
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
    
    declineHandler = async (event, req) => {
        event.preventDefault();
        const token = sessionStorage.getItem('token');

        if (this.state.loggedUser.user.role === 'ADMINCC') {
            try {
                let newRequests = [...this.state.requests];
                for (let i = 0; i < newRequests.length; i++)
                    if (newRequests[i].id === req.id)
                        newRequests[i].pending = true;
                
                this.setState({requests: newRequests});
                const response = await axios.put('/declineRegistration', req, {
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

    approveExamination = async(event, req) => {
        event.preventDefault();
        const token = sessionStorage.getItem('token');

        try {
            let newRequests = [...this.state.requests];
                for (let i = 0; i < newRequests.length; i++)
                    if (newRequests[i].id === req.id)
                        newRequests[i].pending = true;
                
            this.setState({requests: newRequests});
            const response = await axios.post('/approveExamination', req, {
                headers: {
                    'Authorization' : 'Bearer ' + token
                }
            });
            if(response) {
                window.location.reload();
            }
        } catch(err) {
            console.log(err);
        }
    }

    approveOperation = async(event, req) => {
        event.preventDefault();
        const token = sessionStorage.getItem('token');

        try {
            let newRequests = [...this.state.requests];
                for (let i = 0; i < newRequests.length; i++)
                    if (newRequests[i].id === req.id)
                        newRequests[i].pending = true;
                
            this.setState({requests: newRequests});
            const response = await axios.post('/approveOperation', req, {
                headers: {
                    'Authorization' : 'Bearer ' + token
                }
            });
            if(response) {
                window.location.reload();
            }
        } catch(err) {
            console.log(err);
        }
    }

    declineOperation = async(event, req) => {
        event.preventDefault();
        const token = sessionStorage.getItem('token');

        try {
            let newRequests = [...this.state.requests];
                for (let i = 0; i < newRequests.length; i++)
                    if (newRequests[i].id === req.id)
                        newRequests[i].pending = true;
                
            this.setState({requests: newRequests});
            const response = await axios.put('/declineOperation', req, {
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

    declineExamination = async(event, req) => {
        event.preventDefault();
        const token = sessionStorage.getItem('token');

        try {
            let newRequests = [...this.state.requests];
                for (let i = 0; i < newRequests.length; i++)
                    if (newRequests[i].id === req.id)
                        newRequests[i].pending = true;
                
            this.setState({requests: newRequests});
            const response = await axios.put('/declineExamination', req, {
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

    approveHoliday = async (event, req) => {
        event.preventDefault();
        const token = sessionStorage.getItem('token');

        try {
            const response = await axios.post('/approveHoliday', req, {
                headers: {
                    'Authorization' : 'Bearer ' + token
                }
            });
            if(response) {
                window.location.reload();
            }
        } catch(err) {
            console.log(err);
        }
    }

    declineHoliday = async (event, req) => {
        event.preventDefault();
        const token = sessionStorage.getItem('token');

        try {
            const response = await axios.put('/declineHoliday', req, {
                headers: {
                    'Authorization' : 'Bearer ' + token
                }
            });
            if(response) {
                window.location.reload();
            }
        } catch(err) {
            console.log(err);
        }
    }

    deleteAdmin = async(event, ad) => {
        event.preventDefault();
        const token = sessionStorage.getItem('token');

        try {
            const response = await axios.put('/deleteUser', ad, {
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

    renderApproveDeclineButtons = (req) => {
        return (
            <Auxiliary>
                {req.pending ? 
                <Auxiliary>
                    <button className="ui basic yellow button" style={{cursor: 'no-drop'}}>Approve</button>
                    <button className="ui basic yellow button"style={{cursor: 'no-drop'}}>Decline</button>
                </Auxiliary>
                     :
                <Auxiliary> 
                    {req.role === "REGISTRATION" ? 
                        <Auxiliary>
                            <button className="ui basic green button" onClick={(event) => this.approveHandler(event, req)}>Approve</button>
                            <button className="ui basic red button" onClick={(event) => this.declineHandler(event, req)}>Decline</button>
                        </Auxiliary>
                    : req.role === "HOLIDAY" ? 
                        <Auxiliary>
                            <button className="ui basic green button" onClick={(event) => this.approveHoliday(event, req)}>Approve</button>
                            <button className="ui basic red button" onClick={(event) => this.declineHoliday(event, req)}>Decline</button>
                        </Auxiliary>
                    : req.role === "EXAMINATION" ?
                        <Auxiliary>
                            <button className="ui basic green button" onClick={(event) => this.approveExamination(event, req)}>Approve</button>
                            <button className="ui basic red button" onClick={(event) => this.declineExamination(event, req)}>Decline</button>
                        </Auxiliary> 
                    : req.role === "OPERATION" ?
                        <Auxiliary>
                            <button className="ui basic green button" onClick={(event) => this.approveOperation(event, req)}>Approve</button>
                            <button className="ui basic red button" onClick={(event) => this.declineOperation(event, req)}>Decline</button>
                        </Auxiliary>
                    : null}
                </Auxiliary>}
            </Auxiliary>
        );
    }
    
    render() {
        return (
            <Auxiliary>
                <Navigation />
                <div className="d1" style={{width:'100%', height:'auto', display:'flex', flexDirection:'row'}}>
                    <div style={{float:'left', height:'100vw', width:'50%'}}>
                        <p style={{textAlign:'center'}}>Number of clinic center admins: {this.state.ccadmins.length} </p>
                        {this.state.ccadmins.map((ad, i) => {
                            return (
                                <div key={i} >
                                    <div className="ui card mx-auto"  style={{display:'block' }}>
                                        <div className="image">
                                            {ad.image !== null ? <img src={'images/' + ad.image} alt="slika" style={{width: '40px', height: '40px'}}/> : null }
                                        </div>
                                        <div className="content" >
                                            <p className="header" >{ad.firstName} {ad.lastName}</p>
                                            <div className="meta">
                                            <span className="date">Joined in 2020</span>
                                            </div>
                                            <div className="description">
                                                Phone number: 0{ad.phoneNumber} <br />
                                                Email: {ad.email}
                                            </div>
                                        </div>
                                        <div className="extra content">
                                            {ad.id === this.state.loggedUser.user.id ? <a href="/profile">
                                            <i className="user icon"></i>
                                                See your profile
                                            </a> : null }
                                            {((ad.id !== this.state.loggedUser.user.id) && !ad.predefined && this.state.loggedUser.user.predefined) ? 
                                            <a onClick={(event) => this.deleteAdmin(event, ad)}>
                                                <i className="delete icon" style={{cursor: 'pointer'}}></i>
                                                Delete user
                                            </a>
                                            : null }
                                        </div>
                                        </div>
                                </div>
                            );
                        })}
                        <br></br>
                        <button className="mx-auto" style={{display:'block'}} onClick={(event) => this.showFormHandler(event)} >Add new Clinic Center Admin</button>
                        {this.state.openList ? 
                            <Auxiliary>
                                {(this.state.loggedUser.user.role === 'ADMINCC' && this.state.loggedUser.user.predefined) ?
                                <div className="registration  mx-auto" style={{width:'300px', display:'block'}}>
                                    <Auxiliary>
                                        <input type="text" className="mx-auto" style={{display:'block'}}  placeholder="First Name" onChange={(event) => this.inputChangeHandler(event, 'firstName')}/> 
                                        <input type="text"  className="mx-auto" style={{display:'block'}} placeholder="Last Name" onChange={(event) => this.inputChangeHandler(event, 'lastName')}/>
                                        <input type="text"  className="mx-auto" style={{display:'block'}} placeholder="Email" onChange={(event) => this.inputChangeHandler(event, 'email')}/> 
                                        <input type="password"  className="mx-auto" style={{display:'block'}} placeholder="Password" onChange={(event) => this.inputChangeHandler(event, 'password')}/> 
                                        <input type="text"  className="mx-auto" style={{display:'block'}} placeholder="Address" onChange={(event) => this.inputChangeHandler(event, 'address')}/> 
                                        <input type="text"  className="mx-auto" style={{display:'block'}} placeholder="City" onChange={(event) => this.inputChangeHandler(event, 'city')}/>
                                        <input type="text" className="mx-auto" style={{display:'block'}}  placeholder="Country" onChange={(event) => this.inputChangeHandler(event, 'country')}/>  
                                        <br></br>
                                        <input type="number"  className="mx-auto" style={{display:'block'}} placeholder="Phone Number" onChange={(event) => this.inputChangeHandler(event, 'phoneNumber')} />
                                        <br></br>
                                        <input type="number" className="mx-auto" style={{display:'block'}}  placeholder="User ID" onChange={(event) => this.inputChangeHandler(event, 'userId')} />  
                                        <br></br>
                                        <button  className="mx-auto" style={{display:'block'}} onClick={(event) => this.addNewClinicCenterAdmin(event)  }>Add</button>
                                    </Auxiliary>
                                </div>
                                    : null }
                            </Auxiliary>
                        : null}
                    </div>

                    <div style={{float:'right', height:'100vw', width:'50%', marginTop:'30px'}}>
                    <div className="ui cards">
                            {this.state.requests.map((req, i) => {
                                return (
                                    <div className="card" key={i}>
                                        <div className="content">
                                            <div className="header">
                                                {req.user.firstName} {req.user.lastName}
                                            </div>
                                            <div className="meta">
                                                {req.user.role}
                                            </div>
                                            <div className="description">
                                                {req.role === "REGISTRATION" ? 'New user requested permission for registration.' : 
                                                 req.role === "HOLIDAY" ? 'New user requested permission for holiday.' :
                                                 req.role === "EXAMINATION" ? 'Doctor ' + req.user.firstName + ' ' + req.user.lastName + ' requested to schedule examination' :
                                                 req.role === "OPERATION" ? 'Doctor ' + req.user.firstName + ' ' + req.user.lastName + ' requested to schedule operation'
                                                 : null}

                                            </div>
                                        </div>
                                        <div className="extra content">
                                            <div className="ui two buttons">
                                                {this.renderApproveDeclineButtons(req)}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </Auxiliary>
        );
    }
}

export default AdminPage;