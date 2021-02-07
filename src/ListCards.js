import React, { Component } from 'react';
import axios from "axios";
import Card from "./Card";
import "./ListCards.css"

class ListCards extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            collected_cards: Array.from({ length: 0 }),
            deck_id: "",
            remaining : "",
            value: "",
            suit: "",
            image: "",
            success : true
        }
        this.getCard=this.getCard.bind(this);
        this.reset=this.reset.bind(this);
    }
    async componentDidMount(){
        let data = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/");
        let {deck_id, remaining} = data.data;
        this.setState({deck_id: deck_id, remaining: remaining});
    }
    async getCard(){
        let data = await axios.get(`https://deckofcardsapi.com/api/deck/${this.state.deck_id}/draw/`);
        let {success, remaining} = data.data 
        if(success){
            let {value, suit, image} = data.data.cards[0];
            let random = Math.random()-0.5;
            let random2 = Math.random()-0.5;
            let random3 = Math.random()-0.5;
            this.setState(st=>{
                let newArr = st.collected_cards.slice();
                newArr.push({ image: image, alt:`${value} ${suit}`, random: {random, random2, random3}});
                return {value: value, suit: suit, image: image,remaining: remaining , collected_cards: newArr}
            })
        }else if(!success && remaining === 0){
            this.setState({success: success})
            alert("No cards left, take new deck");
        }
    }

    async reset(){
        let data = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/");
        let {deck_id, remaining} = data.data;
        this.setState({
            deck_id: deck_id,
            remaining: remaining,
            collected_cards: Array.from({ length: 0 }),
            remaining : "",
            value: "",
            suit: "",
            image: "",
            success : true
        })
    }
   

    render() {
        const {value, suit, image, collected_cards, success} = this.state

        const cards = this.state.value === ""? <Card key={"holder"} random={"holder"}/>:
        collected_cards.map(val=>{
            return <Card key={val.alt} imgAlt={val.alt} imgSrc={val.image} random={val.random}/>
        })
        return (
            <div className="ListCards-body">
                <div className="ListCards-cards-container">
                    {cards}
                </div>
                <button className="ListCards-button" onClick={success?this.getCard:this.reset}>
                    {value === ""?"Open Deck":success?"Get New Card":"Take New Deck"}</button>
            </div>
        )
    }
}

export default ListCards;