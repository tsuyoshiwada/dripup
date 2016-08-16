/* eslint-disable */
import _ from "lodash";
import autoBind from "auto-bind";
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import * as OrderBy from "../../../constants/order-by";
import * as Layout from "../../../constants/layouts";
import * as SettingActions from "../../../actions/settings";
import * as BoardActions from "../../../actions/boards";
import * as ItemActions from "../../../actions/items";
import { getBoardEntities, getCurrentBoard } from "../../../selectors/boards";
import {
  getItemEntities,
  getSelectedItemEntities
} from "../../../selectors/items";
import bem from "../../../helpers/bem";
import {
  CardGroup,
  ItemCard,
  IconButton,
  SelectBoardDialog,
  Snackbar,
  ToolBox,
  IconMenu,
  MenuItem,
  SortSwitcher
} from "../../../components/ui/";
import {
  FolderIcon,
  TrashIcon,
  StarIcon,
  MoreVertIcon
} from "../../../components/svg-icons/";

const b = bem("board-detail");

export class BoardDetailContainer extends Component {
  static propTypes = {
  };

  static defaultProps = {
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      moveItemSnackbarOpen: false,
      moveItemSnackbarMessage: ""
    };

    autoBind(this);
  }

  componentDidMount() {
    this.props.dispatch(BoardActions.setCurrentBoard(this.props.params.id));
  }

  componentWillReceiveProps(nextProps) {
    const { params } = this.props;

    if (params.id !== nextProps.params.id) {
      this.props.dispatch(BoardActions.setCurrentBoard(nextProps.params.id));
    }
  }

  handleOrderByChange(orderBy) {
    this.props.dispatch(SettingActions.updateItemsOrderByRequest(orderBy));
  }

  handleOrderChange(order) {
    this.props.dispatch(SettingActions.updateItemsOrderRequest(order));
  }

  handleSelect(id) {
    this.props.dispatch(ItemActions.selectItemToggle(id));
  }

  handleFavorite(id) {
    this.props.dispatch(ItemActions.favoriteItemToggleRequest(id));
  }

  handleMove(id) {
    this.props.dispatch(ItemActions.moveItemSelectBoardOpen(id));
  }

  handleSelectMove() {
    this.props.dispatch(ItemActions.selectedItemsMoveOpen());
  }

  handleSelectBoard(boardId) {
    if (this.props.items.moveItems.length > 0) {
      this.props.dispatch(ItemActions.moveItemRequest(boardId));
    } else {
      this.props.dispatch(ItemActions.selectedItemsMoveRequest(boardId));
    }
  }

  handleSelectBoardDialogClose() {
    if (this.props.items.moveItems.length > 0) {
      this.props.dispatch(ItemActions.moveItemSelectBoardClose());
    } else {
      this.props.dispatch(ItemActions.selectedItemsMoveClose());
    }
  }

  handleDelete(id) {
    this.props.dispatch(ItemActions.deleteItemRequest(id));
  }

  handleSelectDelete() {
    this.props.dispatch(ItemActions.selectedItemsDeleteRequest());
  }

  handleSelectFavorite() {
    const { dispatch, selectedItemEntities } = this.props;
    const isAllFavorite = this.isAllFavoriteByItemEntities(selectedItemEntities);
    dispatch(ItemActions.selectedItemsFavoriteRequest(!isAllFavorite));
  }

  handleSelectMenuItemClick(menuItem, value) {
    console.log(menuItem);
    this.props.dispatch(value());
  }

  isAllFavoriteByItemEntities(entities) {
    return entities.every(entity => entity.favorite);
  }

  render() {
    const {
      boards,
      boardEntities,
      currentBoard,
      items,
      itemEntities,
      selectedItemEntities,
      settings: {
        itemsLayout,
        itemsSize,
        itemsOrderBy,
        itemsOrder
      }
    } = this.props;

    const {
      selectMenuOpen,
      selectMenuTrigger
    } = this.state;

    const hasSelectedItems = selectedItemEntities.length > 0;
    const isAllFavorite = this.isAllFavoriteByItemEntities(selectedItemEntities);
    const selectBoards = boardEntities
      .filter(entity => currentBoard && currentBoard.id !== entity.id)
      .map(entity => ({
        value: entity.id,
        name: entity.name
      }));

    return (
      <div className={`container ${b()}`}>
        <div className={b("control")()}>
          <SortSwitcher
            className={b("sort-switcher")()}
            orderBy={itemsOrderBy}
            order={itemsOrder}
            types={[
              { name: "名前", value: OrderBy.NAME },
              { name: "作成日時", value: OrderBy.CREATED },
              { name: "最終閲覧日時", value: OrderBy.LAST_VIEW }
            ]}
            onOrderByChange={this.handleOrderByChange}
            onOrderChange={this.handleOrderChange}
          />
        </div>

        <CardGroup
          columnWidth={itemsSize}
          layout={itemsLayout}
        >
          {itemEntities.map(item =>
            <ItemCard
              key={item.id}
              id={item.id}
              processing={item.isUpdating || item.isMoving || item.isDeleting}
              selected={item.select}
              layout={itemsLayout}
              title={item.name}
              image={item.thumbnail}
              imageWidth={item.width}
              imageHeight={item.height}
              favorite={item.favorite}
              colors={item.palette}
              onSelect={this.handleSelect}
              onFavorite={this.handleFavorite}
              onMove={this.handleMove}
              onDelete={this.handleDelete}
            />
          )}
        </CardGroup>

        <SelectBoardDialog
          processing={items.isMoving}
          open={items.selectBoardDialogOpen}
          boards={selectBoards}
          onSelect={this.handleSelectBoard}
          onRequestClose={this.handleSelectBoardDialogClose}
        />

        <ToolBox
          open={hasSelectedItems}
          text={`${selectedItemEntities.length}個のアイテム`}
          actions={[
            <IconButton
              tooltip={isAllFavorite ? "スターを外す" : "スターを付ける"}
              icon={<StarIcon />}
              onClick={this.handleSelectFavorite}
            />,
            <IconButton
              tooltip="移動"
              icon={<FolderIcon />}
              onClick={this.handleSelectMove}
            />,
            <IconButton
              tooltip="削除"
              icon={<TrashIcon />}
              onClick={this.handleSelectDelete}
            />,
            <IconMenu
              icon={<IconButton icon={<MoreVertIcon />} />}
              tooltip="選択"
              origin={{ vertical: "bottom", horizontal: "right" }}
              triggerOrigin={{ vertical: "bottom", horizontal: "right" }}
              onItemClick={this.handleSelectMenuItemClick}
            >
              {itemEntities.length !== selectedItemEntities.length &&
                <MenuItem text="すべて選択" value={ItemActions.selectAllItem} />
              }
              <MenuItem text="スター付きを選択" value={ItemActions.selectFavoriteItem} />
              <MenuItem text="選択を解除" value={ItemActions.unselectAllItem} />
            </IconMenu>
          ]}
        />

      </div>
    );
  }
}

export default connect(
  (state, ownProps) => {
    const currentBoard = getCurrentBoard(state);
    const currentBoardId = (currentBoard && currentBoard.id) || "";
    const { itemsOrderBy, itemsOrder } = state.settings;

    return {
      settings: state.settings,
      boards: state.boards,
      boardEntities: getBoardEntities(state),
      items: state.items,
      itemEntities: getItemEntities(state, itemsOrderBy, itemsOrder),
      selectedItemEntities: getSelectedItemEntities(state),
      currentBoard
    };
  },
  null,
  null,
  { pure: false }
)(BoardDetailContainer);