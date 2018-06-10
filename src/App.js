import React, { Component } from "react";
import MatchCard from "./components/Card";
import Wrapper from "./components/Wrapper";
import Title from "./components/Header";
import matches from "./card.json";
import "./App.css";

let correctGuesses = 0;
let bestScore = 0;
let clickMessage = "Don't click the same card twice!";

class App extends Component {
    
    // Setting this.state.matches to the matches json array
    state = {
        matches,
        correctGuesses,
        bestScore,
        clickMessage
    };

    setClicked = id => {

       // Got assistance with this section from Tutor 
        const matches = this.state.matches;

        // Filter for the clicked match
        const clickedMatch = matches.filter(match => match.id === id);

        // If the matched image's clicked value is already true, 
        // game over 
        if (clickedMatch[0].clicked){

            console.log ("Correct Guesses: " + correctGuesses);
            console.log ("Top Jedi Score: " + bestScore);

            correctGuesses = 0;
            clickMessage = "Failed you Have, Start over you must"

            for (let i = 0 ; i < matches.length ; i++){
                matches[i].clicked = false;
            }

            this.setState({clickMessage});
            this.setState({ correctGuesses });
            this.setState({matches});

        // Otherwise, if clicked = false
        } else if (correctGuesses < 21) {

            // Set to true
            clickedMatch[0].clicked = true;

            // increment counter
            correctGuesses++;
            
            clickMessage = "Keep Going you Must!";

            if (correctGuesses > bestScore){
                bestScore = correctGuesses;
                this.setState({ bestScore });
            }
           
            clickMessage = "The Force is strong with you;"

            // Shuffle the array to be rendered in a random order
            matches.sort(function(a, b){return 0.5 - Math.random()});

            // Set this.state.matches equal to the new matches array
            this.setState({ matches });
            this.setState({correctGuesses});
            this.setState({clickMessage});
        } else {

            // Set to true
            clickedMatch[0].clicked = true;

            // restarts
            correctGuesses = 0;

           // this makes the user try again
            clickMessage = "You are a Jedi Master";
            bestScore = 12;
            this.setState({ bestScore });
            
            for (let i = 0 ; i < matches.length ; i++){
                matches[i].clicked = false;
            }

            // Shuffle the array 
            matches.sort(function(a, b){return 0.5 - Math.random()});

            // Set this.state.matches equal to new array
            this.setState({ matches });
            this.setState({correctGuesses});
            this.setState({clickMessage});

        }
    };

    render() {
        return (
            <Wrapper>
                <Title>Clicky Wars from a long long long time ago!</Title>
        
                <h3 className="scoreSummary">
                    {this.state.clickMessage}
                </h3>
                
                <h3 className="scoreSummary">
                    Correct Guesses: {this.state.correctGuesses} 
                    <br />
                    Best Score: {this.state.bestScore} 
                </h3>

                {this.state.matches.map(match => (
                    <MatchCard
                        setClicked={this.setClicked}
                        id={match.id}
                        key={match.id}
                        image={match.image}
                    />
                ))}
            </Wrapper>
        );
    }
}

export default App;