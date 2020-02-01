import React from 'react';
import axios from '../../../axios-objects';

class ConfirmReg extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            loggedUser: {
                user: null
            }
        }
    }

    componentDidMount = async() => {
        try {
            await axios.put('/confirm-account?token=' + window.location.href.split("=")[1]);
        } catch(err) {
            console.log(err);
        }
    }

    render() {
        return ( 
            <div> 
                <p style={{fontSize: '30px'}}>You have been successfully registrated.</p>
            </div>
        );
    }
}

export default ConfirmReg;