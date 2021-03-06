import React, { useState, useEffect, useCallback, useRef, Fragment } from 'react';

import classes from './DropDown.module.scss';
import { useMemo } from 'react';

const DropDown = props => {

    const { data, title, value, onSelect } = props;
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
            <li className={['dropdown-item', (selectedItem?.id === item.id ? classes.SelecedItem : '')].join(' ')}
                key={item.id} id={item.id} onClick={() => selectHandler(item)}>
                {item.imageUrl && <img src={item.imageUrl} />}
                {item.text}
            </li>);
        list?.unshift(
            <li className={['dropdown-item', (!selectedItem ? classes.SelecedItem : '')].join(' ')}
                key={initialItem.id} id={initialItem.id} onClick={() => selectHandler(initialItem)}
            /*style={{ paddingLeft: '30px' }}*/ >
                {initialItem.text}
            </li>);
        return list;
    }, [data, selectedItem]);

    useEffect(() => {
        if (data?.length === 0) {
            setSelectedItem();
        }
        else
        {
            if (value != '') {
                const item = data?.filter(q => q['id'] === value)[0];
                setSelectedItem(item);
            }
            else {
                setSelectedItem();
            }
        }
    }, [data]);

    useEffect(() => {
        if (title) {
            setLabel(<label htmlFor={title}>{title}: </label>);
            setIdAttribute(` id="{title}" `);
        }
    }, [title]);

    const selectHandler = useCallback((item) => {
        setSelectedItem(item);
        onSelect(item?.id);
    }, [onSelect, setSelectedItem]);

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
                    data-toggle="dropdown" disabled={props.disabled}>
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