'use strict';

import React, {Component} from 'react';
import Keypad from '../keypad';
 
class Withdraw extends Component {

    constructor(props) {
        super(props);
        this.state = {
            errorMsg: '',
            cashInput: '0'
        };
    } 

    componentDidMount() {
        let withdraw = document.getElementById('withdraw-component');
        withdraw.addEventListener('numPress', this.addToCash.bind(this), true);
        withdraw.addEventListener('clearPress', this.clearFromCash.bind(this), true);
        withdraw.addEventListener('cancelPress', this.cancelEventHandler.bind(this), true);
        withdraw.addEventListener('enterPress', this.enterEventHandler.bind(this), true);
    }

    componentWillUnmount() {
        let withdraw = document.getElementById('withdraw-component');
        withdraw.removeEventListener('numPress', this.addToCash, true);
        withdraw.addEventListener('clearPress', this.clearFromCash, true);
        withdraw.addEventListener('cancelPress', this.cancelEventHandler, true);
        withdraw.addEventListener('enterPress', this.enterEventHandler, true);
    }

    handleWithdrawX(i, e) {
        this.setState({ cashInput: i.toString() });
    }

    cancelEventHandler(e) {
        this.clearErrorMsg();
        this.setState({ cashInput: '0' });
    }

    enterEventHandler(e) {
        this.clearErrorMsg();
        this.getCash();
    }

    addToCash(e){
        this.clearErrorMsg();
        let val = this.state.cashInput
        let newVal = e.detail.number.toString();

        if (val === '0'){ val = ''; }
        this.setState({ cashInput: val.concat(newVal) });
    }

    clearFromCash(e){
        this.clearErrorMsg();
        this.setState({ cashInput: this.removeLastElem(this.state.cashInput) });
    }

    // Functions

    removeLastElem(str){
        if (str.length > 0 ){ return str.substring(0, str.length - 1); }
        else { return '0'; }
    }

    clearErrorMsg() {
        this.setState({ errorMsg: '' });
    }

    getCash(){
        try {
            let cashStr = this.state.cashInput;
            
            let isMultiOfTen = parseInt(cashStr, 10)%10 == 0;

            console.log('isMultiOfTen', isMultiOfTen, parseInt(cashStr, 10));

            if (cashStr === '0'){
                let err = new Error('Sorry you must input an amount greater than 0');
                err.name = 'CashTooLow';
                throw err;
            } else if (isMultiOfTen){
                // Send change screen event
                let submit = new CustomEvent('cashSubmit', { 'detail': { 'cash': cashStr } });
                let withdrawComponent = document.getElementById('withdraw-component');
                withdrawComponent.dispatchEvent(submit);
            } else {
                let err = new Error('Sorry you must input a multiple of 10');
                err.name = 'MustBeTenMulti';
                throw err;
            }

        } catch (e) {
            this.setState({ errorMsg: e.message });
            console.log('error', e.message);
            // Error specific handling
            if (e.name === 'MustBeTenMulti') {
                
            } else if (e.name === 'CashTooLow') {
                
            } else {

            }
        }
    }
    
    // TODO: Replace this with a map/reduce function
    render() {
        return ( 
            <div id='withdraw-component' className='withdraw'>
                <p>Select an option, or input the amount of PseudoMoney you wish to withdraw.</p>
                <h1 className="cash-display">&#8364;{this.state.cashInput}</h1>
                <h3 className="error-msg">{this.state.errorMsg}</h3>
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
                <Keypad/>
            </div>
            );
  }
}
 
export default Withdraw;