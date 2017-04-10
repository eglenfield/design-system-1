import React from 'react';
import classnames from 'classnames';

import Switch from './Switch';

const propTypes = {
  left: React.PropTypes.string.isRequired,
  right: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func,
  active: React.PropTypes.string,
};

const defaultProps = {
  onChange: () => {},
};

/**
 * `Toggle` allows the user to toggle between two options.
 *
 * @example ../../../docs/Toggle.md
 */

class Toggle extends React.Component {
  constructor(props) {
    super(props);

    const active = props.active || props.left;

    this.state = { active };

    this.onChange = this.onChange.bind(this);
    this.onLabelClick = this.onLabelClick.bind(this);
  }

  onChange() {
    const { left, right } = this.props;
    const active = this.state.active === left ? right : left;

    this.setState({ active }, this.props.onChange(active));
  }

  onLabelClick(active) {
    return () => {
      if (active !== this.state.active) {
        this.setState({ active }, this.props.onChange(active));
      }
    };
  }

  renderLabel(label) {
    const active = this.state.active === label;
    const className = classnames('rc-toggle-label', {
      'rc-toggle-active': active,
    });

    return (
      <a
        onClick={ this.onLabelClick(label) }
        className={ className }
      >
        { label }
      </a>
    );
  }

  render() {
    const { left, right } = this.props;
    const leftLabel = this.renderLabel(left);
    const rightLabel = this.renderLabel(right);

    return (
      <div className="rc-toggle">
        { leftLabel }
        <Switch
          label={ false }
          onChange={ this.onChange }
          className="rc-switch-toggle"
          checked={ this.state.active === right }
          name="toggle"
        />
        { rightLabel }
      </div>
    );
  }
}

Toggle.propTypes = propTypes;
Toggle.defaultProps = defaultProps;

export default Toggle;
