import { React } from 'react';
import { useHistory } from 'react-router-dom';

const HotelEdit = props => {

    const history = useHistory();

    const cancelHandler = () => {
        history.goBack();
    };

    return (
        <div>
            <form>
                <div className="row">
                    <button className="btn btn-primary" type="reset" >Clear</button>
                    <button className="btn btn-success" type="submit" >Save</button>
                    <button className="btn btn-info" type="button">Photos</button>
                    <button className="btn btn-danger" type="button" > Delete</button >
                    <button className="btn btn-warning" type="button" onClick={cancelHandler} > Cancel</button >
                </div >
            </form >
        </div >
    );
};

export default HotelEdit;