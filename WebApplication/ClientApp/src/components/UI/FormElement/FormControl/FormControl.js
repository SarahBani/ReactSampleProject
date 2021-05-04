import React from 'react';
import StarRatings from 'react-star-ratings';

import classes from './FormControl.module.scss';
import DropDown from '../../DropDown/DropDown';
import { FormControlTypesEnum } from '../../../../shared/constant';

const FormControl = props => {

    let formElement = null;
    const controlClasses = [classes.FormElement];

    let validationError = null;
    if (!props.valid && props.touched) {
        controlClasses.push(classes.Invalid);
        validationError = (
            <p className={classes.ValidationError}>
                Please enter a valid {props.label ? props.label : 'value'}!
            </p>);
    }

    switch (props.type) {
        case FormControlTypesEnum.TextArea:
            formElement = <textarea
                {...props.elementConfig}
                value={props.value}
                className={controlClasses.join(' ')}
                onChange={props.changed}
                onBlur={props.lostFocus}
                disabled={props.disabled} />;
            break;
        case FormControlTypesEnum.Select:
            formElement =
                <select
                    name={props.id}
                    className={controlClasses.join(' ')}
                    text={props.value}
                    onChange={props.changed}
                    onBlur={props.lostFocus}
                    disabled={props.disabled}>
                    {props.elementConfig?.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.text}
                        </option>
                    ))}
                </select>;
            break;
        case FormControlTypesEnum.DropDown:
            formElement =
                <DropDown
                    {...props.elementConfig}
                    name={props.id}
                    className={controlClasses.join(' ')}
                    data={props.options}
                    value={props.value}
                    title={props.title}
                    disabled={props.disabled}
                    onSelect={props.selected}
                    onBlur={props.lostFocus} />;
            break;
        case FormControlTypesEnum.Stars:
            formElement =
                <StarRatings
                    rating={props.value}
                    starRatedColor="#FFD119"
                    changeRating={props.changeRating}
                    numberOfStars={5}
                    disabled={props.disabled} />
            break;
        case FormControlTypesEnum.Input:
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