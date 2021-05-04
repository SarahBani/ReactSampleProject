import React, { useContext, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";

import classes from './Auth.module.scss';
import FormElement from '../UI/FormElement/FormElement';
import Button from '../UI/Button/Button';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { getFormElements, getUpdatedForm, disableForm, ValidateForm } from '../../shared/utility';
//import AuthContext from "../../context/AuthContext";
import * as actions from '../../store/actions/authActions';
import { FormControlTypesEnum } from '../../shared/constant';

const initialFormState = {
    email: {
        elementType: FormControlTypesEnum.Input,
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
        elementType: FormControlTypesEnum.Input,
        elementConfig: {
            type: 'password',
            placeholder: 'Password',
        },
        value: '',
        autoComplete: 'on',
        validation: {
            required: true,
            minLength: 6
        },
        valid: true
    }
};

export const Auth = props => {

    const { loading } = props;
    const [formControls, setFormControls] = useState(initialFormState);
    const [isFormValid, setIsFormValid] = useState(false);
    //const authContext = useContext(AuthContext);

    useEffect(() => {
        const updatedForm = disableForm(formControls, loading);
        setFormControls(updatedForm);
    }, [loading, setFormControls]);

    const elementChangedHandler = (event, id) => {
        const updatedForm = getUpdatedForm(event, formControls, id);
        setFormControls(updatedForm);
        setIsFormValid(ValidateForm(updatedForm));
    };

    const elementLostFocusHandler = (event, id) => {
        setFormControls(getUpdatedForm(event, formControls, id));
    };

    const signInHandler = (event) => {
        event.preventDefault();
        props.onSignIn(formControls.email.value, formControls.password.value);
    };

    const form = (
        <form onSubmit={signInHandler}>
            {
                getFormElements(formControls).map(formElement => (
                    <FormElement formElement={formElement}
                        key={formElement.id}
                        changed={(event) => elementChangedHandler(event, formElement.id)}
                        lostFocus={(event) => elementLostFocusHandler(event, formElement.id)}
                    />
                ))
            }
            <Button type='Success' disabled={!isFormValid || loading}>Sign In</Button>
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
        loading: state.common.isLoading,
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