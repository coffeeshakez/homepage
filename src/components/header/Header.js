
import React from 'react';
import './Header.css';


class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: "Some fancy header here"
        };
    }

    render() {
        return (
            <header className="header">
                <h1> { this.state.text } </h1>
            </header>
        )
    }
}

export default Header;