
import React from 'react';
import './MainContent.scss';
import Card from '../card/Card';

class MainContent extends React.Component {

    render() {

        let arr = ["Hello", "Bonjour", "Hei", "Kek", "Lel", "Bop", "Tho"];

        return (
            <main className="main-content-container">
                {arr.map((val, index) => {
                    return <Card header={val} key={index}></Card>
                })}
            </main>
        )
    }
}

export default MainContent;
