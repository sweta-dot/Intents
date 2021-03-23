import { Component } from 'react';
import Intent from './Intent';
import intents from '../config/intents.json';

class LandingPage extends Component{

    render() {
        return(
            <div>
                <h1>Intents</h1>
                <Intent intents={intents}/>
            </div>
        )
    }
}

export default LandingPage;