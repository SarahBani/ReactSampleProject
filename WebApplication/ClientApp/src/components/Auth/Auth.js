import React, { useContext, useReducer, useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";

import FormElement from '../UI/FormElement/FormElement';
import Button from '../UI/Button/Button';
import Spinner from "../UI/Spinner/Spinner";
import * as actions from '../../store/actions/authActions';
import classes from './Auth.module.css';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { updateObject, getFormElements, getUpdatedForm, isFormValid } from '../../shared/utility';
//import AuthContext from "../../context/AuthContext";

const initialFormState = {
    email: {
        elementType: 'input',
        elementConfig: {
            type: 'email',
            placeholder: 'Email',
        },
        value: 'sarah@yahoo.com',
        validation: {
            required: true,
            email: true
        },
        valid: true
    },
    password: {
        elementType: 'input',
        elementConfig: {
            type: 'password',
            placeholder: 'Password',
        },
        value: '',
        validation: {
            required: true,
            minLength: 6
        },
        valid: true
    }
};

export const Auth = props => {

    const [formControls, setFormControls] = useState(initialFormState);
    const [formIsValid, setFormIsValid] = useState(false);
    //const authContext = useContext(AuthContext);

    const inputChangedHandler = (event, id) => {
        const updatedForm = getUpdatedForm(event, formControls, id);
        setFormControls(updatedForm);
        setFormIsValid(isFormValid(updatedForm));
    };

    const inputLostFocusHandler = (event, id) => {
        setFormControls(getUpdatedForm(event, formControls, id));
    };

    const signInHandler = (event) => {
        event.preventDefault();
        props.onSignIn(formControls.email.value, formControls.password.value);
    };

    let form = (props.loading ?
        <Spinner />
        :
        <form onSubmit={signInHandler}>
            {
                getFormElements(formControls).map(formElement => (
                    <FormElement formElement={formElement}
                        key={formElement.id}
                        changed={(event) => inputChangedHandler(event, formElement.id)}
                        lostFocus={(event) => inputLostFocusHandler(event, formElement.id)}
                    />
                ))
            }
            <Button type='Success' disabled={!formIsValid}>Sign In</Button>
        </form>
    );
    //const loggedInRedirect = (props.loggedIn &&
    //    <Redirect to={!props.viewingHotel ? '/' : '/checkout'} />);
    const loggedInRedirect = (props.loggedIn && <Redirect to='/' />);

    return (
        <div className={classes.Auth}>
            {loggedInRedirect}
            {form}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        loggedIn: state.auth.loggedIn,
        loading: state.auth.loading,
        //viewingHotel: state.location.viewingHotel,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSignIn: (email, password) => dispatch(actions.signIn(email, password)),
        onSetRedirect: () => dispatch(actions.setAuthRedirectPath('/')),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Auth));