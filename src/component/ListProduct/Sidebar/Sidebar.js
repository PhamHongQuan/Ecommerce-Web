import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MDBContainer, MDBListGroup, MDBListGroupItem, MDBRadio } from 'mdb-react-ui-kit';
import '../../Styles/Sidebar.css';

const SidebarItem = ({ label, itemKey, selectedItem, expandedItem, onItemClick, radioValues, onRadioChange }) => {
    const [expandedSubItems, setExpandedSubItems] = useState({
        price: false,
        size: false,
        gender: false
    });

    const handleSubItemClick = (subItem) => {
        setExpandedSubItems(prevState => ({
            ...prevState,
            [subItem]: !prevState[subItem]
        }));
    };

    return (
        <>
            <Link to={`/list-product/${itemKey}`} className="text-decoration-none">
                <MDBListGroupItem
                    className={`list-group-item parent-item ${selectedItem === itemKey ? 'active' : ''}`}
                    onClick={() => onItemClick(itemKey)}
                >
                    {label}
                </MDBListGroupItem>
            </Link>
            {expandedItem === itemKey && (
                <div className="child-item">
                    <div className="sub-item-box">
                        <div className="sub-item-heading" onClick={() => handleSubItemClick('price')}>Giá tiền</div>
                        {expandedSubItems.price && (
                            <>
                                <MDBRadio
                                    name={`${itemKey}-price`}
                                    id={`${itemKey}-price-above-2m`}
                                    label="Giá trên 2 triệu"
                                    value="above"
                                    checked={radioValues[itemKey].price === 'above'}
                                    onChange={() => onRadioChange(itemKey, 'price', 'above')}
                                />
                                <MDBRadio
                                    name={`${itemKey}-price`}
                                    id={`${itemKey}-price-below-2m`}
                                    label="Giá dưới 2 triệu"
                                    value="below"
                                    checked={radioValues[itemKey].price === 'below'}
                                    onChange={() => onRadioChange(itemKey, 'price', 'below')}
                                />
                            </>
                        )}
                    </div>
                    <div className="sub-item-box">
                        <div className="sub-item-heading" onClick={() => handleSubItemClick('size')}>Kích thước</div>
                        {expandedSubItems.size && (
                            <>
                                <MDBRadio
                                    name={`${itemKey}-size`}
                                    id={`${itemKey}-size-small`}
                                    label="35 - 37"
                                    value="small"
                                    checked={radioValues[itemKey].size === 'small'}
                                    onChange={() => onRadioChange(itemKey, 'size', 'small')}
                                />
                                <MDBRadio
                                    name={`${itemKey}-size`}
                                    id={`${itemKey}-size-medium`}
                                    label="38 - 41"
                                    value="medium"
                                    checked={radioValues[itemKey].size === 'medium'}
                                    onChange={() => onRadioChange(itemKey, 'size', 'medium')}
                                />
                                <MDBRadio
                                    name={`${itemKey}-size`}
                                    id={`${itemKey}-size-large`}
                                    label="42 - 45"
                                    value="large"
                                    checked={radioValues[itemKey].size === 'large'}
                                    onChange={() => onRadioChange(itemKey, 'size', 'large')}
                                />
                            </>
                        )}
                    </div>
                    <div className="sub-item-box">
                        <div className="sub-item-heading" onClick={() => handleSubItemClick('gender')}>Giới tính</div>
                        {expandedSubItems.gender && (
                            <>
                                <MDBRadio
                                    name={`${itemKey}-gender`}
                                    id={`${itemKey}-gender-male`}
                                    label="Nam"
                                    value="Nam"
                                    checked={radioValues[itemKey].gender === 'Nam'}
                                    onChange={() => onRadioChange(itemKey, 'gender', 'Nam')}
                                />
                                <MDBRadio
                                    name={`${itemKey}-gender`}
                                    id={`${itemKey}-gender-female`}
                                    label="Nữ"
                                    value="Nữ"
                                    checked={radioValues[itemKey].gender === 'Nữ'}
                                    onChange={() => onRadioChange(itemKey, 'gender', 'Nữ')}
                                />
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default function Sidebar({ onFilterChange }) {
    const [selectedItem, setSelectedItem] = useState(null);
    const [expandedItem, setExpandedItem] = useState(null);
    const [radioValues, setRadioValues] = useState({
        nike: { price: '', size: '', gender: '' },
        adidas: { price: '', size: '', gender: '' },
        lacoste: { price: '', size: '', gender: '' },
        puma: { price: '', size: '', gender: '' }
    });

    const handleItemClick = (item) => {
        setSelectedItem(item);
        setExpandedItem(expandedItem === item ? null : item);
    };

    const handleRadioChange = (item, attribute, value) => {
        const newRadioValues = {
            ...radioValues,
            [item]: {
                ...radioValues[item],
                [attribute]: value
            }
        };
        setRadioValues(newRadioValues);
        onFilterChange(newRadioValues);
    };

    const items = [
        { label: 'Nike', key: 'nike' },
        { label: 'Adidas', key: 'adidas' },
        { label: 'Lacoste', key: 'lacoste' },
        { label: 'Puma', key: 'puma' },
    ];

    return (
        <MDBContainer>
            <MDBListGroup>
                {items.map(item => (
                    <SidebarItem
                        key={item.key}
                        label={item.label}
                        itemKey={item.key}
                        selectedItem={selectedItem}
                        expandedItem={expandedItem}
                        onItemClick={handleItemClick}
                        radioValues={radioValues}
                        onRadioChange={handleRadioChange}
                    />
                ))}
            </MDBListGroup>
        </MDBContainer>
    );
}
