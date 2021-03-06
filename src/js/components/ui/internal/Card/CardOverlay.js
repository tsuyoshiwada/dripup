// @flow
import React from "react";
import bem from "../../../../helpers/bem";
import { Checkbox } from "../../";
import { CardMore } from "./";

type Props = {
  baseClassName: string;
  style?: Object;
  actions: React$Element<any>;
  moreActions: React$Element<any>;
  selectable: boolean;
  selected: boolean;
  onSelect?: Function;
};

type State = {
  show: boolean;
};

export default class CardOverlay extends React.Component {
  props: Props;
  state: State = {
    show: false
  };

  static defaultProps = {
    style: {},
    selectable: false,
    selected: false,
    onSelect: () => {}
  };

  handleSelectClick = (e: SyntheticMouseEvent) => {
    e.stopPropagation();
  }

  handleMouseEnter = () => {
    this.setState({ show: true });
  }

  handleMouseLeave = () => {
    this.setState({ show: false });
  }

  handleMouseMove = () => {
    if (this.state.show === false) {
      this.setState({ show: true });
    }
  }

  render() {
    const {
      baseClassName,
      style,
      actions,
      moreActions,
      selectable,
      selected,
      onSelect
    } = this.props;

    const { show } = this.state;

    const b = bem(`${baseClassName}__overlay`);

    const modifier = {
      show,
      selectable,
      selected
    };

    const moreElement = moreActions && <CardMore
      baseClassName={baseClassName}
      className={b("more", modifier)()}
      actions={moreActions}
      selected={selected}
    />;

    const selectElement = selectable && <Checkbox
      className={b("select", modifier)()}
      checked={selected}
      onCheck={onSelect}
      onClick={this.handleSelectClick}
    />;

    const actionElements = actions && <div className={b("actions", modifier)()}>
      {React.Children.map(actions, (action, index) =>
        React.cloneElement(action, {
          key: index,
          className: b("action")()
        })
      )}
    </div>;

    return (
      <div
        className={b(modifier)()}
        style={style}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onMouseMove={this.handleMouseMove}
      >
        {selectElement}
        {moreElement}
        <div className={b("inner", modifier)()}>
          {actionElements}
        </div>
      </div>
    );
  }
}
