import React, { Component } from 'react';
import "./Card.css"

class Card extends Component {
    static defaultProps = {
        imgAlt: "ACE SPADES",
        imgSrc: "https://deckofcardsapi.com/static/img/AS.png",

    }
    render() {
        let {random,random2,random3} = this.props.random
        console.log(this.props.random === "holder")
        return (
            <div className="Card-body">
                {this.props.random !== "holder"
                    ?<img  style={{transform: `rotate(${90*random}deg) translate(${50*random2}px, ${30*random3}px)`}} alt={this.props.imgAlt} src={this.props.imgSrc} className="Card-cards"/>
                    :<div>
                        <img className="Card-holder" alt={this.props.imgAlt} src={this.props.imgSrc}/>
                        <h1>Card Deck</h1>
                    </div>
                }
                
                
            </div>
        )
    }
}

export default Card
