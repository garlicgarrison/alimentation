
import React from 'react';
import Stores from '../pages/stores/index'
import StoreCard from '../components/cards/StoreCard'
import { shallow, mount, render } from 'enzyme'
import {storesData} from '../mockdata/stores'
import { act } from 'react-dom/test-utils'
import firebase from 'firebase'

const {mockFirebase} = require('firestore-jest-mock')

describe("Store pages", () => {
 
    let wrap = shallow(<Stores />);
    mockFirebase({
        database: {
            stores: storesData
        }
    })

    afterEach(() => {
        jest.clearAllMocks()  
    })

    it("should render storecard components", async () => {
           console.log(wrap.find(".store_grids").at(0).debug())
           expect(wrap.containsMatchingElement(<div className = "store_card_container" />)).toEqual(true)
    }
)
})