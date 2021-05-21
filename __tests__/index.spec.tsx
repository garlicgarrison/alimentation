
import React from 'react'
import { shallow } from 'enzyme'
import Home from '../pages/index'
import Store from '../pages/stores/index'

describe("Index", () => {

    const wrapper = shallow(<Home />)
    
    it("render homepage", () => {
        // console.log(wrapper.find(".main").debug())
        expect(wrapper.find(".main")).toHaveLength(1)
    })

    // doesn't work cause you need an account
    it("should show loading svg when navigation button is clicked", () => {
        // console.log(wrapper.find('circle').debug())
        console.log(wrapper.find(".main").debug())
        wrapper.find('button').at(0).simulate('click')
        wrapper.update();
        console.log(wrapper.find(".main").debug())
        expect(wrapper.find('circle')).toHaveLength(0)
    })
    
    //test if it goes to another page
    it("should ")
})