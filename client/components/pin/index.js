'use strict';

import React, {Component} from 'react';
import Keypad from '../keypad'
import Withdraw from '../withdraw'
 
class Pin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            primaryMsg: 'Please enter your PseudoBank PIN.',
            pin: '',
            errorMsg: '',
            canWithdraw: false,
            cashInput: '0'
        };
    }

    // Functionality:
    // x Recieve number events
    // x Clear event - remove last number from end of string
    // x Cancel - clear string
    // Enter - Success / Failure - with delay (Server API call if time, else just a timeout & spinner)
    // x Enter - Failure Error message
    // x Obfuscate pin
    // x Limit pin to 4 nums

    componentDidMount() {
        let keypad = document.getElementById('keypad');
        keypad.addEventListener('numPress', this.numEventHandler.bind(this));
        keypad.addEventListener('clearPress', this.clearEventHandler.bind(this));
        keypad.addEventListener('cancelPress', this.cancelEventHandler.bind(this));
        keypad.addEventListener('enterPress', this.enterEventHandler.bind(this));
    }

    componentWillUnmount() {
        let keypad = document.getElementById('keypad');
        keypad.removeEventListener('numPress', this.numEventHandler);
        keypad.addEventListener('clearPress', this.clearEventHandler);
        keypad.addEventListener('cancelPress', this.cancelEventHandler);
        keypad.addEventListener('enterPress', this.enterEventHandler);
    }

    // Event Handlers

    numEventHandler(e) {
        if (this.state.canWithdraw){ this.handleCashInput(e); }
        else { this.handlePinInput(e); }
    }

    handlePinInput(e){
        if (this.state.pin.length < 4 ){
            this.clearErrorMsg();
            let newPin = e.detail.number.toString();
            this.setState({ pin: this.state.pin.concat(newPin) });
        }
    }

    handleCashInput(e){
        this.clearErrorMsg();
        let val = this.state.cash
        let newVal = e.detail.number.toString();

        if (val === '0'){ val = ''; }
        this.setState({ pin: val.concat(newVal) });
    }

    // 

    clearEventHandler(e) {
        let target = this.state.pin;
        if (this.state.canWithdraw){
            target = this.state.cashInput;
        }

        let leng = target.length;
        if (leng > 0 ){
            this.clearErrorMsg();
            let newVal = target.substring(0, leng - 1);
            this.setState({ pin: newVal });
        }
    }

    cancelEventHandler(e) {
        this.clearErrorMsg();
        if (this.state.canWithdraw){
            this.setState({ cashInput: '0' });
        } else {
            this.setState({ pin: '' });
        }
    }

    enterEventHandler(e) {
        console.log('enter');
        this.clearErrorMsg();
        this.checkPinAgainstUser();
    }

    // Functions

    clearErrorMsg() {
        this.setState({ errorMsg: '' });
    }

    checkPinAgainstUser() {
        // TODO: get Pin from API via promise & run response in then statement
        // IRL Pin should be onfuscated via salt/hash/pepper when being sent to the server
        try {
            if (this.state.pin === '1234'){
                // Set withdraw money screen
                this.setState({ canWithdraw: true });
            } else if (this.state.pin.length < 4){
                let err = new Error('Sorry that pin is not long enough');
                err.name = 'PinTooShort';
                throw err;
            } else {
                let err = new Error('Sorry that pin is incorrect');
                err.name = 'IncorrectPin';
                throw err;
            }

        } catch (e) {
            this.setState({ errorMsg: e.message });
            console.log('error', e.message);
            // Error specific handling
            if (e.name === 'IncorrectPin') {
                
            } else if (e.name === 'PinTooShort') {
                
            } else {

            }
        }
    }

    // Computed Properties

    obfuscatedPin(pin) {
        let obfsPin = '';
        for (var i = pin.length - 1; i >= 0; i--) {
            obfsPin = obfsPin.concat('x');
        }
        return obfsPin;
    }
    
    render() {
        return (
            <div>
                <p>{this.state.primaryMsg}</p>
                {(() => {
                    if(!this.state.canWithdraw){
                        return (
                            <div>
                                <h1 className="pin-display">{this.obfuscatedPin(this.state.pin)}</h1>
                                <h3 className="error-msg">{this.state.errorMsg}</h3>
                            </div>
                        )
                    } else {
                        return (
                            <div>
                                <h1 className="cash-display">&#8364;{this.state.cashInput}</h1>
                                <Withdraw/>
                            </div>
                        )
                    }
                })()}
                <Keypad/>
            </div>
            );
  }
}
 
export default Pin;