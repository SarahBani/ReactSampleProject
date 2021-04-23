import React, { useState, useEffect, useRef, Fragment } from 'react';

import classes from './DropDown.module.scss';
import { useCallback } from 'react';

const initialItem = { id: 0, text: '------' };

const DropDown = props => {

    const { data, title } = props;
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [label, setLabel] = useState(null);
    const [idAttribute, setIdAttribute] = useState(null);
    const itemListControl = useRef();

    useEffect(() => {
        let listItems = data.map(item =>
            <li className="dropdown-item" key={item.id} id={item.id}
                onClick={() => setSelectedItem(item)}>
                {item.imageUrl && <img src={item.imageUrl} />}
                {item.text}
            </li>);
        listItems.unshift(
            <li className="dropdown-item" key={initialItem.id} id={initialItem.id}
                onClick={() => setSelectedItem(initialItem)} style={{ paddingLeft: '30px' }}>
               {initialItem.text}
            </li>);
        setItems(listItems);

        if (title) {
            setLabel(<label htmlFor={title}>{title}: </label>);
            setIdAttribute(` id="{title}" `);
        }
    }, [data, title]);

    useEffect(() => {
        if (selectedItem) {
            props.onSelect(selectedItem.id);
        }
    }, [selectedItem]);

    const filterHandler = useCallback((event) => {
        const key = event.key.toLowerCase();
        const filteredData = data.filter(q => q["text"].toLowerCase().startsWith(key))
        if (filteredData.length > 0) {
            const ul = itemListControl.current;
            const li = ul.querySelector(`li[id="${filteredData[0].id}"]`);
            ul.scrollTop = li.offsetTop;
        }
    }, [data]);

    return (
        <Fragment>
            {label}
            <div id={title} className={["dropdown", classes.DropDown].join(' ')} onKeyDown={(event) => filterHandler(event)}>
                <button type="button" className="btn btn-secondary dropdown-toggle"
                    data-toggle="dropdown">
                    <div>{selectedItem?.text ?? initialItem.text}</div>
                </button>
                <ul ref={itemListControl} className="dropdown-menu">
                    {items}
                </ul>
            </div>
        </Fragment>
    );
};

export default DropDown;