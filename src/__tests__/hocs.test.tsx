import * as React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {
  withAjaxLoadMore,
  withAjaxSearch,
  withModalState,
  withSidebar,
} from 'components/HOC';

configure({ adapter: new Adapter() });

const mockStore = configureMockStore();

const TestComponent = () => <h1>Test</h1>;

describe('HOCs', () => {
  const props = {
    location: { pathname: '/' },
  };
  test('withSidebar', () => {
    const ComponentRendered = withSidebar(TestComponent);
    const wrapper = shallow(<ComponentRendered {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
  test('withAjaxLoadMore', () => {
    const ComponentRendered = withAjaxLoadMore(TestComponent);
    const wrapper = shallow(<ComponentRendered />);
    expect(wrapper).toMatchSnapshot();
  });
  test('withAjaxSearch', () => {
    const ComponentRendered = withAjaxSearch(TestComponent);
    const wrapper = shallow(<ComponentRendered />);
    expect(wrapper).toMatchSnapshot();
  });
  test('withModalState', () => {
    const store = mockStore({});
    const ComponentRendered = withModalState(TestComponent);
    const wrapper = shallow(
      <Provider store={store}>
        <ComponentRendered />
      </Provider>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
