import React from 'react';

import classes from './Input.module.scss';

const Input = props => {

    let inputElement = null;
    const inputClasses = [classes.InputElement];

    let validationError = null;
    if (!props.valid) {
        //if (!props.valid && props.touced) {
        inputClasses.push(classes.Invalid);
        validationError = (
            <p className={classes.ValidationError}>
                Please enter a valid {props.label ? props.label : 'value'}!
            </p>);
    }

    switch (props.type) {
        case 'textarea':
            inputElement = <textarea
                {...props.elementConfig}
                value={props.value}
                className={inputClasses.join(' ')}
                onChange={props.changed}
                onBlur={props.lostFocus}
                disabled={props.disabled} />;
            break;
        case 'select':
            inputElement =
                <select
                    name={props.id}
                    className={inputClasses.join(' ')}
                    text={props.value}
                    onChange={props.changed}
                    onBlur={props.lostFocus}
                    disabled={props.disabled}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>{option.text}</option>
                    ))}
                </select>;
            break;
        case 'input':
        default:
            inputElement = <input
                {...props.elementConfig}
                name={props.id}
                value={props.value}
                className={inputClasses.join(' ')}
                onChange={props.changed}
                onBlur={props.lostFocus}
                disabled={props.disabled} />;
    }

    return (
        <div className={classes.Input}>
            <label>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    );
};

export default Input;