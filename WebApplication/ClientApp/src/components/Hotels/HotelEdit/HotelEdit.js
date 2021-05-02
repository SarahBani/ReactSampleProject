import { React, useState, useEffect, useCallback, useMemo } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { getUpdatedForm, getFormElements, ValidateForm, checkValidity } from '../../../shared/utility';
import FormElement from '../../UI/FormElement/FormElement';
import ConfirmDelete from '../../UI/ConfirmDelete/ConfirmDelete';
import Modal from '../../UI/Modal/Modal';
import * as actions from '../../../store/actions/hotelActions';
import * as locationActions from '../../../store/actions/locationActions';
import { useReducer } from 'react';

const initialFormState = {
    name: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Name',
        },
        value: '',
        validation: {
            required: true
        },
        valid: true
    },
    countryId: {
        elementType: 'dropdown',
        elementConfig: {
            title: 'Country',
            placeholder: 'Country'
        },
        value: '',
        validation: {
            required: true
        },
        valid: true
    },
    cityId: {
        elementType: 'dropdown',
        elementConfig: {
            title: 'City',
            placeholder: 'City'
        },
        value: '',
        validation: {
            required: true
        },
        valid: true
    },
    //stars: {
    //    elementType: 'stars',
    //    value: '',
    //    validation: {
    //    },
    //    valid: true
    //},
    address: {
        elementType: 'textarea',
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
        valid: true
    },
    cityId: {
        options: [],
        value: '',
        valid: true
    }
};

const dropDownsReducer = (currentDropDowns, action) => {
    switch (action.type) {
        case 'FILL_COUNTRIES':
            return {
                ...currentDropDowns,
                ['countryId']: {
                    options: getDropDownCountriesData(action.countries),
                    value: '',
                    valid: true
                },
                ['cityId']: {
                    options: [],
                    value: '',
                    valid: true
                }
            };
        case 'FILL_CITIES':
            return {
                ...currentDropDowns,
                ['cityId']: {
                    options: getDropDownCitiesData(action.cities),
                    value: '',
                    valid: true
                }
            };
        case 'SELECT':
            if (action.id === 'countryId') {
                return {
                    ...currentDropDowns,
                    ['countryId']: {
                        ...currentDropDowns['countryId'],
                        value: action.value,
                        valid: checkValidity(action.value.toString(), initialFormState['countryId'].validation)
                    },
                    ['cityId']: {
                        options: [],
                        value: '',
                        valid: true
                    }
                };
            }
            else {
                return {
                    ...currentDropDowns,
                    ['cityId']: {
                        ...currentDropDowns['cityId'],
                        value: action.value,
                        valid: checkValidity(action.value.toString(), initialFormState['cityId'].validation)
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

const HotelEdit = props => {

    const {
        id, loading, countries, cities, onFetchCountries, onSelectCountry, onDeleteHotel
    } = props;
    const [formControls, setFormControls] = useState(initialFormState);
    const [isFormValid, setIsFormValid] = useState(false);
    const [redirect, setRedirect] = useState();
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [dropDowns, dispatchDropDowns] = useReducer(dropDownsReducer, initialDropDowns);

    const dropDownsHandler = {
        'countryId': onSelectCountry,
        //'cityId': () => { }
    };

    useEffect(() => {
        onFetchCountries();
    }, [onFetchCountries]);

    useEffect(() => {
        if (countries?.length > 0) {
            dispatchDropDowns({
                type: 'FILL_COUNTRIES',
                countries: countries
            });
        }
    }, [countries]);

    useEffect(() => {
        dispatchDropDowns({
            type: 'FILL_CITIES',
            cities: cities
        });
    }, [cities]);

    const selectDropDownHandler = useCallback((controlId, value) => {
        dispatchDropDowns({
            type: 'SELECT',
            id: controlId,
            value: value
        });

        if (dropDownsHandler[controlId]) {
            dropDownsHandler[controlId](value);
        }
    }, [dispatchDropDowns, dropDownsHandler]);

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
        setIsFormValid(ValidateForm(formControls));

        //if (dropDowns.selectedDropDown &&
        //    dropDownsHandler[dropDowns.selectedDropDown]) {
        //    dropDownsHandler[dropDowns.selectedDropDown](dropDowns[dropDowns.selectedDropDown].value);
        //}
    }, [dropDowns, setFormControls, setIsFormValid, ValidateForm]);

    const elementChangedHandler = (event, id) => {
        const updatedForm = getUpdatedForm(event, formControls, id);
        setFormControls(updatedForm);
        setIsFormValid(ValidateForm(updatedForm));
    };

    const elementLostFocusHandler = (event, id) => {
        setFormControls(getUpdatedForm(event, formControls, id));
    };

    const cancelHandler = useCallback(() => {
        if (id) {
            setRedirect(<Redirect to={`/hotels/${id}`} />);
        }
        else {
            setRedirect(<Redirect to="/hotels/" />);
        }
    }, [id, setRedirect]);

    const saveHandler = (event) => {
        event.preventDefault();
        props.onSignIn(formControls.email.value, formControls.password.value);
    };

    const deleteConfirmContent = useMemo(() => {
        return (
            <Modal show={showDeleteConfirm} type="confirm">
                <ConfirmDelete onOK={() => confirmDeleteHandler(true)}
                    onCancel={() => confirmDeleteHandler(false)} />
            </Modal>
        );
    }, [showDeleteConfirm]);

    const deleteHandler = useCallback(() => {
        setShowDeleteConfirm(true);
    }, [setShowDeleteConfirm]);

    const confirmDeleteHandler = useCallback((isConfirmed) => {
        if (isConfirmed) {
            //onDeleteHotel(id);
        }
        setShowDeleteConfirm(false);
    }, [id, setShowDeleteConfirm, onDeleteHotel]);

    const formElements = getFormElements(formControls).map(formElement => {
        return (
            <FormElement formElement={formElement}
                key={formElement.id}
                changed={(event) => elementChangedHandler(event, formElement.id)}
                lostFocus={(event) => elementLostFocusHandler(event, formElement.id)}
                selected={(value) => selectDropDownHandler(formElement.id, value)}
            />
        )
    });

    return (
        <div>
            {redirect}
            {deleteConfirmContent}

            <form onSubmit={saveHandler}>
                {formElements}

                {/*  <div className="form-group">
                    <label for="name">Name: </label>
                    <input type="text" id="name" name="name" className="form-control" required />
                </div>

                <div className="form-group">
               <label for="stars">Stars: </label>
                    <br />
                    <div id="stars" className='starrr'></div>
                </div>*/}

                <div className="row">
                    <div className="col-12 text-center">
                        <button className="btn btn-primary" type="reset" >Clear</button>
                        <button className="btn btn-success" type="submit" disabled={!isFormValid || loading} >Save</button>
                        <button className="btn btn-info" type="button">Photos</button>
                        <button className="btn btn-danger" type="button" > Delete</button >
                        <button className="btn btn-warning" type="button" onClick={cancelHandler} > Cancel</button >
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
        loading: state.common.isLoading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchHotel: (id) => dispatch(actions.fetchHotel(id)),
        onFetchCountries: () => dispatch(locationActions.fetchCountries()),
        onSelectCountry: (countryId) => dispatch(locationActions.selectCountry(countryId)),
        onSave: (id, hotel) => dispatch(actions.saveHotel(id, hotel)),
        onDeleteHotel: (id) => dispatch(actions.deleteHotel(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HotelEdit);