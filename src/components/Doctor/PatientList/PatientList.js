import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';

class PatientList extends Component {

    state = {
        patients: []
    }

    componentDidMount() {
        const getDataPromise = () => new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.props.getPatients());
            }, 50);
        });

        const processDataAsycn = async () => {
            let data = await getDataPromise();
            data = await getDataPromise(data);
            return data;
        };

        processDataAsycn().then((data) => {
            this.setState({patients: this.props.patients});
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        return (
            <div>
                {this.state.patients.map((pat, i) => {
                    return (
                        <div key={i}>
                            <p>Patient: {pat.firstName} {pat.lastName}</p>
                        </div>
                    )
                })}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        patients: state.user.patients
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getPatients: () => dispatch(actions.getPatients())
    };
};

export default connect (mapStateToProps, mapDispatchToProps)(PatientList);