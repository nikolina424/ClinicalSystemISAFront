import React from 'react';
import axios from '../../../axios-objects';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Navigation from '../../../containers/Navigation/Navigation';
import { Button, Header, Image, Modal } from 'semantic-ui-react';
import {updateObject} from '../../../shared/utility';

class Popup extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            doctors: [],
            modifyEx: {
                id: null,
                description: '',
                price: null,
                duration: null,
                doctor: null
            },
            modifyOp: {
                id: null,
                description: '',
                price: null,
                duration: null,
                doctor: null
            }
        }
    }

    componentDidMount = async() => {
        const token = sessionStorage.getItem('token');

        try {
            const response = await axios.get('/getDoctorsClinic', {
                headers: {
                    'Authorization' : 'Bearer ' + token
                }
            });
            if (response) {
                this.setState({doctors: response.data});
            }
        } catch(err) {
            console.log(err);
        }
    }

    inputHandler = (event, type) => {
        let updatedObject = updateObject(this.state.modifyOp, {
            [type]: event.target.value
        });
        this.setState({modifyOp: updatedObject});
    }

    inputHandlerEx = (event, type) => {
        let updatedObject = updateObject(this.state.modifyEx, {
            [type]: event.target.value
        });
        this.setState({modifyEx: updatedObject});
    }

    selectHandler = (event) => {
        let string = event.target.value;
        let newDoc = null;
        for (let i = 0; i < this.state.doctors.length; i++) {
            if ((this.state.doctors[i].firstName + ' ' + this.state.doctors[i].lastName) === string) {
                newDoc = this.state.doctors[i];
                break;
            }
        }

        let updatedObject = updateObject(this.state.modifyOp, {
            doctor: newDoc
        });

        this.setState({modifyOp: updatedObject});
    }

    selectHandlerEx = (event) => {
        let string = event.target.value;
        let newDoc = null;
        for (let i = 0; i < this.state.doctors.length; i++) {
            if ((this.state.doctors[i].firstName + ' ' + this.state.doctors[i].lastName) === string) {
                newDoc = this.state.doctors[i];
                break;
            }
        }

        let updatedObject = updateObject(this.state.modifyEx, {
            doctor: newDoc
        });

        this.setState({modifyEx: updatedObject});
    }

    optionHandler = () => {
        return (
            <Auxiliary>
                {this.state.doctors.map((doctor, i) => {
                    return (
                        <option key={i}>{doctor.firstName} {doctor.lastName}</option>
                    );
                })}
            </Auxiliary>
        );
    }

    modifyEx = async(event, ex) => {
        event.preventDefault();
        const token = sessionStorage.getItem('token');
        let newEx = this.state.modifyEx;
        newEx.id = ex.id;
        if (newEx.description === '') {
            newEx.description = ex.description;
        }
        if (newEx.price === null) {
            newEx.price = ex.price;
        }
        if (newEx.duration === null) {
            newEx.duration = ex.duration;
        }
        if (newEx.doctor === null) {
            newEx.doctor = ex.doctor;
        }

        try {
            const response = await axios.put('/modifyExamination', newEx, {
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

    modifyOp = async(event, op) => {
        event.preventDefault();
        const token = sessionStorage.getItem('token');
        let newOp = this.state.modifyOp;
        newOp.id = op.id;
        if (newOp.description === '') {
            newOp.description = op.description;
        }
        if (newOp.price === null) {
            newOp.price = op.price;
        }
        if (newOp.duration === null) {
            newOp.duration = op.duration;
        }
        if (newOp.doctor === null) {
            newOp.doctor = op.doctor;
        }

        try {
            const response = await axios.put('/modifyOperation', newOp, {
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

    deleteOp = async(event, op) => {
        event.preventDefault();
        const token = sessionStorage.getItem('token');

        try {
            const response = await axios.put('/deleteOperation', op, {
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

    deleteEx = async(event, ex) => {
        event.preventDefault();
        const token = sessionStorage.getItem('token');

        try {
            const response = await axios.put('/deleteExamination', ex, {
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

    render() {
        const { openModal, closeModal, app, type } = this.props;

        return (
            <Modal open={openModal} onClose={() => closeModal()} className="popupAdd" style={{overflowY: 'initial'}}>
                <Modal.Header>Modify appointment</Modal.Header>
                <Modal.Content image>
                    {type === 'examination' ? <Image wrapped size='medium' src='images/examination.jpg' /> :
                        <Image wrapped size='medium' src='images/operation.png'/> }
                    <Modal.Description style={{width: '70%'}}>
                    {type === 'examination' ? 
                    <Auxiliary>
                        <Header>Modify examination </Header>
                        <p> Examination description: </p>
                        <input type="text" defaultValue={app !== null ? app.description : ''}
                        onChange={(event) => this.inputHandlerEx(event, 'description')} />
                        <p> Examination price(euros): </p>
                        <input type="number" defaultValue={app !== null ? app.price : null}
                        onChange={(event) => this.inputHandlerEx(event, 'price')} />
                        <p> Examination duration(hours): </p>
                        <input type="number" defaultValue={app !== null ? app.duration  : null}
                        onChange={(event) => this.inputHandlerEx(event, 'duration')} />
                        <p> Choose doctor:</p>
                        <select defaultValue={app !== null ? (app.doctor.firstName + ' ' + app.doctor.lastName) : ''}
                            onChange={(event) => this.selectHandlerEx(event)}>
                            {this.optionHandler()}
                        </select>
                    </Auxiliary>
                    : 
                    <Auxiliary>
                        <Header>Modify operation </Header>
                        <p> Operation description: </p>
                        <input type="text" defaultValue={app !== null ? app.description : ''}
                        onChange={(event) => this.inputHandler(event, 'description')} />
                        <p> Operation price(euros): </p>
                        <input type="number" defaultValue={app !== null ? app.price : null}
                        onChange={(event) => this.inputHandler(event, 'price')} />
                        <p> Operation duration(hours): </p>
                        <input type="number" defaultValue={app !== null ? app.duration : null}
                        onChange={(event) => this.inputHandler(event, 'duration')} />
                        <p> Choose doctor:</p>
                        <select defaultValue={app !== null ? (app.doctor.firstName + ' ' + app.doctor.lastName) : ''}
                            onChange={(event) => this.selectHandler(event)}>
                            {this.optionHandler()}
                        </select>
                    </Auxiliary> }
                    </Modal.Description>
                    {type === 'examination' ?
                    <Auxiliary>
                        <Button onClick={(event) => this.modifyEx(event, app)}>Modify</Button>
                        <Button onClick={(event) => this.deleteEx(event, app)}>Delete</Button>
                    </Auxiliary>
                    : 
                    <Auxiliary>
                        <Button onClick={(event) => this.modifyOp(event, app)}>Modify</Button>
                        <Button onClick={(event) => this.deleteOp(event, app)}>Delete</Button>
                    </Auxiliary>}
                </Modal.Content>
            </Modal>
        );
    }
}

class Appointment extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            examinations: [],
            operations: [],
            inputSearch: '',
            searchedExaminations: [],
            searchedOperations: [],
            openModal: false,
            pickApp: null,
            pickType: ''
        }
    }

    componentDidMount = async() => {
        const token = sessionStorage.getItem('token');

        if (sessionStorage.getItem('role') === 'ADMINCC') {
            try {
                const response = await axios.get('/getExaminations', {
                    headers: {
                        'Authorization' : 'Bearer ' + token
                    }
                });
                if (response) {
                    this.setState({examinations: response.data});
                }
            } catch(err) {
                console.log(err);
            }
            try {
                const response = await axios.get('/getOperations', {
                    headers: {
                        'Authorization' : 'Bearer ' + token
                    }
                });
                if (response) {
                    this.setState({operations: response.data});
                }
            } catch(err) {
                console.log(err);
            }
        }

        if (sessionStorage.getItem('role') === 'ADMINC') {
            try {
                const response = await axios.get('/getExaminationsOfClinic', {
                    headers: {
                        'Authorization' : 'Bearer ' + token
                    }
                });
                if (response) {
                    this.setState({examinations: response.data});
                }
            } catch(err) {
                console.log(err);
            }
            try {
                const response = await axios.get('/getOperationsOfClinic', {
                    headers: {
                        'Authorization' : 'Bearer ' + token
                    }
                });
                if (response) {
                    this.setState({operations: response.data});
                }
            } catch(err) {
                console.log(err);
            }
        }
    }

    closeModal = () => {
        this.setState({openModal: false});
    }

    pickApp = (event, app, type) => {
        event.preventDefault();
        this.setState({openModal: true});
        this.setState({pickApp: app});
        this.setState({pickType: type});
    }

    inputSearchHandler = (event) => {
        event.preventDefault();
        this.setState({inputSearch: event.target.value});
    }

    searchAppointments = (event) => {
        event.preventDefault();
        const oldEx = this.state.examinations;
        const oldOp = this.state.operations;
        let newEx = [];
        let newOp = [];
        const searchString = this.state.inputSearch;

        for(let i = 0; i < oldEx.length; i++) {
            if(oldEx[i].description.indexOf(searchString) > -1) {
                newEx.push(oldEx[i]);
            }
        }
        this.setState({searchedExaminations: newEx});

        for(let i = 0; i < oldOp.length; i++) {
            if(oldOp[i].description.indexOf(searchString) > -1) {
                newOp.push(oldOp[i]);
            }
        }
        this.setState({searchedOperations: newOp});
    }

    renderSearch() {
        return (
            <Auxiliary>
                <div className="searchDiv">
                    <input type="text" placeholder="Search appointments by names" style={{width: '50%'}} 
                        onChange={(event) => this.inputSearchHandler(event)} /> 
                    <button className="ui primary button" style={{width: '10%'}} onClick={(event) => this.searchAppointments(event)}>
                        <i className="search icon" style={{marginRight: '1.5vw'}}>Search</i>
                    </button>
                </div>
            </Auxiliary>
        );
    }

    renderExaminations() {
        return (
            <Auxiliary>
                {this.state.searchedExaminations.length === 0 ? this.state.examinations.map((ex, i) => {
                    return (
                        <div className="card" key={i} onClick={(event) => this.pickApp(event, ex, 'examination')}>
                            <div className="image">
                                <img src="/images/examination.jpg" alt="Examination"/>
                            </div>
                            <div className="content">
                                <div className="header">{ex.description}</div>
                                <div className="meta">
                                    <label>Examination</label>
                                </div>
                                <div className="description">
                                    Examination will last for {ex.duration} hours and it will cost {ex.price} euros.
                                    Examination is supervised by {ex.doctor.firstName} {ex.doctor.lastName}.
                                </div>
                            </div>
                        </div>
                    );
                }) :
                this.state.searchedExaminations.map((ex, i) => {
                    return (
                        <div className="card" key={i} onClick={(event) => this.pickApp(event, ex, 'examination')}>
                            <div className="image">
                                <img src="/images/examination.jpg" alt="Examination"/>
                            </div>
                            <div className="content">
                                <div className="header">{ex.description}</div>
                                <div className="meta">
                                    <label>Examination</label>
                                </div>
                                <div className="description">
                                    Examination will last for {ex.duration} hours and it will cost {ex.price} euros.
                                    Examination is supervised by {ex.doctor.firstName} {ex.doctor.lastName}.
                                </div>
                            </div>
                        </div>
                    );
                })}
            </Auxiliary>
        );
    }

    renderOperations() {
        return (
            <Auxiliary>
                 {this.state.searchedOperations.length === 0 ? this.state.operations.map((op, i) => {
                    return (
                        <div className="card" key={i} onClick={(event) => this.pickApp(event, op, 'operation')}>
                            <div className="image">
                                <img src="/images/operation.png" alt="Operation"/>
                            </div>
                            <div className="content">
                                <div className="header">
                                    {op.description}
                                </div>
                                <div className="meta">
                                    <label>Operation</label>
                                </div>
                                <div className="description">
                                    Operation will last for {op.duration} hours and it will cost {op.price} euros.
                                    Operation is supervised by {op.doctor.firstName} {op.doctor.lastName}.
                                </div>
                            </div>
                        </div>
                    );
                }) :
                this.state.searchedOperations.map((op, i) => {
                    return (
                        <div className="card" key={i} onClick={(event) => this.pickApp(event, op, 'operation')}>
                            <div className="image">
                                <img src="/images/operation.png" alt="Operation"/>
                            </div>
                            <div className="content">
                                <div className="header">{op.description}</div>
                                <div className="meta">
                                    <label>Operation</label>
                                </div>
                                <div className="description">
                                    Operation will last for {op.duration} hours and it will cost {op.price} euros.
                                    Operation is supervised by {op.doctor.firstName} {op.doctor.lastName}.
                                </div>
                            </div>
                        </div>
                    );
                })}
            </Auxiliary>
        );
    }

    render() {
        return (
            <Auxiliary>
                <Navigation />
                {this.renderSearch()}
                <div className="ui link cards" style={{marginTop: '10px', justifyContent: 'center'}}>
                    {this.renderExaminations()}
                    {this.renderOperations()}
                    {sessionStorage.getItem('role') === 'ADMINC' ? 
                    <Popup app={this.state.pickApp} type={this.state.pickType} openModal={this.state.openModal} closeModal={this.closeModal} /> 
                    : null}
                </div>
            </Auxiliary>
        );
    }
}

export default Appointment;