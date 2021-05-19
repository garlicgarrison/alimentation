import React from 'react';
import Stores from '../pages/stores/index'
import StoreCard from '../components/cards/StoreCard'
import { shallow, mount, render } from 'enzyme'
import {storesData} from '../mockdata/stores'
import { act } from 'react-dom/test-utils'
import firebase from 'firebase/app'

describe("Store pages", () => {

    // it("should render Store page", function() {
    //     shallow(<Stores />)
    // })
 
    let wrap = shallow(<Stores />);
    let stores;

    it("should render storecard components", async () => {
       return act(() => {
           console.log(wrap.find(".store_grids").at(0).debug())
           expect(wrap.containsMatchingElement(<div className = "store_card_container" />)).toEqual(true)
           return new Promise(setImmediate)
       })
    })
})