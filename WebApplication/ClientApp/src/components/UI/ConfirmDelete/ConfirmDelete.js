import { React } from 'react';

import classes from './ConfirmDelete.module.scss';

const ConfirmDelete = props => {
    return (
        <div className={["container", classes.ConfirmDelete].join(' ')}>
            <div className="row text-left">
                <div className="col-12">
                    <span>Are you sure to delete this item?</span>
                </div>
            </div>
            <br />
            <div className="row">
                <div className="col-12 text-right">
                    <button className="btn btn-danger" type="button" onClick={props.onOK}>Yes</button >
                    <button className="btn btn-warning" type="button" onClick={props.onCancel}> No</button >
                </div>
            </div>
        </div>
    );
};

export default ConfirmDelete;