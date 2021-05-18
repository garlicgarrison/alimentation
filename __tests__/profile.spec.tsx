import React from 'react';
import { mount, shallow } from 'enzyme'
import Profile from '../pages/profile'


describe("Pages", ()=>{

    let realUseContext;
    let useContextMock;
    beforeEach(() => {
        realUseContext = React.useContext;
        useContextMock = React.useContext = jest.fn();
    });

    afterEach(() => {
        React.useContext = realUseContext;
    });

    const wrap = shallow(<Profile />)
    it("should allow edit personal info when edit button is clicked", () =>{
        console.log(wrap.find("button"))
        wrap.find('button').at(0).simulate('click');
        expect(wrap.find(".section_info div input")).toHaveLength(9)
    })
})