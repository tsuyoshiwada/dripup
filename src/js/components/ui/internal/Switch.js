import React, { PropTypes } from "react";
import bem from "../../../helpers/bem";
import bindHandlers from "../../../helpers/bind-handlers";
import mergeClassNames from "../../../helpers/merge-class-names";
import randomId from "../../../helpers/random-id";
import Ripple from "../internal/Ripple";

export default class Checkbox extends React.Component {
  static propTypes = {
    baseClassName: PropTypes.string,
    className: PropTypes.string,
    type: PropTypes.oneOf(["checkbox", "radio"]),
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.any,
    checked: PropTypes.bool,
    onCheck: PropTypes.func
  };

  static defaultProps = {
    checked: false,
    onCheck: () => {}
  };

  constructor(props) {
    super(props);

    this.state = {
      ripples: []
    };

    bindHandlers([
      "handleChange",
      "handleRippleHide"
    ], this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.checked !== this.props.checked && nextProps.checked) {
      const b = bem(this.props.baseClassName);
      const { ripples } = this.state;

      this.setState({
        ripples: ripples.concat([
          <Ripple
            key={randomId()}
            className={b("ripple")}
            onRequestHide={this.handleRippleHide}
          />
        ])
      });
    }
  }

  handleChange(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.onCheck(this.props.value, !this.props.checked);
  }

  handleRippleHide() {
    const ripples = this.state.ripples.slice(1);
    this.setState({ ripples });
  }

  render() {
    const {
      baseClassName,
      className,
      type,
      label,
      name,
      value,
      checked
    } = this.props;

    const { ripples } = this.state;

    const modifier = {
      checked
    };

    const b = bem(baseClassName);

    return (
      <div className={mergeClassNames(b(modifier), className)}>
        <input
          ref={type}
          type={type}
          className={b("input", modifier)}
          name={name}
          value={value}
          checked={checked}
          onChange={this.handleChange}
        />
        <div className={b("body")}>
          <span className={b(type, modifier)}>
            {ripples}
          </span>
          <span className={b("label", modifier)}>{label}</span>
        </div>
      </div>
    );
  }
}
