import React from 'react';
import { shallow } from 'enzyme'
import Login from '../pages/login'
import { isLocalURL } from 'next/dist/next-server/lib/router/router';

const emailTestCases = [
    {
        input: "asdf",
        expected: false
    },
    {
        input: "stevestevve@..",
        expected: false
    },
    {
        input: "gotteedezz@@",
        expected: false
    },
    {
        input: "g@g.gg",
        expected: true
    },
    {
        input: "jaerong@j.f",
        expected: false
    }
]

const passwordTestCases = [
    {
        input: "aa",
        expected: false
    },
    {
        input: "11",
        expected: false
    },
    {
        input: "@/!",
        expected: false
    },
    {
        input: "123abc",
        expected: true
    },
    {
        input: "!@#&@!*($&",
        expected: true
    }

]


describe('Pages', () => {
    let wrap;
    beforeEach(() => {
        wrap = shallow(<Login />)
    })
    describe('Login', () => {
        it("should render two input fields", function () {
            expect(wrap.find("input")).toHaveLength(2)
        })
        emailTestCases.forEach(async test => {
            it("should show error when not a valid email", () => {
                wrap.find("input").at(0).simulate('change', {
                    target: {
                        name: "username",
                        value: test.input
                    }
                });
                expect(wrap.find('.error_message').at(0).text()).toBe(test.expected ? "" : "Email is not valid")
            })
        })

        passwordTestCases.forEach(async test => {
            it("should show error when not a valid password", () => {
                wrap.find("input").at(1).simulate('change', {
                    target: {
                        name: "password",
                        value: test.input
                    }
                });
                expect(wrap.find('.error_message').at(1).text()).toBe(test.expected ? "" : "Password must be at least 6 characters")
            })
        })

        for (let i = 0; i <= emailTestCases.length; i++) {
            it.todo("should disable the button when username or password invalid"), () => {
                wrap.find("input").at(0).simulate('change', {
                    target: {
                        name: "username",
                        value: emailTestCases[i].input
                    }
                });
                wrap.find("input").at(1).simulate('change', {
                    target: {
                        name: "password",
                        value: passwordTestCases[i].input
                    }
                });
                expect(wrap.find('.login_button').prop('disabled')).toBe(!(emailTestCases[i].expected && passwordTestCases[i].expected))
            }

        }
    })
})