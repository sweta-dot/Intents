import { Component } from 'react';
import './intent.css';

class Intent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            intents: props.intents,
            selectedIntents: []
        }
    }

    //getting all the expressions or user messages samples for an intent
    getIntentExpressions(expressions) {
        let expressionsElem = [];
        for (var expression of expressions) {
            expressionsElem.push(
                    <li key={expression.id}>{expression.text}</li>
            )
        }
        return expressionsElem;
    }

    //showing details on view details click
    onShowMore(e) {
        let updatedIntents = this.state.intents.map((intent) => {
            if (e.target.id === intent.id) {
                intent.showMore = !intent.showMore;
            }
            return intent;
        })
        this.setState({
            intents: updatedIntents
        })
    }

    //on single intent select
    onIntentSelect(intent) {
        let updatedSelectedIntent = this.state.selectedIntents || [];
        let index = 0;
        let updatedIntents = this.state.intents.map((el)=> {
            if(el.id === intent.id){
                el.checked = !el.checked
            }
            return el;
        })
        // for(let selIntent of selectedIntents){
        //     if(intent.id === selIntent.id && !intent.checked){

        //     } else {
        //         updatedSelectedIntent.push(selIntent)
        //     }
        // }
        if(intent.checked){
            updatedSelectedIntent.push(intent);
        } else {
            for(let ind in updatedSelectedIntent) {
                if(updatedSelectedIntent[ind].id === intent.id){
                    index = ind;
                    break;
                }
            }
            updatedSelectedIntent.splice(index, 1);
        }
        this.setState({
            selectedIntents: updatedSelectedIntent,
            intents: updatedIntents
        })
        console.log('selected intents', updatedSelectedIntent);
    }

    //returning the intents DOM(table body)
    getIntents() {
        let intentsElem = [];
        const intents = this.state.intents;
        for (let intent of intents) {
            intentsElem.push(
                <>
                    <tr key={intent.id}>
                        <td className='intents'>
                            <input type="checkbox" name="intent" checked={intent.checked ?? false} value={intent.id} onChange={() => this.onIntentSelect(intent)} />
                            <span>{intent.name}</span>
                        </td>
                        <td className='description'>
                            <span>{intent.description}</span>
                        </td>
                        <td className='example'>
                            <span>{intent.trainingData.expressions[0].text}</span>
                        </td>
                        <td className='action'>
                            <button className='show-more' id={intent.id} onClick={(e) => this.onShowMore(e)}>View Details</button>
                        </td>
                    </tr>
                    {
                        intent.showMore
                            ? <tr key={intent.id + "-details"}>
                                <td className='details' colSpan='4'>
                                    <div className='user-messages'>
                                        <label><b>Sample messages from the user -</b></label>
                                        {
                                            this.getIntentExpressions(intent.trainingData.expressions)
                                        }
                                    </div>
                                    <div className='bot-messages'>
                                        <label><b>Reply from Bot-</b></label>
                                        <li key={intent.reply.id}>{intent.reply.text}</li>
                                    </div>
                                </td>
                              </tr>
                            : null
                    }
                </>
            )
        }
        return intentsElem;
    }

    //on all intents select
    selectAll(event) {
        let selectedIntents = [];
        let updatedIntents = this.state.intents.map((intent) => {
            intent.checked = event.target.checked;
            return intent;
        })
        if(event.target.checked){
            selectedIntents = this.state.intents;
        }      
        this.setState({
            intents: updatedIntents,
            selectedIntents: selectedIntents
        })
        console.log('selected intents', selectedIntents);
    }

    render() {
        return (
            <table className='table'>
                <thead>
                    <tr>
                        <th className='intents'>
                            <input type="checkbox" onClick={(e) => this.selectAll(e)} /> Intents
                        </th>
                        <th className='description'>Intent Description</th>
                        <th className='example'>Sample User Message</th>
                        <th className='action'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.getIntents()
                    }
                </tbody>
            </table>
        )
    }
}

export default Intent;