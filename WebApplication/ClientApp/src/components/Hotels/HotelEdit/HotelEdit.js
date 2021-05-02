import { React, useState, useEffect, useCallback, useMemo } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { getUpdatedForm, getFormElements, ValidateForm, getUpdatedControl } from '../../../shared/utility';
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
        elementType: 'select',
        elementConfig: {
            title: 'Country',
            placeholder: 'Country',
        },
        //options: [],
        value: '',
        validation: {
            required: true
        },
        valid: true
    },
    cityId: {
        elementType: 'select',
        elementConfig: {
            title: 'City',
            placeholder: 'City',
        },
        options: [],
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
    //address: {
    //    elementType: 'textarea',
    //    elementConfig: {
    //        placeholder: 'Address',
    //    },
    //    value: '',
    //    validation: {
    //    },
    //    valid: true
    //},
};

const formControlsReducer = (currentFormControls, action) => {
    let dropDownData;
    switch (action.type) {
        case 'FILL_COUNTRIES':
            dropDownData = action.countries.map(country => {
                const flagUrl = '/images/' + (country.flagUrl ? 'countries/' + country.flagUrl : 'no-image.png');
                return {
                    id: country.id,
                    text: country.name,
                    imageUrl: flagUrl
                };
            });
            return {
                ...currentFormControls,
                ['countryId']: {
                    ...currentFormControls['countryId'],
                    options: dropDownData
                },
                ['cityId']: {
                    ...currentFormControls['cityId'],
                    options: []
                }
            };
        case 'FILL_CITIES':
            dropDownData = action.cities.map(city => ({
                id: city.id,
                text: city.name
            }));
            return {
                ...currentFormControls,
                ['cityId']: {
                    ...currentFormControls['cityId'],
                    options: dropDownData
                }
            };
        case 'SELECT_DROP_DOWN':
            return {
                ...currentFormControls,
                [action.controlId]: {
                    ...currentFormControls[action.controlId],
                    options: currentFormControls[action.controlId].options
                }
            };
        //case 'UPDATE_CONTROL':
        //    console.log(currentFormControls);
        //    return {
        //        ...currentFormControls,
        //        [action.controlId]: action.updatedControl,
        //    };
        //case 'VALIDATE':
        //    return {
        //        ...currentFormControls,
        //        [action.controlId]: action.updatedControl,
        //    };
        default:
            return {
                ...currentFormControls
            };
    }
};

const initialDropDownData = {
    countries: [],
    cities: []
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
                    imageUrl: flagUrl
                };
            });
            return {
                ...currentDropDownData,
                countries: data,
                cities: []
            };
        case 'FILL_CITIES':
            data = action.cities.map(city => ({
                id: city.id,
                text: city.name
            }));
            return {
                ...currentDropDownData,
                cities: data
            };
        default:
            return {
                ...currentDropDownData,
            };
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
    //const [countriesData, setCountriesData] = useState([]);
    //const [formControls, dispatchFormControls] = useReducer(formControlsReducer, initialFormState);
    const [dropDownData, dispatchDropDownData] = useReducer(dropDownDataReducer, initialDropDownData);

    useEffect(() => {
        onFetchCountries();
    }, [onFetchCountries]);

    useEffect(() => {
        if (countries?.length > 0) {
            dispatchDropDownData({
                type: 'FILL_COUNTRIES',
                countries: countries
            });
            //dispatchFormControls({
            //    type: 'FILL_COUNTRIES',
            //    countries: countries
            //});
            //const dropDownData = countries.map(country => {
            //    const flagUrl = '/images/' + (country.flagUrl ? 'countries/' + country.flagUrl : 'no-image.png');
            //    return {
            //        id: country.id,
            //        text: country.name,
            //        imageUrl: flagUrl
            //    };
            //});
            //setCountriesData(dropDownData);
            //const updatedForm = {
            //    ...formControls,
            //    ['countryId']: {
            //        ...formControls['countryId'],
            //        options: dropDownData
            //    },
            //    ['cityId']: {
            //        ...formControls['cityId'],
            //        options: []
            //    }
            //};
            //setFormControls(updatedForm);
        }
    }, [countries]);

    //useEffect(() => {
    //    const updatedForm = {
    //        ...formControls,
    //        ['countryId']: {
    //            ...formControls['countryId'],
    //            options: countriesData
    //        },
    //        ['cityId']: {
    //            ...formControls['cityId'],
    //            options: []
    //        }
    //    };
    //    setFormControls(updatedForm);
    //}, [countriesData]);

    useEffect(() => {
        console.log(33333333);
        console.log(dropDownData);
        const updatedForm = {
            ...formControls,
            ['countryId']: {
                ...formControls['countryId'],
                options: dropDownData.countries
            },
            ['cityId']: {
                ...formControls['cityId'],
                options: dropDownData.cities
            }
        };
        setFormControls(updatedForm);
    }, [dropDownData]);

    useEffect(() => {
        //dispatchFormControls({
        //    type: 'FILL_CITIES',
        //    cities: cities
        //});
        dispatchDropDownData({
            type: 'FILL_CITIES',
            cities: cities
        });
        //        const dropDownData = cities.map(city => ({
        //            id: city.id,
        //            text: city.name
        //        }));
        //        const updatedForm = {
        //            ...formControls,
        //            ['cityId']: {
        //                ...formControls['cityId'],
        //                options: dropDownData
        //            }
        //        };
        //        console.log(updatedForm);
        //        setFormControls(updatedForm);

    }, [cities]);

    const selectCountryHandler = useCallback((countryId, id) => {
        const updatedForm = getUpdatedForm(countryId.toString(), formControls, id);
        //console.log(updatedForm);
        //const updatedControl = getUpdatedControl(countryId.toString(), formControls[id]);
        //dispatchFormControls({
        //    type: 'SELECT_DROP_DOWN',
        //    controlId: id,
        //    updatedControl: updatedControl
        //});
        setFormControls(updatedForm);
        //setIsFormValid(ValidateForm(updatedForm));
        setIsFormValid(ValidateForm(formControls));

        onSelectCountry(countryId);
    }, [getUpdatedForm, onSelectCountry]);

    //const selectCityHandler = useCallback((cityId) => {
    //    onSelectCity(cityId);
    //    props.changeCity(cityId);
    //}, [onSelectCity]);

    const selectDropDownHandler = {
        'countryId': selectCountryHandler,
        'cityId': () => { }
    };

    const elementChangedHandler = (event, id) => {
        //const updatedForm = getUpdatedForm(event.target.value, formControls, id);
        //setFormControls(updatedForm);
        //setIsFormValid(ValidateForm(updatedForm));
    };

    const elementLostFocusHandler = (event, id) => {
        //setFormControls(getUpdatedForm(event.target.value, formControls, id));
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
                selected={(value) => selectDropDownHandler[formElement.id](value, formElement.id)}
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