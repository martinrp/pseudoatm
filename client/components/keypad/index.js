'use strict';

import React, {Component} from 'react';
import {} from './style.less';
 
class Keypad extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }    

    // TODO:
    // Function which sends number
    // Emit number from Keypad
    // Emit function buttons from keypad
    // Return card button

    handleNumClick(i, e) {
        let numEvent = new CustomEvent('numPress', { 'detail': { 'number': i } });
        let keypad = document.getElementById('keypad');
        keypad.dispatchEvent(numEvent);
    }

    handleCancelClick(i, e) {
        let cancelEvent = new CustomEvent('cancelPress');
        let keypad = document.getElementById('keypad');
        keypad.dispatchEvent(cancelEvent);
    }

    handleClearClick(i, e) {
        let clearEvent = new CustomEvent('clearPress');
        let keypad = document.getElementById('keypad');
        keypad.dispatchEvent(clearEvent);
    }

    handleEnterClick(i, e) {
        let enterEvent = new CustomEvent('enterPress');
        let keypad = document.getElementById('keypad');
        keypad.dispatchEvent(enterEvent);
    }
    
    // TODO: Replace this with a loop/map
    render() {
        return ( 
            <div id='keypad' className='keypad'>
            <div className="row">
                <div className="col-md-8">

                    <div className="row">
                        <div className="col-md-4">
                            <button type="button" onClick={this.handleNumClick.bind(this, 1)} className="btn btn-default btn-lg btn-block">1</button>
                        </div>
                        <div className="col-md-4">
                            <button type="button" onClick={this.handleNumClick.bind(this, 2)} className="btn btn-default btn-lg btn-block">2</button>
                        </div>
                        <div className="col-md-4">
                            <button type="button" onClick={this.handleNumClick.bind(this, 3)} className="btn btn-default btn-lg btn-block">3</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <button type="button" onClick={this.handleNumClick.bind(this, 4)} className="btn btn-default btn-lg btn-block">4</button>
                        </div>
                        <div className="col-md-4">
                            <button type="button" onClick={this.handleNumClick.bind(this, 5)} className="btn btn-default btn-lg btn-block">5</button>
                        </div>
                        <div className="col-md-4">
                            <button type="button" onClick={this.handleNumClick.bind(this, 6)} className="btn btn-default btn-lg btn-block">6</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <button type="button" onClick={this.handleNumClick.bind(this, 7)} className="btn btn-default btn-lg btn-block">7</button>
                        </div>
                        <div className="col-md-4">
                            <button type="button" onClick={this.handleNumClick.bind(this, 8)} className="btn btn-default btn-lg btn-block">8</button>
                        </div>
                        <div className="col-md-4">
                            <button type="button" onClick={this.handleNumClick.bind(this, 9)} className="btn btn-default btn-lg btn-block">9</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 col-md-offset-4">
                            <button type="button" onClick={this.handleNumClick.bind(this, 0)} className="btn btn-default btn-lg btn-block">0</button>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="row">
                        <div className="col-md-12">
                            <button type="button" onClick={this.handleCancelClick.bind(this)} className="btn btn-primary btn-lg btn-block">Cancel</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <button type="button" onClick={this.handleClearClick.bind(this)} className="btn btn-primary btn-lg btn-block">Clear</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <button type="button" onClick={this.handleEnterClick.bind(this)} className="btn btn-primary btn-lg btn-block">Enter</button>
                        </div>
                    </div>
                </div>

            </div>
            </div>
            );
  }
}
 
export default Keypad;