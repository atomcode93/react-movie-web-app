import * as React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {
  useLoadMore,
  useShowMore,
  useSidebar,
  //   usePrevious,
  //   useSearch,
  //   useSetGlobalEventHandler,
} from 'lib/hooks';

configure({ adapter: new Adapter() });

function HookWrapper({ hook }) {
  const hookInstance = hook ? hook() : undefined;
  return <div hook={hookInstance} />;
}

describe('useShowMore', () => {
  it('should render', () => {
    const wrapper = mount(<HookWrapper />);
    expect(wrapper.exists()).toBeTruthy();
  });
  test('should set init value of useShowMore', () => {
    const wrapper = mount(<HookWrapper hook={() => useShowMore(false)} />);
    const { hook } = wrapper.find('div').props();
    const { isOpen } = hook;
    expect(isOpen).toEqual(false);
  });
  test('should have a toggleShowMore function', () => {
    const wrapper = mount(<HookWrapper hook={() => useShowMore(false)} />);
    const { hook } = wrapper.find('div').props();
    expect(hook.toggleShowMore).toBeInstanceOf(Function);
  });
  test('should set init value of useSidebar', () => {
    const wrapper = mount(<HookWrapper hook={() => useSidebar(false)} />);
    const { hook } = wrapper.find('div').props();
    const { isSidebarOpen } = hook;
    expect(isSidebarOpen).toEqual(false);
  });
  test('should set init value of useLoadMore', () => {
    const wrapper = mount(<HookWrapper hook={() => useLoadMore(1)} />);
    const { hook } = wrapper.find('div').props();
    const { currentPage } = hook;
    expect(currentPage).toEqual(1);
  });
});
