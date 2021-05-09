import React from 'react';
import {mount} from 'enzyme'
import Login from '../pages/login'

describe('Pages', () => {
    describe('Login', () => {
        it("should render without throwing an error", function() {
            const wrap = mount(<Login/>)
            expect(wrap.find("input")).toHaveLength(2)
        })
    })
})