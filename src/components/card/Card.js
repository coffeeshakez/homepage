import React from 'react';
import './Card.scss';


class Card extends React.Component {


    constructor(props){
        super(props);
        this.state = {
            header: props.header
        }
    }

    render() {
        return (
            <div className="card">
               <div className="flex-container-column">
                    <h1 className="card-header"> { this.state.header } </h1>
                    <p className="card-content">Her står det fine ting om ting og tang og sånne ting ogsånn</p>
                    <img width="100%" height="250px" src="./test.png"></img>
                </div>
            </div>
        );
    }
}

export default Card;
