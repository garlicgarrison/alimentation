import React from 'react';
import Checkout from '../pages/checkout'
import { mount, shallow } from 'enzyme'
import { act } from 'react-dom/test-utils'
import { checkoutdata } from '../mockdata/checkout'
import firebaseAdmin from 'firebase';

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

    it("allow edit address when clicked change", async () => {
        return act(() => {
            wrapper.find(".change_button").at(0).simulate('click');
            expect(wrapper.find(".address_section_edit input")).toHaveLength(5)
            return new Promise(setImmediate)
        })
    })

    it("allow edit payment when clicked change", async () => {
        return act(() => {
            wrapper.find(".change_button").at(1).simulate('click');
            expect(wrapper.find(".payment_section_edit input")).toHaveLength(4)
            return new Promise(setImmediate)
        })
    })
})