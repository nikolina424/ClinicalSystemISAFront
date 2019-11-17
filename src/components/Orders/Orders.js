import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Order from './Order/Order';
import axios from '../../axios-objects';
import * as actions from '../../store/actions/index';
import classes from '../../containers/Layout/Layout.css';

class Orders extends Component {

    componentDidMount() {
        this.props.onGetObjects();
    }

    render() {
        let orders = null;
        if (this.props.objects.length > 0) {
            orders = (
                this.props.objects.map(obj => (
                    <Order key={obj.id} order={obj} />
                ))
            );
        }
        
        return (
            <Auxiliary>
                {orders}
                <NavLink to="/" exact className={classes.Button}>Go back to home page</NavLink>
            </Auxiliary>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        objects: state.object.objects
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetObjects: () => dispatch(actions.fetchObjects())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders, axios);