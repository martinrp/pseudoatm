'use strict';

import React, {Component} from 'react';
import Keypad from '../keypad';
import {} from './style.less';
 
class Pin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pin: '',
            errorMsg: ''
        };
    }

    // Functionality:
    // x Recieve number events
    // x Clear event - remove last number from end of string
    // x Cancel - clear string
    // x Enter - Failure (Error message)
    // x Obfuscate pin
    // x Limit pin to 4 nums
    // x Enter - Success with delay (Server API call if time, else just a timeout & spinner)
    // x Only allow values in multiples of 10

    componentDidMount() {
        let pin = document.getElementById('pin-component');
        pin.addEventListener('numPress', this.numEventHandler.bind(this), true);
        pin.addEventListener('clearPress', this.clearFromPin.bind(this), true);
        pin.addEventListener('cancelPress', this.cancelEventHandler.bind(this), true);
        pin.addEventListener('enterPress', this.enterEventHandler.bind(this), true);
        pin.addEventListener('setNumber', this.setNumEventHandler.bind(this), true);
    }

    componentWillUnmount() {
        let pin = document.getElementById('pin-component');
        pin.removeEventListener('numPress', this.numEventHandler, true);
        pin.addEventListener('clearPress', this.clearFromPin, true);
        pin.addEventListener('cancelPress', this.cancelEventHandler, true);
        pin.addEventListener('enterPress', this.enterEventHandler, true);
        pin.addEventListener('setNumber', this.setNumEventHandler, true);
    }

    // Event Handlers

    // Add num
    numEventHandler(e) {
        if (this.state.pin.length < 4 ){
            this.clearErrorMsg();
            let newPin = e.detail.number.toString();
            this.setState({ pin: this.state.pin.concat(newPin) });
        }
    }

    // Clear
    clearFromPin(e){
        this.clearErrorMsg();
        this.setState({ pin: this.removeLastElem(this.state.pin) });
    }

    removeLastElem(str){
        if (str.length > 0 ){ return str.substring(0, str.length - 1); }
        else { return ''; }
    }

    // Cancel
    cancelEventHandler(e) {
        this.clearErrorMsg();
        this.setState({ pin: '' });
    }

    enterEventHandler(e) {
        this.clearErrorMsg();
        this.checkPinAgainstUser();
    }

    // Set Number
    setNumEventHandler(e) {
        this.setState({ cashInput: e.detail.number.toString() });
    }

    // Functions
    clearErrorMsg() {
        this.setState({ errorMsg: '' });
    }

    checkPinAgainstUser() {
        // ShouldDo: get Pin from backend API via promise & run response in then statement
        // IRL Pin should be obfuscated via salt/hash/pepper when being sent to the server
        try {
            if (this.state.pin === '1234'){
                // Send pin correct event
                let pinEvent = new CustomEvent('pinCorrect');
                let pinComponent = document.getElementById('pin-component');
                pinComponent.dispatchEvent(pinEvent);     
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
            <div id="pin-component">
                <p>Please enter your PseudoBank PIN.</p>
                <h1 className="pin-display">{this.obfuscatedPin(this.state.pin)}</h1>
                <h3 className="error-msg">{this.state.errorMsg}</h3>
                <Keypad/>
            </div>
            );
  }
}
 
export default Pin;