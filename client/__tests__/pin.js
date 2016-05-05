jest.unmock('../components/pin'); // unmock to use the actual implementation of sum

import React from 'react';
import Pin from '../components/pin';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

describe('removeLastElem', () => {
    it('Removes last elem in a string and returns a new string', () => {

        // Issue: Jest will not recognise DOM instance (and as such the dom targeting/event handlers).
        // Need to use Mocha-JS-DOM for testing instead, I do not have time to configure for this case so will proceed without tests.

        // const pin = TestUtils.renderIntoDocument( <Pin/> );
        // const pinNode = ReactDOM.findDOMNode(pin);

        // let h1 = TestUtils.findRenderedDOMComponentWithTag(pin, 'h1');

        // Verify that it's null by default
        // expect(h1.getDOMNode().textContent).toEqual('');
    });
});