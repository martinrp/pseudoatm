'use strict';

import React, {Component} from 'react';
import Keypad from '../keypad'
import Withdraw from '../withdraw'
 
class Pin extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
    // x Enter - Failure (Error message)
    // x Obfuscate pin
    // x Limit pin to 4 nums
    // Enter - Success with delay (Server API call if time, else just a timeout & spinner)

    // TODO:
    // Split out into two subcomponents with an instance of keypad each.

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

    // Add num
    numEventHandler(e) {
        if (this.state.canWithdraw){ this.addToCash(e); }
        else { this.addToPin(e); }
    }

    addToPin(e){
        if (this.state.pin.length < 4 ){
            this.clearErrorMsg();
            let newPin = e.detail.number.toString();
            this.setState({ pin: this.state.pin.concat(newPin) });
        }
    }

    addToCash(e){
        this.clearErrorMsg();
        let val = this.state.cashInput
        let newVal = e.detail.number.toString();

        if (val === '0'){ val = ''; }
        this.setState({ cashInput: val.concat(newVal) });
    }

    // Clear
    clearEventHandler(e) {    
        if (this.state.canWithdraw){ this.clearFromCash(e); } 
        else { this.clearFromPin(e); }
    }

    clearFromCash(e){
        this.clearErrorMsg();
        newStr = removeLastElem(this.state.cashInput);
        this.setState({ cashInput: newVal });
    }

    clearFromPin(e){
        this.clearErrorMsg();
        newStr = removeLastElem(this.state.pin);
        this.setState({ pin: newVal });
    }

    removeLastElem(str){
        if (str.length > 0 ){ return str.substring(0, leng - 1); }
    }

    // Cancel
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
                {(() => {
                    if(this.state.canWithdraw){
                        return (
                            <div>
                                <p>'Select an option, or input the amount of PseudoMoney you wish to withdraw.'</p>
                                <h1 className="cash-display">&#8364;{this.state.cashInput}</h1>
                                <Withdraw/>
                            </div>
                        )
                    } else {
                        return (
                            <div>
                                <p>'Please enter your PseudoBank PIN.'</p>
                                <h1 className="pin-display">{this.obfuscatedPin(this.state.pin)}</h1>
                                <h3 className="error-msg">{this.state.errorMsg}</h3>
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