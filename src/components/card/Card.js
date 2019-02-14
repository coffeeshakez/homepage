import React from 'react';
import styles from './Card';


class Card extends React.Component {
    state = {  }
    render() { 
        return (  

            <div className= { styles.card }>
                <h1 className={ styles.cardHeader }>Lorem ipsum</h1>
                <p className= {styles.cardContent }>Her står det fine ting om ting og tang og sånne ting ogsånn</p>

            </div>
        );
    }
}
 
export default Card;
