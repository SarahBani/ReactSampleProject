import { React, useState, useEffect, useCallback, useReducer } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';

import { getUpdatedForm, getFormElements, ValidateForm, checkValidity } from '../../../shared/utility';
import FormElement from '../../UI/FormElement/FormElement';
import { OperationsEnum, FormControlTypesEnum } from '../../../shared/constant';
import * as actions from '../../../store/actions/hotelActions';
import * as locationActions from '../../../store/actions/locationActions';
import * as authActions from '../../../store/actions/authActions';

const initialFormState = {
    name: {
        elementType: FormControlTypesEnum.Input,
        elementConfig: {
            type: 'text',
            placeholder: 'Name',
        },
        value: '',
        validation: {
            required: true
        },
        valid: false
    },
    countryId: {
        elementType: FormControlTypesEnum.DropDown,
        elementConfig: {
            title: 'Country',
            placeholder: 'Country'
        },
        value: '',
        validation: {
            required: true
        },
        valid: false,
        disabled: true
    },
    cityId: {
        elementType: FormControlTypesEnum.DropDown,
        elementConfig: {
            title: 'City',
            placeholder: 'City'
        },
        value: '',
        validation: {
            required: true
        },
        valid: false
    },
    stars: {
        elementType: FormControlTypesEnum.Stars,
        value: 0,
        valid: true
    },
    address: {
        elementType: FormControlTypesEnum.TextArea,
        elementConfig: {
            placeholder: 'Address',
        },
        value: '',
        validation: {
        },
        valid: true
    },
};

const initialDropDowns = {
    countryId: {
        options: [],
        value: '',
        valid: false
    },
    cityId: {
        options: [],
        value: '',
        valid: false
    }
};

const checkDropDownValidity = (id, value) =>
    checkValidity(value.toString(), initialFormState[id].validation);

const dropDownsReducer = (currentDropDowns, action) => {
    switch (action.type) {
        case 'FILL_COUNTRIES':
            return {
                ...currentDropDowns,
                ['countryId']: {
                    options: getDropDownCountriesData(action.countries),
                    value: '',
                    valid: false,
                    touched: false,
                    disabled: false
                },
                ['cityId']: {
                    options: [],
                    value: '',
                    valid: false,
                    touched: false,
                    disabled: false
                }
            };
        case 'FILL_CITIES':
            return {
                ...currentDropDowns,
                ['cityId']: {
                    options: getDropDownCitiesData(action.cities),
                    value: '',
                    valid: false,
                    touched: false,
                    disabled: false
                }
            };
        case 'SELECT':
            if (action.id === 'countryId') {
                return {
                    ...currentDropDowns,
                    ['countryId']: {
                        ...currentDropDowns['countryId'],
                        value: action.value,
                        valid: checkDropDownValidity(action.id, action.value),
                        touched: true
                    },
                    ['cityId']: {
                        options: [],
                        value: '',
                        valid: false,
                        touched: false
                    }
                };
            }
            else {
                return {
                    ...currentDropDowns,
                    ['cityId']: {
                        ...currentDropDowns['cityId'],
                        value: action.value,
                        valid: checkDropDownValidity(action.id, action.value),
                        touched: true
                    }
                };
            }
        default:
            return currentDropDowns;
    }
};

const getDropDownCountriesData = (countries) => {
    return countries.map(country => {
        const flagUrl = '/images/' + (country.flagUrl ? 'countries/' + country.flagUrl : 'no-image.png');
        return {
            id: country.id,
            text: country.name,
            imageUrl: flagUrl,
        };
    });
};

const getDropDownCitiesData = (cities) => {
    return cities.map(city => ({
        id: city.id,
        text: city.name
    }));
};

const HotelNew = props => {

    const {
        loading, loggedIn, countries, cities, successfulOperation,
        onFetchCountries, onSelectCountry, onSave, onSetRedirect
    } = props;
    const location = useLocation();
    const [formControls, setFormControls] = useState(initialFormState);
    const [isFormValid, setIsFormValid] = useState(false);
    const [redirect, setRedirect] = useState();
    const [dropDowns, dispatchDropDowns] = useReducer(dropDownsReducer, initialDropDowns);

    const dropDownsHandlers = {
        'countryId': onSelectCountry,
        //'cityId': () => { }
    };

    useEffect(() => {
        if (!loggedIn) {
            onSetRedirect(location.pathname);
           setRedirect(<Redirect to="/auth/" />);
        }
    }, [loggedIn, onSetRedirect]);

    useEffect(() => {
        if (countries.length === 0) {
            onFetchCountries();
        }
        else {
            selectDropDownHandler('countryId', '');
        }
    }, []);

    useEffect(() => {
        if (countries.length > 0) {
            dispatchDropDowns({
                type: 'FILL_COUNTRIES',
                countries: countries
            });
        }
    }, [countries]);

    useEffect(() => {
        if (countries.length > 0) {
            dispatchDropDowns({
                type: 'FILL_CITIES',
                cities: cities
            });
        }
    }, [cities]);

    useEffect(() => {
        const updatedForm = {
            ...formControls,
            ['countryId']: {
                ...formControls['countryId'],
                ...dropDowns.countryId
            },
            ['cityId']: {
                ...formControls['cityId'],
                ...dropDowns.cityId
            }
        };
        setFormControls(updatedForm);
    }, [dropDowns]);

    useEffect(() => {
        setIsFormValid(ValidateForm(formControls));
    }, [formControls]);

    useEffect(() => {
        if (successfulOperation === OperationsEnum.Delete) {
            setRedirect(<Redirect to="/hotels/" />);
        }
    }, [successfulOperation]);

    const selectDropDownHandler = useCallback((controlId, value) => {
        dispatchDropDowns({
            type: 'SELECT',
            id: controlId,
            value: value
        });

        if (dropDownsHandlers[controlId]) {
            dropDownsHandlers[controlId](value);
        }
    }, [dispatchDropDowns, dropDownsHandlers]);

    const elementHandler = (event, id) => {
        setFormControls(getUpdatedForm(event, formControls, id));
    };

    const changeStarsHandler = (value, id) => {
        const updatedForm = {
            ...formControls,
            ['stars']: {
                ...formControls['stars'],
                value: value
            }
        };
        setFormControls(updatedForm);
    };

    const cancelHandler = useCallback(() => {
        setRedirect(<Redirect to="/hotels/" />);
    }, [setRedirect]);

    const saveHandler = (event) => {
        event.preventDefault();
        onSave({
            name: formControls.name.value,
            countryId: formControls.countryId.value,
            cityId: formControls.cityId.value,
            stars: formControls.stars.value,
            address: formControls.address.value
        });
    };

    const formElements = getFormElements(formControls).map(formElement => {
        return (
            <FormElement formElement={formElement}
                key={formElement.id}
                changed={(event) => elementHandler(event, formElement.id)}
                lostFocus={(event) => elementHandler(event, formElement.id)}
                selected={(value) => selectDropDownHandler(formElement.id, value)}
                changeRating={changeStarsHandler}
            />
        )
    });

    return (
        <div>
            {redirect}
            <form onSubmit={saveHandler}>
                {formElements}
                <div className="row">
                    <div className="col-12 text-center">
                        <button className="btn btn-primary" type="reset">Clear</button>
                        <button className="btn btn-success" type="submit"
                            disabled={!isFormValid || loading}>Save</button>
                        <button className="btn btn-warning" type="button" onClick={cancelHandler}> Cancel</button >
                    </div>
                </div>
            </form>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        countries: state.location.countries,
        cities: state.location.cities,
        loggedIn: state.auth.loggedIn,
        loading: state.common.isLoading,
        successfulOperation: state.common.successfulOperation
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchCountries: () => dispatch(locationActions.fetchCountries()),
        onSelectCountry: (countryId) => dispatch(locationActions.selectCountry(countryId)),
        onSave: (hotel) => dispatch(actions.saveHotel(hotel)),
        onSetRedirect: (path) => dispatch(authActions.setAuthRedirectPath(path)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HotelNew);