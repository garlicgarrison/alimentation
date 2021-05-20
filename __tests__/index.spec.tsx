
import React from 'react'
import { shallow } from 'enzyme'
import Home from '../pages/index'

describe("Index", () => {

    const wrapper = shallow(<Home />)
    
    it("render homepage", () => {
        // console.log(wrapper.find(".main").debug())
        expect(wrapper.find(".main")).toHaveLength(1)
    })

    it("should show loading svg when navigation button is clicked", () => {
        // console.log(wrapper.find('circle').debug())
        wrapper.find('button').first().simulate('click')
        wrapper.update();
        
        expect(wrapper.find('circle')).toHaveLength(1)
    })
})