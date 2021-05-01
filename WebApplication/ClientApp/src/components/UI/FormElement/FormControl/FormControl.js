import React from 'react';

import classes from './FormControl.module.scss';
import DropDown from '../../DropDown/DropDown';

const FormControl = props => {

    let formElement = null;
    const controlClasses = [classes.FormElement];

    let validationError = null;
    if (!props.valid) {
        //if (!props.valid && props.touced) {
        controlClasses.push(classes.Invalid);
        validationError = (
            <p className={classes.ValidationError}>
                Please enter a valid {props.label ? props.label : 'value'}!
            </p>);
    }

    switch (props.type) {
        case 'textarea':
            formElement = <textarea
                {...props.elementConfig}
                value={props.value}
                className={controlClasses.join(' ')}
                onChange={props.changed}
                onBlur={props.lostFocus}
                disabled={props.disabled} />;
            break;
        case 'select':
            formElement =
                //<select
                //    name={props.id}
                //    className={controlClasses.join(' ')}
                //    text={props.value}
                //    onChange={props.changed}
                //    onBlur={props.lostFocus}
                //    disabled={props.disabled}>
                //    {props.elementConfig?.options.map(option => (
                //        <option key={option.value} value={option.value}>{option.text}</option>
                //    ))}
                //</select>;
                <DropDown
                    {...props.elementConfig}
                    name={props.id}
                    className={controlClasses.join(' ')}
                    data={props.options}
                    title={props.title}
                    disabled={props.disabled}
                    onSelect={props.selected}
                    onBlur={props.lostFocus} />;
            break;
        case 'input':
        default:
            formElement = <input
                {...props.elementConfig}
                name={props.id}
                value={props.value}
                className={controlClasses.join(' ')}
                onChange={props.changed}
                onBlur={props.lostFocus}
                disabled={props.disabled}
                autoComplete={props.autoComplete} />;
    }

    return (
        <div className={classes.FormControl}>
            <label>{props.label}</label>
            {formElement}
            {validationError}
        </div>
    );
};

export default FormControl;