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

    // Minor bug: tried nested for loops with outer row divs and it causes an error. This works fine with bootstrap so leaving without.

    createBtnGrid(){
        let rows = [];
        for (let i=1; i <= 3; i++) {
            // rows.push(<div className='row'>);
            for (let j=p; j <= 3; j++) {
                let elemNum = i * j;
                rows.push(
                    <div className='col-md-4'>
                        <button type='button' onClick={this.handleNumClick.bind(this, elemNum)} className='btn btn-default btn-lg btn-block'>{elemNum}</button>
                    </div>
                );
            }
            // rows.push(</div>);
        }
        return rows;
    }
    
    
    // TODO: Replace this with a loop/map
    render() {
        return ( 
            <div id='keypad' className='keypad'>
                <div className="row">
                    <div className="col-md-8">
                            
                        {this.createBtnGrid()}

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