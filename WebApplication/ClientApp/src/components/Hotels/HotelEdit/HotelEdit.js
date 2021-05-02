import { React, useState, useEffect, useCallback, useMemo, memo } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { getUpdatedForm, getFormElements, ValidateForm, getUpdatedControl, checkValidity } from '../../../shared/utility';
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

const initialDropDownData = {
    countries: [],
    cities: [],
    selectedCountryId: '',
    selectedCityId: '',
    selectedDropDown: '',
    selectedValue: ''
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
    },
    selectedDropDown: null
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
                },
                selectedDropDown: null
            };
        case 'FILL_CITIES':
            return {
                ...currentDropDowns,
                ['cityId']: {
                    options: getDropDownCitiesData(action.cities),
                    value: '',
                    valid: true
                },
                selectedDropDown: null
            };
        case 'SELECT':
            if (action.id === 'countryId') {
                return {
                    ...currentDropDowns,
                    ['countryId']: {
                        ...currentDropDown,
                        value: action.value,
                        valid: checkValidity(action.value.toString(), initialFormState['countryId'].validation)
                    },
                    ['cityId']: {
                        options: [],
                        value: '',
                        valid: true
                    },
                    selectedDropDown: 'countryId'
                };
            }
            else {
                return {
                    ...currentDropDowns,
                    ['cityId']: {
                        ...currentDropDown,
                        value: action.value,
                        valid: checkValidity(action.value.toString(), initialFormState['cityId'].validation)
                    },
                    selectedDropDown: 'cityId'
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

const dropDownDataReducer = (currentDropDownData, action) => {
    let data;
    switch (action.type) {
        case 'FILL_COUNTRIES':
            data = action.countries.map(country => {
                const flagUrl = '/images/' + (country.flagUrl ? 'countries/' + country.flagUrl : 'no-image.png');
                return {
                    id: country.id,
                    text: country.name,
                    imageUrl: flagUrl,
                };
            });
            return {
                ...currentDropDownData,
                countries: data,
                cities: [],
                selectedCountryId: '',
                selectedCityId: '',
                selectedDropDown: '',
                selectedValue: ''
            };
        case 'FILL_CITIES':
            data = action.cities.map(city => ({
                id: city.id,
                text: city.name
            }));
            return {
                ...currentDropDownData,
                cities: data,
                selectedCityId: '',
                selectedDropDown: '',
                selectedValue: ''
            };
        //case 'SELECT_COUNTRY':
        case 'SELECT':
            if (action.id === 'countryId') {
                return {
                    ...currentDropDownData,
                    cities: [],
                    selectedCountryId: action.value,
                    selectedCityId: '',
                    selectedDropDown: 'countryId',
                    selectedValue: action.value
                };
            }
            else {
                return {
                    ...currentDropDownData,
                    selectedCityId: action.value,
                    selectedDropDown: 'cityId',
                    selectedValue: action.value
                };
            }
        default:
            return currentDropDownData;
    }
};

const HotelEdit = props => {

    const {
        id, loading, countries, cities, onFetchCountries, onSelectCountry, onDeleteHotel
    } = props;
    const [formControls, setFormControls] = useState(initialFormState);
    const [isFormValid, setIsFormValid] = useState(false);
    const [redirect, setRedirect] = useState();
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
   // const [dropDownData, dispatchDropDownData] = useReducer(dropDownDataReducer, initialDropDownData);
    const [dropDowns, dispatchDropDowns] = useReducer(dropDownsReducer, initialDropDowns);

    useEffect(() => {
        onFetchCountries();
    }, [onFetchCountries]);

    useEffect(() => {
        if (countries?.length > 0) {
            dispatchDropDown({
                type: 'FILL_COUNTRIES',
                countries: countries
            });
        }
    }, [countries]);

    useEffect(() => {
        dispatchDropDown({
            type: 'FILL_CITIES',
            cities: cities
        });
    }, [cities]);

    //useEffect(() => {
    //    let updatedForm = {
    //        ...formControls,
    //        ['countryId']: {
    //            ...formControls['countryId'],
    //            options: dropDownData.countries,
    //            value: dropDownData.selectedCountryId,
    //        },
    //        ['cityId']: {
    //            ...formControls['cityId'],
    //            options: dropDownData.cities,
    //            value: dropDownData.selectedCityId
    //        }
    //    };
    //    if (dropDownData.selectedDropDown) {
    //        const selectedControlId = dropDownData.selectedDropDown;
    //        const isControlValid = checkValidity(dropDownData.selectedValue.toString(),
    //            updatedForm[selectedControlId].validation)
    //        updatedForm = {
    //            ...updatedForm,
    //            [selectedControlId]: {
    //                ...formControls[selectedControlId],
    //                valid: isControlValid
    //            }
    //        };
    //    }
    //    setFormControls(updatedForm);
    //    setIsFormValid(ValidateForm(formControls));

    //    if (dropDownData.selectedDropDown &&
    //        dropDownHandlers[dropDownData.selectedDropDown]) {
    //        dropDownHandlers[dropDownData.selectedDropDown](dropDownData.selectedValue);
    //    }
    //}, [dropDownData]);

    useEffect(() => {
        const updatedForm = {
            ...formControls,
            ['countryId']: {
                ...formControls['countryId'],
                ...dropDown.countryId
            },
            ['cityId']: {
                ...formControls['cityId'],
                ...dropDown.cityId
            }
        };
        setFormControls(updatedForm);
        setIsFormValid(ValidateForm(formControls));

        if (dropDown.selectedDropDown &&
            dropDownHandlers[dropDown.selectedDropDown]) {
            dropDownHandlers[dropDown.selectedDropDown](dropDown[dropDown.selectedDropDown].value);
        }
    }, [dropDown]);

    const dropDownHandlers = {
        'countryId': onSelectCountry,
        //'cityId': () => { }
    };

    const dropDowns = {
        'countryId': {
            selectHandler: onSelectCountry,
            selectedValue: ''
        },
        'cityId': {
            //selectHandler: () => { },
            selectedValue: ''
        },
    };

    const selectDropDownHandler = (controlId, value) => {
        //dispatchDropDownData({
        //    type: 'SELECT',
        //    id: controlId,
        //    value: value
        //});
        dispatchDropDown({
            type: 'SELECT',
            id: controlId,
            value: value
        });
    };

    //useEffect(() => {
    //    if (dropDownSelected) {
    //        const updatedForm = getUpdatedForm(dropDownSelected.value.toString(),
    //            formControls, dropDownSelected.controlId);
    //        setFormControls(updatedForm);
    //        setIsFormValid(ValidateForm(formControls));

    //        if (dropDowns[dropDownSelected.controlId].selectHandler) {
    //            dropDowns[dropDownSelected.controlId].selectHandler(dropDownSelected.value);
    //        }
    //    }
    //}, [dropDownSelected]);

    const elementChangedHandler = (event, id) => {
        const updatedForm = getUpdatedForm(event.target.value, formControls, id);
        setFormControls(updatedForm);
        setIsFormValid(ValidateForm(updatedForm));
    };

    const elementLostFocusHandler = (event, id) => {
        setFormControls(getUpdatedForm(event.target.value, formControls, id));
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
                //selected={(value) => setDropDownSelected({ controlId: formElement.id, value: value })}
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