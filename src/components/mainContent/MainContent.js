
import React from 'react';
import './MainContent.scss';
import Card from '../card/Card';
import { map } from 'rsvp';

class MainContent extends React.Component {



    createCards(amount) {

        let cards = [];

        for (let index = 0; index < amount; index++) {
            cards.push(<Card></Card>);
        }

        return cards;
    }

    render() {

        const cards = this.createCards(5);
        let arr = [1, 2, 3, 4, 5, 6, 7];

        return (
            <main className="main-content-container">

                { arr.map((val, index) => {

                    return <Card header = { val } key = {index}></Card>

                }
                    
                ) }

            </main>
        )
    }
}

export default MainContent;
