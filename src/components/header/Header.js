
import React from 'react';
import './Header.css';


class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: "WHÆT."
        };
    }

    render() {
        return (
            <header className="header">
                <h1 className="header-text"> {this.state.text} </h1>
            </header>
        )
    }
}

export default Header;

