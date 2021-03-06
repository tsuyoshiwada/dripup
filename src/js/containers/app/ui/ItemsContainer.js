// @flow
import React, { Component } from "react";
import ExecutionEnvironment from "exenv";
import { SelectableGroup, createSelectable } from "react-selectable";
import { connect } from "react-redux";
import * as OptionActions from "../../../actions/options";
import * as ItemActions from "../../../actions/items";
import { getRawBoardEntities, getCurrentBoard } from "../../../selectors/boards";
import {
  getVisibleItemEntities,
  getSelectedItemEntities,
  getCurrentItem
} from "../../../selectors/items";
import bem from "../../../helpers/bem";
import { createMultipleSelectableGroup } from "../../../components/hoc/";
import {
  CardGroup,
  CardGroupControl,
  ItemCard,
  IconButton,
  SelectBoardDialog,
  ToolBox,
  IconMenu,
  MenuItem,
  Spinner
} from "../../../components/ui/";
import { FolderIcon, TrashIcon, StarIcon, MoreVertIcon } from "../../../components/svg-icons/";
import { selectColors } from "../../../constants/palette";

import type { Dispatch } from "redux";
import type { ConnectState } from "../../../types/redux";
import type { OptionsState } from "../../../types/options";
import type { BoardState, BoardId, BoardEntity, BoardEntities } from "../../../types/board";
import type { ItemState, ItemId, ItemEntity, ItemEntities } from "../../../types/item";
import type { Order, OrderBy } from "../../../types/prop-types";


const b = bem("items-container");
const MultipleSelectableGroup = createMultipleSelectableGroup(SelectableGroup);
const SelectableItemCard = createSelectable(ItemCard);

type Props = {
  dispatch: Dispatch;
  options: OptionsState;
  boards: BoardState;
  rawBoardEntities: BoardEntities;
  items: ItemState;
  itemEntities: ItemEntities;
  selectedItemEntities: ItemEntities;
  currentBoard: ?BoardEntity;
  currentItem: ?ItemEntity;
  emptyComponent: React$Element<any>;
};

export class ItemsContainer extends Component {
  props: Props;

  handleOrderByChange = (orderBy: OrderBy) => {
    this.props.dispatch(OptionActions.updateItemsOrderByRequest(orderBy));
  }

  handleOrderChange = (order: Order) => {
    this.props.dispatch(OptionActions.updateItemsOrderRequest(order));
  }

  handleColorComplete = (colors: Array<string>) => {
    this.props.dispatch(ItemActions.setItemCurrentColors(colors));
  }

  handleClick = (id: ItemId) => {
    if (this.hasSelectedItems()) {
      this.props.dispatch(ItemActions.selectItemToggle(id));
    } else {
      this.props.dispatch(ItemActions.setCurrentItem(id));
    }
  }

  handleSelect = (id: ItemId) => {
    this.props.dispatch(ItemActions.selectItemToggle(id));
  }

  handleStar = (id: ItemId) => {
    this.props.dispatch(ItemActions.starItemToggleRequest(id));
  }

  handleMove = (id: ItemId) => {
    this.props.dispatch(ItemActions.moveItemSelectBoardOpen(id));
  }

  handleSelection = (ids: Array<ItemId>) => {
    this.props.dispatch(ItemActions.setSelectItems(ids));
  }

  handleSelectMove = () => {
    this.props.dispatch(ItemActions.selectedItemsMoveOpen());
  }

  handleSelectBoard = (boardId: BoardId) => {
    if (this.props.items.moveItems.length > 0) {
      this.props.dispatch(ItemActions.moveItemRequest(boardId));
    } else {
      this.props.dispatch(ItemActions.selectedItemsMoveRequest(boardId));
    }
  }

  handleSelectBoardDialogClose = () => {
    if (this.props.items.moveItems.length > 0) {
      this.props.dispatch(ItemActions.moveItemSelectBoardClose());
    } else {
      this.props.dispatch(ItemActions.selectedItemsMoveClose());
    }
  }

  handleDelete = (id: ItemId) => {
    this.props.dispatch(ItemActions.deleteItemRequest(id));
  }

  handleSelectDelete = () => {
    this.props.dispatch(ItemActions.selectedItemsDeleteRequest());
  }

  handleSelectStar = () => {
    const { dispatch, selectedItemEntities } = this.props;
    const isAllStar = this.isAllStarByItemEntities(selectedItemEntities);
    dispatch(ItemActions.selectedItemsStarRequest(!isAllStar));
  }

  handleSelectMenuItemClick = (menuItem: MenuItem, value: Function) => {
    this.props.dispatch(value());
  }

  isAllStarByItemEntities(entities: ItemEntities): boolean {
    return entities.every(entity => entity.star);
  }

  hasSelectedItems(): boolean {
    return this.props.selectedItemEntities.length > 0;
  }

  renderEmptyData() {
    const {
      boards,
      items,
      itemEntities,
      emptyComponent
    } = this.props;

    if (
      !ExecutionEnvironment.canUseDOM ||
      items.isFetching ||
      itemEntities.length > 0 ||
      boards.isFetching
    ) {
      return null;
    }

    return emptyComponent;
  }

  renderFetchingSpinner() {
    const { items, boards } = this.props;

    if (
      (!ExecutionEnvironment.canUseDOM || !items.isFetching) &&
      !boards.isFetching
    ) {
      return null;
    }

    return <Spinner className={b("fetching-spinner")()} />;
  }

  render() {
    const {
      rawBoardEntities,
      currentBoard,
      currentItem,
      items,
      itemEntities,
      selectedItemEntities,
      options: {
        itemsLayout,
        itemsSize,
        itemsOrderBy,
        itemsOrder
      }
    } = this.props;

    const hasSelectedItems = this.hasSelectedItems();
    const isAllStar = this.isAllStarByItemEntities(selectedItemEntities);
    const selectBoards = rawBoardEntities
      .filter(entity => {
        if (currentBoard) {
          return currentBoard.id !== entity.id;
        } else if (currentItem) {
          return currentItem.board_id !== entity.id;
        }
        return true;
      })
      .map(entity => ({
        value: entity.id,
        name: entity.name
      }));

    return (
      <MultipleSelectableGroup
        className={`container ${b()}`}
        selectedKeys={selectedItemEntities.map(o => o.id)}
        onSelection={this.handleSelection}
        tolerance={5}
        selectOnMouseMove={false}
      >
        <CardGroupControl
          sortTypes={[
            { name: "名前", value: "name" },
            { name: "作成", value: "created_at" },
            { name: "最終閲覧", value: "viewed_at" }
          ]}
          sortOrderBy={itemsOrderBy}
          sortOrder={itemsOrder}
          onSortOrderByChange={this.handleOrderByChange}
          onSortOrderChange={this.handleOrderChange}
          colors={selectColors}
          selectColors={items.currentColors}
          onColorComplete={this.handleColorComplete}
        />

        {this.renderEmptyData()}
        {this.renderFetchingSpinner()}

        <CardGroup
          columnWidth={itemsSize}
          layout={itemsLayout}
        >
          {itemEntities.map(item =>
            <SelectableItemCard
              key={item.id}
              selectableKey={item.id}
              selected={item.select}
              id={item.id}
              processing={item.isUpdating || item.isMoving || item.isDeleting}
              layout={itemsLayout}
              title={item.name}
              url={item.url}
              image={item.thumbnail}
              imageWidth={item.width}
              imageHeight={item.height}
              star={item.star}
              colors={item.palette}
              onClick={this.handleClick}
              onSelect={this.handleSelect}
              onStar={this.handleStar}
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
              tooltip={isAllStar ? "スターを外す" : "スターを付ける"}
              icon={<StarIcon />}
              onClick={this.handleSelectStar}
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
                <MenuItem primary="すべて選択" value={ItemActions.selectAllItem} />
              }
              <MenuItem primary="スター付きを選択" value={ItemActions.selectStarItem} />
              <MenuItem primary="選択を解除" value={ItemActions.unselectAllItem} />
            </IconMenu>
          ]}
        />
      </MultipleSelectableGroup>
    );
  }
}

export default connect(
  (state: ConnectState) => ({
    options: state.options,
    boards: state.boards,
    rawBoardEntities: getRawBoardEntities(state),
    items: state.items,
    itemEntities: getVisibleItemEntities(state),
    selectedItemEntities: getSelectedItemEntities(state),
    currentBoard: getCurrentBoard(state),
    currentItem: getCurrentItem(state)
  })
)(ItemsContainer);
