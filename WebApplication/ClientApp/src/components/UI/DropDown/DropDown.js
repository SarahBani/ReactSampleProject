import React, { useState, useEffect, useCallback, useRef, Fragment } from 'react';

import classes from './DropDown.module.scss';
import { useMemo } from 'react';

const DropDown = props => {

    const { data, title } = props;
    const initialItem = {
        id: '',
        text: props.placeholder ? '--- Select ' + props.placeholder + ' ---' : '------'
    };
    const [selectedItem, setSelectedItem] = useState(null);
    const [label, setLabel] = useState(null);
    const [idAttribute, setIdAttribute] = useState(null);
    const itemListControl = useRef();

    const listItems = useMemo(() => {
        const list = data?.map(item =>
            <li className="dropdown-item" key={item.id} id={item.id}
                onClick={() => selectHandler(item)}>
                {item.imageUrl && <img src={item.imageUrl} />}
                {item.text}
            </li>);
        list?.unshift(
            <li className="dropdown-item" key={initialItem.id} id={initialItem.id}
                onClick={() => selectHandler(initialItem)}
            /*style={{ paddingLeft: '30px' }}*/ >
                {initialItem.text}
            </li>);
        return list;
    }, [data]);

    useEffect(() => {
        if (title) {
            setLabel(<label htmlFor={title}>{title}: </label>);
            setIdAttribute(` id="{title}" `);
        }
    }, [title]);

    const selectHandler = useCallback((item) => {
        setSelectedItem(item);
        props.onSelect(item?.id);
    }, [setSelectedItem]);

    const filterHandler = useCallback((event) => {
        const key = event.key.toLowerCase();
        const filteredData = data?.filter(q => q["text"].toLowerCase().startsWith(key))
        if (filteredData.length > 0) {
            const ul = itemListControl.current;
            const li = ul.querySelector(`li[id="${filteredData[0].id}"]`);
            ul.scrollTop = li.offsetTop;
        }
    }, [data]);

    return (
        <Fragment>
            {label}
            <div id={title} className={["dropdown", classes.DropDown].join(' ')}
                onKeyDown={(event) => filterHandler(event)}>
                <button type="button" className="btn dropdown-toggle"
                    data-toggle="dropdown">
                    <div>{selectedItem?.text ?? initialItem.text}</div>
                </button>
                <ul ref={itemListControl} className="dropdown-menu">
                    {listItems}
                </ul>
            </div>
        </Fragment>
    );
};

export default DropDown;