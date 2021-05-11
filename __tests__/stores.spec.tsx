import React from 'react';
import Stores from '../pages/stores/index'
import StoreCard from '../components/cards/StoreCard'
import { shallow } from 'enzyme'

describe("Store pages", () => {

    it("should render Store page", function() {
        shallow(<Stores />)
    })

    let wrap = shallow(<Stores />)
    it("should render storecard components", function() {
        expect(wrap.containsMatchingElement(<StoreCard />)).toEqual(true)
    })
})