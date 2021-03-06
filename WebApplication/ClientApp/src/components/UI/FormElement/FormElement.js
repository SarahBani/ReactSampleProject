import React from 'react';

import FormControl from './FormControl/FormControl';

const FormElement = props => {
    return (
        <FormControl
            type={props.formElement.content.elementType}
            elementConfig={props.formElement.content.elementConfig}
            value={props.formElement.content.value}
            options={props.formElement.content.options}
            touched={props.formElement.content.touched}
            valid={props.formElement.content.valid}
            changed={(event) => props.changed(event, props.formElement.id)}
            selected={(value) => props.selected(value)}
            lostFocus={(event) => props.lostFocus(event, props.formElement.id)}
            disabled={props.formElement.content.disabled}
            autoComplete={props.formElement.content.autoComplete}
            changeRating={props.changeRating}
        />
    );
};

export default FormElement;