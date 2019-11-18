import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Sidebar from '../../source/react/library/sidebar/Sidebar';
import Badge from '../../source/react/library/badge/Badge';
import Icon from '../../source/react/library/icon/Icon';

describe('<Sidebar />', () => {
  it('should render without blowing up', () => {
    const wrapper = shallow(<Sidebar />);

    expect(wrapper.length).to.eql(1);
  });

  it('should be full size by default', () => {
    const wrapper = shallow(<Sidebar />);

    expect(wrapper.hasClass('rc-sidebar-minimized')).to.eql(false);
  });

  it('should have a minimized class if prop provided', () => {
    const wrapper = shallow(<Sidebar minimized />);

    expect(wrapper.hasClass('rc-sidebar-minimized')).to.eql(true);
  });

  describe('<Sidebar.Header />', () => {
    it('should render without blowing up', () => {
      const wrapper = shallow(<Sidebar.Header ariaLabel="Test label" />);

      expect(wrapper.length).to.eql(1);
    });
  });

  describe('<Sidebar.Navigation />', () => {
    it('should render without blowing up', () => {
      const wrapper = shallow(
        <Sidebar.Navigation>Hello world</Sidebar.Navigation>,
      );

      expect(wrapper.length).to.eql(1);
    });
  });

  describe('<Sidebar.Section />', () => {
    it('should render without blowing up', () => {
      const wrapper = shallow(<Sidebar.Section />);

      expect(wrapper.length).to.eql(1);
    });

    it('should render a label when prop is provided', () => {
      const wrapper = shallow(<Sidebar.Section label="test" />);

      expect(wrapper.find('.rc-sidebar-label').length).to.eql(1);
    });
  });

  describe('<Sidebar.Item />', () => {
    it('should render without blowing up', () => {
      const wrapper = shallow(<Sidebar.Item title="test" />);

      expect(wrapper.length).to.eql(1);
    });

    it('should render an icon when the prop is provided ', () => {
      const wrapper = shallow(<Sidebar.Item title="test" icon="profile" />);

      expect(wrapper.find('Icon').length).to.eql(1);
    });

    it('should render a count when the prop is provided ', () => {
      const wrapper = shallow(<Sidebar.Item title="test" count={5} />);

      expect(wrapper.find('Badge').length).to.eql(1);
      expect(
        wrapper
          .find('Badge')
          .childAt(0)
          .text(),
      ).to.eql('5');
    });

    it('should render a custom badge when the prop is provided ', () => {
      const wrapper = shallow(
        <Sidebar.Item
          title="test"
          badge={
            <Badge pill>
              <Icon type="check" />
            </Badge>
          }
        />,
      );

      const customBadgeNode = wrapper.find('Badge');
      expect(customBadgeNode.length).to.eql(1);
      expect(customBadgeNode.find('Icon').length).to.eql(1);
    });

    it('should render as a different element when the prop is provided ', () => {
      const wrapper = shallow(<Sidebar.Item title="test" as="a" />);
      expect(wrapper.find('.rc-sidebar-item-link').type()).to.eql('a');
    });
  });

  describe('<Sidebar.Footer />', () => {
    it('should render without blowing up', () => {
      const wrapper = shallow(<Sidebar.Footer />);

      expect(wrapper.length).to.eql(1);
    });
  });
});
