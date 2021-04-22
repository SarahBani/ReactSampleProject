export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        updatedProperties
    };
};

export const getFormElements = (formControls) => {
    const formElements = [];
    for (const key in formControls) {
        formElements.push({
            id: key,
            content: formControls[key]
        });
    }
    return formElements;
};

export const getUpdatedForm = (event, formControls, id) => {
    const isInputValid = checkValidity(event.target.value, formControls[id].validation);
    const updatedForm = {
        ...formControls,
        [id]: {
            ...formControls[id],
            value: event.target.value,
            valid: isInputValid,
            //touched: true
        }
    };
    return updatedForm;
};

export const isFormValid = (formControls) => {
    let isValid = true;
    for (const inputId in formControls) {
        if (!formControls[inputId].valid) {
            isValid = false;
            break;
        }
    }
    return isValid;
};

const checkValidity = (value, rules) => {
    if (!rules) {
        return true;
    }

    if (rules.required) {
        if (!value || value.trim() === '') {
            return false;
        }
    }
    if (rules.minLength) {
        if (value.length < rules.minLength) {
            return false;
        }
    }
    if (rules.maxLength) {
        if (value.length > rules.maxLength) {
            return false;
        }
    }
    if (rules.minimum) {
        if (value < rules.minimum) {
            return false;
        }
    }
    if (rules.maximum) {
        if (value > rules.maximum) {
            return false;
        }
    }
    if (rules.email) {
        const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailRegEx.test(value)) {
            return false;
        }
    }
    if (rules.regularExpression) {
        if (!rules.maximum.test(value)) {
            return false;
        }
    }

    return true;
};