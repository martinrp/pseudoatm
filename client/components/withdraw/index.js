'use strict';

import React, {Component} from 'react';
 
class Withdraw extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }    

    // TODO:
    // 

    handleWithdrawX(i, e) {
        let cancelEvent = new CustomEvent('cancelPress');
        let keypad = document.getElementById('keypad');
        keypad.dispatchEvent(cancelEvent);
    }
    
    // TODO: Replace this with a map/reduce function
    render() {
        return ( 
            <div id='withdraw' className='withdraw'>
            <div className="row">

                <div className="col-md-6">
                    <div className="row">
                        <div className="col-md-12">
                            <button type="button" onClick={this.handleWithdrawX.bind(this, 50)} className="btn btn-primary btn-lg btn-block">50</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <button type="button" onClick={this.handleWithdrawX.bind(this, 150)} className="btn btn-primary btn-lg btn-block">150</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <button type="button" onClick={this.handleWithdrawX.bind(this, 250)} className="btn btn-primary btn-lg btn-block">250</button>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="row">
                        <div className="col-md-12">
                            <button type="button" onClick={this.handleWithdrawX.bind(this, 100)} className="btn btn-primary btn-lg btn-block">100</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <button type="button" onClick={this.handleWithdrawX.bind(this, 200)} className="btn btn-primary btn-lg btn-block">200</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <button type="button" onClick={this.handleWithdrawX.bind(this, 300)} className="btn btn-primary btn-lg btn-block">300</button>
                        </div>
                    </div>
                </div>

            </div>
            </div>
            );
  }
}
 
export default Withdraw;