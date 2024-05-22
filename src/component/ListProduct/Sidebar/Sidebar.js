import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MDBContainer, MDBListGroup, MDBListGroupItem, MDBRadio } from "mdb-react-ui-kit";
import "../../Styles/Sidebar.css";

export default function Sidebar() {
    const [selectedItem, setSelectedItem] = useState(null);
    const [expandedItem, setExpandedItem] = useState(null); // State to track which item is expanded
    const [radioValues, setRadioValues] = useState({
        nike: '',
        adidas: '',
        lacoste: '',
        puma: ''
    });

    const handleItemClick = (item) => {
        setSelectedItem(item);
        setExpandedItem(expandedItem === item ? null : item); // Toggle the expanded item
    };

    const handleRadioChange = (item, value) => {
        setRadioValues(prevValues => ({
            ...prevValues,
            [item]: value
        }));
    };

    return (
        <MDBContainer>
            <MDBListGroup>
                <Link to="/list-product/nike" className="text-decoration-none">
                    <MDBListGroupItem
                        className={`list-group-item ${selectedItem === 'nike' ? 'active' : ''}`}
                        onClick={() => handleItemClick('nike')}
                    >
                        Nike
                    </MDBListGroupItem>
                </Link>
                {expandedItem === 'nike' && (
                    <div className="pl-4">
                        <MDBRadio
                            name="nike-price"
                            id="nike-price-above-2m"
                            label="Giá trên 2 triệu"
                            value="above"
                            checked={radioValues.nike === 'above'}
                            onChange={() => handleRadioChange('nike', 'above')}
                        />
                        <MDBRadio
                            name="nike-price"
                            id="nike-price-below-2m"
                            label="Giá dưới 2 triệu"
                            value="below"
                            checked={radioValues.nike === 'below'}
                            onChange={() => handleRadioChange('nike', 'below')}
                        />
                    </div>
                )}

                <Link to="/list-product/adidas" className="text-decoration-none">
                    <MDBListGroupItem
                        className={`list-group-item ${selectedItem === 'adidas' ? 'active' : ''}`}
                        onClick={() => handleItemClick('adidas')}
                    >
                        Adidas
                    </MDBListGroupItem>
                </Link>
                {expandedItem === 'adidas' && (
                    <div className="pl-4">
                        <MDBRadio
                            name="adidas-price"
                            id="adidas-price-above-2m"
                            label="Giá trên 2 triệu"
                            value="above"
                            checked={radioValues.adidas === 'above'}
                            onChange={() => handleRadioChange('adidas', 'above')}
                        />
                        <MDBRadio
                            name="adidas-price"
                            id="adidas-price-below-2m"
                            label="Giá dưới 2 triệu"
                            value="below"
                            checked={radioValues.adidas === 'below'}
                            onChange={() => handleRadioChange('adidas', 'below')}
                        />
                    </div>
                )}

                <Link to="/list-product/lacoste" className="text-decoration-none">
                    <MDBListGroupItem
                        className={`list-group-item ${selectedItem === 'lacoste' ? 'active' : ''}`}
                        onClick={() => handleItemClick('lacoste')}
                    >
                        Lacoste
                    </MDBListGroupItem>
                </Link>
                {expandedItem === 'lacoste' && (
                    <div className="pl-4">
                        <MDBRadio
                            name="lacoste-price"
                            id="lacoste-price-above-2m"
                            label="Giá trên 2 triệu"
                            value="above"
                            checked={radioValues.lacoste === 'above'}
                            onChange={() => handleRadioChange('lacoste', 'above')}
                        />
                        <MDBRadio
                            name="lacoste-price"
                            id="lacoste-price-below-2m"
                            label="Giá dưới 2 triệu"
                            value="below"
                            checked={radioValues.lacoste === 'below'}
                            onChange={() => handleRadioChange('lacoste', 'below')}
                        />
                    </div>
                )}

                <Link to="/list-product/puma" className="text-decoration-none">
                    <MDBListGroupItem
                        className={`list-group-item ${selectedItem === 'puma' ? 'active' : ''}`}
                        onClick={() => handleItemClick('puma')}
                    >
                        Puma
                    </MDBListGroupItem>
                </Link>
                {expandedItem === 'puma' && (
                    <div className="pl-4">
                        <MDBRadio
                            name="puma-price"
                            id="puma-price-above-2m"
                            label="Giá trên 2 triệu"
                            value="above"
                            checked={radioValues.puma === 'above'}
                            onChange={() => handleRadioChange('puma', 'above')}
                        />
                        <MDBRadio
                            name="puma-price"
                            id="puma-price-below-2m"
                            label="Giá dưới 2 triệu"
                            value="below"
                            checked={radioValues.puma === 'below'}
                            onChange={() => handleRadioChange('puma', 'below')}
                        />
                    </div>
                )}
            </MDBListGroup>
        </MDBContainer>
    );
}
