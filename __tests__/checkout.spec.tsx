import React from 'react';
import Checkout from '../pages/checkout'
import { mount, shallow } from 'enzyme'

describe("Pages", () => {

    let realUseContext;
    let useContextMock;
    beforeEach(() => {
        realUseContext = React.useContext;
        useContextMock = React.useContext = jest.fn();
    });

    afterEach(() => {
        React.useContext = realUseContext;
    });


    const wrapper = shallow(<Checkout />)

    it("allow edit address when clicked change", () => {
        wrapper.find(".change_button").at(0).simulate('click');
        expect(wrapper.find(".address_section_edit input")).toHaveLength(5)
    })
})