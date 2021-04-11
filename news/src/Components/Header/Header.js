import React from 'react';
import './Header.css';

const Header = ({categories, handleClick}) => {
    return (
        <header>
            <ul>
                {categories.map((item, index) => <li key={index} onClick={handleClick} title="click to filter news" data-type={item.type} data-value={item.value}>{item.value}</li>)}
            </ul>
        </header>
    )
}

export default Header;