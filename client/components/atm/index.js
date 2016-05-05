'use strict';

import React, {Component} from 'react';
import Withdraw from '../withdraw';
import Returncard from '../returncard';
import Pin from '../pin';
import {} from './style.less';

// ATM Functionality:
// x Recieve number events
// x Clear event - remove last number from end of string
// x Cancel - clear string
// x Enter - Failure (Error message)
// x Obfuscate pin
// x Limit pin to 4 nums
// x Enter - Success with delay (Server API call if time, else just a timeout & spinner)
// x Only allow values in multiples of 10
 
class Atm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            state: 'insert',
            cash: '0'
        };
    }

    // State handler - this is the primary index which handles the state of the SPA. 
    // We do not need a router as users should not be able to traverse routes via the nav.

    // Info:
    // I have used simple event bubbling for components (data down, actions/events up).
    // For a project this simple I believe using Flux/Redux is not needed.

    componentDidMount() {
        let atm = document.getElementById('atm-component');
        atm.addEventListener('pinCorrect', this.pinCorrectHandler.bind(this), true);
        atm.addEventListener('cashSubmit', this.cashSubmitHandler.bind(this), true);
        atm.addEventListener('returnCard', this.returnCardHandler.bind(this), true);
        atm.addEventListener('reinputPin', this.reinputPinHandler.bind(this), true);
    }

    componentWillUnmount() {
        let atm = document.getElementById('atm-component');
        atm.removeEventListener('pinCorrect', this.pinCorrectHandler, true);
        atm.removeEventListener('cashSubmit', this.cashSubmitHandler, true);
        atm.removeEventListener('returnCard', this.returnCardHandler, true);
        atm.removeEventListener('reinputPin', this.reinputPinHandler, true);
    }

    pinCorrectHandler(e) {
        this.setState({state: 'withdraw'});
    }

    insertCardHandler(e) {
        this.setState({state: 'pin'});
    }

    cashSubmitHandler(e) {
        this.setState({state: 'gettingcash'});
        this.setState({cash: e.detail.cash.toString()});
        setTimeout(() => {
            this.setState({state: 'recieved'});
        }, 1000);
    }

    returnCardHandler(e) {
        this.setState({state: 'insert'});
    }

    newTransactionHandler(e) {
        this.setState({state: 'withdraw'});
    }

    reinputPinHandler(e) {
        this.setState({state: 'pin'});
    }

    // Info:
    // I would generally have a custom loading state/component (for server calls) and split each section down into a component.
    // However as some of the sections are so small I believe it is cleaner to include them here.
    
    render() {
        return (
            <div id="atm-component">
                {(() => {
                    if(this.state.state === 'insert'){
                        return (
                            <div>
                                <div className="row">
                                    <div className="col-md-6 col-md-offset-3">
                                        <button type="button" onClick={this.insertCardHandler.bind(this)} className="btn btn-primary btn-lg btn-block">Insert your PseudoBank card</button>
                                    </div>
                                </div>
                            </div>
                        )
                    } else if(this.state.state === 'withdraw'){
                        return (
                            <div>
                                <Withdraw/>
                                <Returncard/>
                                <div className="row">
                                    <div className="col-md-6 col-md-offset-3">
                                        <button type="button" onClick={this.reinputPinHandler.bind(this)} className="btn btn-primary btn-lg btn-block">Try putting my pin in again for some reason.</button>
                                    </div>
                                </div>
                            </div>
                        )
                    } else if(this.state.state === 'gettingcash') {
                        return (
                            <div>
                                <p>Please wait while we get your PseudoMoney.</p>
                                <div className="cash-loader" data-loader="circle"></div>
                            </div>
                        )
                    } else if(this.state.state === 'recieved') {
                        return (
                            <div>
                                <p>Please take your {this.state.cash} PseudoMoney.</p>
                                <p>Would you like to make another transaction?</p>
                                <div className="row">
                                    <div className="col-md-6 col-md-offset-3">
                                        <button type="button" onClick={this.newTransactionHandler.bind(this)} className="btn btn-primary btn-lg btn-block">Make another transaction.</button>
                                    </div>
                                </div>
                                <Returncard/> 
                            </div>
                        )
                    } else if(this.state.state === 'pin') {
                        return (
                            <div>
                                <Pin/>
                                <Returncard/>
                            </div>
                        )
                    }
                })()}
            </div>
            );
  }
}
 
export default Atm;