import React from 'react';

import Input from '../Input/Input';

const FormElement = props => {
    return (
        <Input
            type={props.formElement.content.elementType}
            elementConfig={props.formElement.content.elementConfig}
            value={props.formElement.content.value}
            //touched={formElement.content.touched}
            valid={props.formElement.content.valid}
            changed={(event) => props.changed(event, props.formElement.id)}
            lostFocus={(event) => props.lostFocus(event, props.formElement.id)}
            disabled={props.formElement.content.disabled}
        />
    );
};

export default FormElement;