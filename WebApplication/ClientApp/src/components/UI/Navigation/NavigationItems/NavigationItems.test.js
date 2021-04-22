import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from "redux-mock-store";

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({ adapter: new Adapter() });

const mockProps = {
    auth: { loggedIn: false }
};
const mockStore = configureMockStore();
//const store = mockStore(mockProps);
//const store = mockStore({});

let wrapper;

const renderWrapper = (state = mockProps) => {
    const store = mockStore(state);
    //expect.spyOn(store, 'dispatch');
    wrapper = shallow(<NavigationItems store={store} />)
        .dive().dive();
};

describe('Navigation Items', () => {

    beforeEach(() => {
        //wrapper = shallow(
        //    <NavigationItems onSignOut={() => { }} store={store} />
        //);
    });

    it('should render 5 <NavigationItem /> if not authenricated', () => {
        renderWrapper();
        expect(wrapper.find(NavigationItem)).toHaveLength(5);
    });

    it('should render 7 <NavigationItem /> if authenricated', () => {
        renderWrapper({
            auth: { loggedIn: true }
        });
        //wrapper.setProps({ loggedIn: true });
        //console.log(wrapper.debug());
        expect(wrapper.find(NavigationItem)).toHaveLength(7);
    });

    it('should has sign out if authenricated', () => {
        renderWrapper({
            auth: { loggedIn: true }
        });
        expect(wrapper.find(NavigationItem).findWhere(node => {
            return node.text() === 'Sign Out'
        })).toHaveLength(1);
    });

});
