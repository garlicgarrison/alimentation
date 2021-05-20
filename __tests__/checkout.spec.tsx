import React from 'react';
import Checkout from '../pages/checkout'
import Enzyme, { mount, shallow } from 'enzyme'
import { act } from 'react-dom/test-utils'
import { checkoutdata } from '../mockdata/checkout'
import firebaseAdmin from 'firebase';
import Adapter from "enzyme-adapter-react-16";

import MyContext, { useMyContext } from "./MyContext";
import * as MyContextModule from "./MyContext";

import {authStateMock, setAuthStateMock} from '../mockdata/user'

export const MyComponent = () => {
    const myVal = useMyContext(); // instead of useContext(MyContext)

    return <div data-test="my-component">{myVal}</div>;
};


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

    jest.spyOn(MyContextModule, "useMyContext").mockImplementation(() => ({
        authState: authStateMock, 
        setAuthState: setAuthStateMock
    }));
    
    const wrapper = shallow(
        <MyContext.Provider value ={{ authStateMock, setAuthStateMock }}>
            <Checkout />
        </MyContext.Provider>
    ).dive();

    it("allow edit address when clicked change", async () => {
        return act(() => {
            wrapper.find(".change_button").at(0).simulate('click');
            expect(wrapper.find(".address_section_edit input")).toHaveLength(5)
        })
    })

    it("allow edit payment when clicked change", async () => {
        return act(() => {
            wrapper.find(".change_button").at(1).simulate('click');
            expect(wrapper.find(".payment_section_edit input")).toHaveLength(4)
        })
    })
})