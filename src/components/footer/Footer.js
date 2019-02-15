import React from 'react';
import './Footer.scss';

class Footer extends React.Component {


    constructor(props){
        super(props);
        this.state = {
            header: props.header
        }
    }
    
    render() {
        return (
            

            <footer className="flex-container black-container">

                <h1>Do not contact me</h1>

            </footer>
            
            

               
            
        );
    }
}

export default Footer;