'use strict';

import React, {Component} from 'react';
 
class Returncard extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }    

    handleReturnClick(e) {
        let numEvent = new CustomEvent('returnCard');
        let returncard = document.getElementById('returncard');
        returncard.dispatchEvent(numEvent);
    }
    
    render() {
        return ( 
            <div id='returncard' className='row'>
                <div className="col-md-6 col-md-offset-3">
                    <button type="button" onClick={this.handleReturnClick.bind(this)} className="btn btn-primary btn-lg btn-block">Return my card.</button>
                </div>   
            </div>
            );
  }
}
 
export default Returncard;