// @flow
import { identity } from "lodash";
import { createAction } from "redux-actions";

import type { Palette } from "../types/prop-types";
import type { BoardId } from "../types/board";
import type { TagId } from "../types/tag";
import type {
  ItemId,
  ItemEntity,
  ItemEntities,
  ItemVisibilityFilter,

  SetCurrentItemAction,
  SetItemCurrentColors,
  SetItemVisibilityFilterAction,
  SetItemImageEditingAction,

  FetchItemsSuccessPayload,
  FetchItemsRequestAction,
  FetchItemsSuccessAction,
  FetchItemsFailureAction,

  AddItemURLDialogOpenAction,
  AddItemURLDialogCloseAction,

  TakeScreenshotStartAction,
  TakeScreenshotEndAction,

  AddItemFileDialogOpenAction,
  AddItemFileDialogCloseAction,

  AddItemURLSuccessPayload,
  AddItemURLRequestAction,
  AddItemURLSuccessAction,
  AddItemURLFailureAction,

  AddItemFileSuccessPayload,
  AddItemFileRequestAction,
  AddItemFileSuccessAction,
  AddItemFileFailureAction,

  GotoAddedItemAction,

  DeleteItemSuccessPayload,
  DeleteItemRequestAction,
  DeleteItemSuccessAction,
  DeleteItemFailureAction,

  StarItemToggleSuccessPayload,
  StarItemToggleRequestAction,
  StarItemToggleSuccessAction,
  StarItemToggleFailureAction,

  UpdateItemNameSuccessPayload,
  UpdateItemNameIfNeededAction,
  UpdateItemNameRequestAction,
  UpdateItemNameSuccessAction,
  UpdateItemNameFailureAction,

  UpdateItemDescriptionSuccessPayload,
  UpdateItemDescriptionRequestAction,
  UpdateItemDescriptionSuccessAction,
  UpdateItemDescriptionFailureAction,

  UpdateItemImageSuccessPayload,
  UpdateItemImageRequestAction,
  UpdateItemImageSuccessAction,
  UpdateItemImageFailureAction,

  AddItemTagSuccessPayload,
  AddItemTagIfNeededAction,
  AddItemTagRequestAction,
  AddItemTagSuccessAction,
  AddItemTagFailureAction,

  RemoveItemTagSuccessPayload,
  RemoveItemTagRequestAction,
  RemoveItemTagSuccessAction,
  RemoveItemTagFailureAction,

  RegisterItemTagSuccessPayload,
  RegisterItemTagRequestAction,
  RegisterItemTagSuccessAction,
  RegisterItemTagFailureAction,

  MoveItemSelectBoardOpenAction,
  MoveItemSelectBoardCloseAction,

  MoveItemSuccessPayload,
  MoveItemRequestAction,
  MoveItemSuccessAction,
  MoveItemFailureAction,

  GotoAfterMoveItemBoardAction,

  SetSelectItemsAction,

  SelectItemToggleAction,

  SelectAllItemExecAction,
  SelectAllItemAction,

  UnselectAllItemExecAction,
  UnselectAllItemAction,

  SelectStarItemExecAction,
  SelectStarItemAction,

  SelectedItemsStarSuccessPayload,
  SelectedItemsStarRequestAction,
  SelectedItemsStarSuccessAction,
  SelectedItemsStarFailureAction,

  SelectedItemsMoveOpenAction,
  SelectedItemsMoveCloseAction,

  SelectedItemsMoveSuccessPayload,
  SelectedItemsMoveRequestAction,
  SelectedItemsMoveSuccessAction,
  SelectedItemsMoveFailureAction,

  SelectedItemsDeleteSuccessPayload,
  SelectedItemsDeleteRequestAction,
  SelectedItemsDeleteSuccessAction,
  SelectedItemsDeleteFailureAction,

  ItemDetailDrawerToggleAction,
  ItemDetailDrawerOpenAction,
  ItemDetailDrawerCloseAction
} from "../types/item";


// Set current
export const SET_CURRENT_ITEM = "SET_CURRENT_ITEM";
export const setCurrentItem = (id: ?ItemId): SetCurrentItemAction => (
  { type: SET_CURRENT_ITEM, payload: id }
);


// Set color
export const SET_ITEM_CURRENT_COLORS = "SET_ITEM_CURRENT_COLORS";
export const setItemCurrentColors = (colors: Array<string>): SetItemCurrentColors => (
  { type: SET_ITEM_CURRENT_COLORS, payload: colors }
);


// Set visibility filters
export const SET_ITEM_VISIBILITY_FILTER = "SET_ITEM_VISIBILITY_FILTER";
export const setItemVisibilityFilter = (visibilityFilter: ItemVisibilityFilter): SetItemVisibilityFilterAction => (
  { type: SET_ITEM_VISIBILITY_FILTER, payload: visibilityFilter }
);


// Set image editing
export const SET_ITEM_IMAGE_EDITING = "SET_ITEM_IMAGE_EDITING";
export const setItemImageEditing = (isOpen: boolean): SetItemImageEditingAction => (
  { type: SET_ITEM_IMAGE_EDITING, payload: isOpen }
);


// Fetch
export const FETCH_ITEMS_REQUEST = "FETCH_ITEMS_REQUEST";
export const FETCH_ITEMS_SUCCESS = "FETCH_ITEMS_SUCCESS";
export const FETCH_ITEMS_FAILURE = "FETCH_ITEMS_FAILURE";

export const fetchItemsRequest = (): FetchItemsRequestAction => (
  { type: FETCH_ITEMS_REQUEST }
);

export const fetchItemsSuccess = (payload: FetchItemsSuccessPayload): FetchItemsSuccessAction => (
  { type: FETCH_ITEMS_SUCCESS, payload }
);

export const fetchItemsFailure = (error: Error): FetchItemsFailureAction => (
  { type: FETCH_ITEMS_FAILURE, payload: error, error: true }
);


// Add from URL (UI)
export const ADD_ITEM_URL_DIALOG_OPEN = "ADD_ITEM_URL_DIALOG_OPEN";
export const ADD_ITEM_URL_DIALOG_CLOSE = "ADD_ITEM_URL_DIALOG_CLOSE";

export const addItemURLDialogOpen = (): AddItemURLDialogOpenAction => ({ type: ADD_ITEM_URL_DIALOG_OPEN });
export const addItemURLDialogClose = (): AddItemURLDialogCloseAction => ({ type: ADD_ITEM_URL_DIALOG_CLOSE });


// Add from File (UI)
export const ADD_ITEM_FILE_DIALOG_OPEN = "ADD_ITEM_FILE_DIALOG_OPEN";
export const ADD_ITEM_FILE_DIALOG_CLOSE = "ADD_ITEM_FILE_DIALOG_CLOSE";

export const addItemFileDialogOpen = (): AddItemFileDialogOpenAction => ({ type: ADD_ITEM_FILE_DIALOG_OPEN });
export const addItemFileDialogClose = (): AddItemFileDialogCloseAction => ({ type: ADD_ITEM_FILE_DIALOG_CLOSE });


// Add from URL
export const ADD_ITEM_URL_REQUEST = "ADD_ITEM_URL_REQUEST";
export const ADD_ITEM_URL_SUCCESS = "ADD_ITEM_URL_SUCCESS";
export const ADD_ITEM_URL_FAILURE = "ADD_ITEM_URL_FAILURE";

export const addItemURLRequest = (url: string, board: BoardId): AddItemURLRequestAction => (
  { type: ADD_ITEM_URL_REQUEST, payload: { url, board } }
);

export const addItemURLSuccess = (payload: AddItemURLSuccessPayload): AddItemURLSuccessAction => (
  { type: ADD_ITEM_URL_SUCCESS, payload }
);

export const addItemURLFailure = (error: Error): AddItemURLFailureAction => (
  { type: ADD_ITEM_URL_FAILURE, payload: error, error: true }
);


// Taking screenshot
export const TAKE_SCREENSHOT_START = "TAKE_SCREENSHOT_START";
export const TAKE_SCREENSHOT_END = "TAKE_SCREENSHOT_END";

export const takeScreenshotStart = (): TakeScreenshotStartAction => (
  { type: TAKE_SCREENSHOT_START }
);

export const takeScreenshotEnd = (): TakeScreenshotEndAction => (
  { type: TAKE_SCREENSHOT_END }
);


// Add from file
export const ADD_ITEM_FILE_REQUEST = "ADD_ITEM_FILE_REQUEST";
export const ADD_ITEM_FILE_SUCCESS = "ADD_ITEM_FILE_SUCCESS";
export const ADD_ITEM_FILE_FAILURE = "ADD_ITEM_FILE_FAILURE";

export const addItemFileRequest = (board: BoardId, file: File, palette: Palette): AddItemFileRequestAction => (
  { type: ADD_ITEM_FILE_REQUEST, payload: { board, file, palette } }
);

export const addItemFileSuccess = (payload: AddItemFileSuccessPayload): AddItemFileSuccessAction => (
  { type: ADD_ITEM_FILE_SUCCESS, payload }
);

export const addItemFileFailure = (error: Error): AddItemFileFailureAction => (
  { type: ADD_ITEM_FILE_FAILURE, payload: error, error: true }
);


// Goto added item
export const GOTO_ADDED_ITEM = "GOTO_ADDED_ITEM";
export const gotoAddedItem = (id: ItemId): GotoAddedItemAction => (
  { type: GOTO_ADDED_ITEM, payload: id }
);


// Star
export const STAR_ITEM_TOGGLE_REQUEST = "STAR_ITEM_TOGGLE_REQUEST";
export const STAR_ITEM_TOGGLE_SUCCESS = "STAR_ITEM_TOGGLE_SUCCESS";
export const STAR_ITEM_TOGGLE_FAILURE = "STAR_ITEM_TOGGLE_FAILURE";

export const starItemToggleRequest = (id: ItemId): StarItemToggleRequestAction => (
  { type: STAR_ITEM_TOGGLE_REQUEST, payload: id }
);

export const starItemToggleSuccess = (payload: StarItemToggleSuccessPayload): StarItemToggleSuccessAction => (
  { type: STAR_ITEM_TOGGLE_SUCCESS, payload }
);

export const starItemToggleFailure = (error: Error, id: ItemId): StarItemToggleFailureAction => (
  { type: STAR_ITEM_TOGGLE_FAILURE, payload: error, error: true, meta: id }
);


// Update name
function updateItemMetaCreator(error: Error, payload: Object): Object {
  return { ...payload };
}

export const UPDATE_ITEM_NAME_IF_NEEDED = "UPDATE_ITEM_NAME_IF_NEEDED";
export const UPDATE_ITEM_NAME_REQUEST = "UPDATE_ITEM_NAME_REQUEST";
export const UPDATE_ITEM_NAME_SUCCESS = "UPDATE_ITEM_NAME_SUCCESS";
export const UPDATE_ITEM_NAME_FAILURE = "UPDATE_ITEM_NAME_FAILURE";

export const updateItemNameIfNeeded = (id: ItemId, name: string): UpdateItemNameIfNeededAction => (
  { type: UPDATE_ITEM_NAME_IF_NEEDED, payload: { id, name } }
);

export const updateItemNameRequest = (id: ItemId, name: string): UpdateItemNameRequestAction => (
  { type: UPDATE_ITEM_NAME_REQUEST, payload: { id, name } }
);

export const updateItemNameSuccess = (payload: UpdateItemNameSuccessPayload): UpdateItemNameSuccessAction => (
  { type: UPDATE_ITEM_NAME_SUCCESS, payload }
);

export const updateItemNameFailure =
  (error: Error, payload: { id: ItemId; name: string; }): UpdateItemNameFailureAction => (
  { type: UPDATE_ITEM_NAME_FAILURE, payload: error, error: true, meta: payload }
);


// Update description
export const UPDATE_ITEM_DESCRIPTION_REQUEST = "UPDATE_ITEM_DESCRIPTION_REQUEST";
export const UPDATE_ITEM_DESCRIPTION_SUCCESS = "UPDATE_ITEM_DESCRIPTION_SUCCESS";
export const UPDATE_ITEM_DESCRIPTION_FAILURE = "UPDATE_ITEM_DESCRIPTION_FAILURE";

export const updateItemDescriptionRequest =
  (id: ItemId, description: string): UpdateItemDescriptionRequestAction => (
  { type: UPDATE_ITEM_DESCRIPTION_REQUEST, payload: { id, description } }
);

export const updateItemDescriptionSuccess =
  (payload: UpdateItemDescriptionSuccessPayload): UpdateItemDescriptionSuccessAction => (
  { type: UPDATE_ITEM_DESCRIPTION_SUCCESS, payload }
);

export const updateItemDescriptionFailure =
  (error: Error, payload: { id: ItemId; description: string; }): UpdateItemDescriptionFailureAction => (
  { type: UPDATE_ITEM_DESCRIPTION_FAILURE, payload: error, error: true, meta: payload }
);


// Update palette
export const UPDATE_ITEM_PALETTE_REQUEST: string = "UPDATE_ITEM_PALETTE_REQUEST";
export const UPDATE_ITEM_PALETTE_SUCCESS: string = "UPDATE_ITEM_PALETTE_SUCCESS";
export const UPDATE_ITEM_PALETTE_FAILURE: string = "UPDATE_ITEM_PALETTE_FAILURE";

export const updateItemPaletteRequest = createAction(UPDATE_ITEM_PALETTE_REQUEST,
  (id: ItemId, palette: Palette): Object => ({ id, palette })
);
export const updateItemPaletteSuccess = createAction(UPDATE_ITEM_PALETTE_SUCCESS);
export const updateItemPaletteFailure = createAction(UPDATE_ITEM_PALETTE_FAILURE,
  identity,
  updateItemMetaCreator
);


// Update image
export const UPDATE_ITEM_IMAGE_REQUEST = "UPDATE_ITEM_IMAGE_REQUEST";
export const UPDATE_ITEM_IMAGE_SUCCESS = "UPDATE_ITEM_IMAGE_SUCCESS";
export const UPDATE_ITEM_IMAGE_FAILURE = "UPDATE_ITEM_IMAGE_FAILURE";

export const updateItemImageRequest = (id: ItemId, image: Blob): UpdateItemImageRequestAction => (
  { type: UPDATE_ITEM_IMAGE_REQUEST, payload: { id, image } }
);

export const updateItemImageSuccess = (payload: UpdateItemImageSuccessPayload): UpdateItemImageSuccessAction => (
  { type: UPDATE_ITEM_IMAGE_SUCCESS, payload }
);

export const updateItemImageFailure =
  (error: Error, payload: { id: ItemId; image: Blob; }): UpdateItemImageFailureAction => (
  { type: UPDATE_ITEM_IMAGE_FAILURE, payload: error, error: true, meta: payload }
);


// Add tag
export const ADD_ITEM_TAG_IF_NEEDED = "ADD_ITEM_TAG_IF_NEEDED";
export const ADD_ITEM_TAG_REQUEST = "ADD_ITEM_TAG_REQUEST";
export const ADD_ITEM_TAG_SUCCESS = "ADD_ITEM_TAG_SUCCESS";
export const ADD_ITEM_TAG_FAILURE = "ADD_ITEM_TAG_FAILURE";

export const addItemTagIfNeeded = (id: ItemId, tagId: TagId): AddItemTagIfNeededAction => (
  { type: ADD_ITEM_TAG_IF_NEEDED, payload: { id, tagId } }
);

export const addItemTagRequest = (id: ItemId, tagId: TagId): AddItemTagRequestAction => (
  { type: ADD_ITEM_TAG_REQUEST, payload: { id, tagId } }
);

export const addItemTagSuccess = (payload: AddItemTagSuccessPayload): AddItemTagSuccessAction => (
  { type: ADD_ITEM_TAG_SUCCESS, payload }
);

export const addItemTagFailure = (error: Error, payload: { id: ItemId; tagId: TagId; }): AddItemTagFailureAction => (
  { type: ADD_ITEM_TAG_FAILURE, payload: error, error: true, meta: payload }
);


// Remove tag
export const REMOVE_ITEM_TAG_REQUEST = "REMOVE_ITEM_TAG_REQUEST";
export const REMOVE_ITEM_TAG_SUCCESS = "REMOVE_ITEM_TAG_SUCCESS";
export const REMOVE_ITEM_TAG_FAILURE = "REMOVE_ITEM_TAG_FAILURE";

export const removeItemTagRequest = (id: ItemId, tagId: TagId): RemoveItemTagRequestAction => (
  { type: REMOVE_ITEM_TAG_REQUEST, payload: { id, tagId } }
);

export const removeItemTagSuccess = (payload: RemoveItemTagSuccessPayload): RemoveItemTagSuccessAction => (
  { type: REMOVE_ITEM_TAG_SUCCESS, payload }
);

export const removeItemTagFailure =
  (error: Error, payload: { id: ItemId; tagId: TagId; }): RemoveItemTagFailureAction => (
  { type: REMOVE_ITEM_TAG_FAILURE, payload: error, error: true, meta: payload }
);


// Register tag
export const REGISTER_ITEM_TAG_REQUEST = "REGISTER_ITEM_TAG_REQUEST";
export const REGISTER_ITEM_TAG_SUCCESS = "REGISTER_ITEM_TAG_SUCCESS";
export const REGISTER_ITEM_TAG_FAILURE = "REGISTER_ITEM_TAG_FAILURE";

export const registerItemTagRequest =
  (id: ItemId, label: string): RegisterItemTagRequestAction => (
  { type: REGISTER_ITEM_TAG_REQUEST, payload: { id, label } }
);

export const registerItemTagSuccess =
  (payload: RegisterItemTagSuccessPayload): RegisterItemTagSuccessAction => (
  { type: REGISTER_ITEM_TAG_SUCCESS, payload }
);

export const registerItemTagFailure =
  (error: Error, payload: { id: ItemId; label: string; }): RegisterItemTagFailureAction => (
  { type: REGISTER_ITEM_TAG_FAILURE, payload: error, error: true, meta: payload }
);


// Move board
export const MOVE_ITEM_SELECT_BOARD_OPEN = "MOVE_ITEM_SELECT_BOARD_OPEN";
export const MOVE_ITEM_SELECT_BOARD_CLOSE = "MOVE_ITEM_SELECT_BOARD_CLOSE";

export const moveItemSelectBoardOpen = (id: ItemId): MoveItemSelectBoardOpenAction => (
  { type: MOVE_ITEM_SELECT_BOARD_OPEN, payload: id }
);

export const moveItemSelectBoardClose = (): MoveItemSelectBoardCloseAction => (
  { type: MOVE_ITEM_SELECT_BOARD_CLOSE }
);

export const MOVE_ITEM_REQUEST = "MOVE_ITEM_REQUEST";
export const MOVE_ITEM_SUCCESS = "MOVE_ITEM_SUCCESS";
export const MOVE_ITEM_FAILURE = "MOVE_ITEM_FAILURE";

export const moveItemRequest = (boardId: BoardId): MoveItemRequestAction => (
  { type: MOVE_ITEM_REQUEST, payload: boardId }
);

export const moveItemSuccess = (payload: MoveItemSuccessPayload, prevBoard: BoardId): MoveItemSuccessAction => (
  { type: MOVE_ITEM_SUCCESS, payload, meta: prevBoard }
);

export const moveItemFailure = (
  error: Error,
  entity: ?ItemEntity,
  prevBoard: ?BoardId,
  nextBoard: ?BoardId
): MoveItemFailureAction => (
  { type: MOVE_ITEM_FAILURE, payload: error, error: true, meta: { entity, prevBoard, nextBoard } }
);


// Goto after board
export const GOTO_AFTER_MOVE_ITEM_BOARD = "GOTO_AFTER_MOVE_ITEM_BOARD";
export const gotoAfterMoveItemBoard = (boardId: BoardId): GotoAfterMoveItemBoardAction => (
  { type: GOTO_AFTER_MOVE_ITEM_BOARD, payload: boardId }
);


// Delete
export const DELETE_ITEM_REQUEST = "DELETE_ITEM_REQUEST";
export const DELETE_ITEM_SUCCESS = "DELETE_ITEM_SUCCESS";
export const DELETE_ITEM_FAILURE = "DELETE_ITEM_FAILURE";

export const deleteItemRequest = (id: ItemId): DeleteItemRequestAction => (
  { type: DELETE_ITEM_REQUEST, payload: id }
);
export const deleteItemSuccess = (payload: DeleteItemSuccessPayload): DeleteItemSuccessAction => (
  { type: DELETE_ITEM_SUCCESS, payload }
);
export const deleteItemFailure = (error: Error, entity: ?ItemEntity): DeleteItemFailureAction => (
  { type: DELETE_ITEM_FAILURE, payload: error, error: true, meta: entity }
);


// Set select items
export const SET_SELECT_ITEMS = "SET_SELECT_ITEMS";
export const setSelectItems = (ids: Array<ItemId>): SetSelectItemsAction => (
  { type: SET_SELECT_ITEMS, payload: ids }
);


// Select
export const SELECT_ITEM_TOGGLE = "SELECT_ITEM_TOGGLE";
export const selectItemToggle = (id: ItemId): SelectItemToggleAction => (
  { type: SELECT_ITEM_TOGGLE, payload: id }
);


// Select all
export const SELECT_ALL_ITEM_EXEC = "SELECT_ALL_ITEM_EXEC";
export const SELECT_ALL_ITEM = "SELECT_ALL_ITEM";
export const selectAllItemExec = (entities: ItemEntities): SelectAllItemExecAction => (
  { type: SELECT_ALL_ITEM_EXEC, payload: entities }
);
export const selectAllItem = (): SelectAllItemAction => (
  { type: SELECT_ALL_ITEM, meta: selectAllItemExec }
);


// Unselect all
export const UNSELECT_ALL_ITEM_EXEC = "UNSELECT_ALL_ITEM_EXEC";
export const UNSELECT_ALL_ITEM = "UNSELECT_ALL_ITEM";
export const unselectAllItemExec = (entities: ItemEntities): UnselectAllItemExecAction => (
  { type: UNSELECT_ALL_ITEM_EXEC, payload: entities }
);
export const unselectAllItem = (): UnselectAllItemAction => (
  { type: UNSELECT_ALL_ITEM, meta: unselectAllItemExec }
);


// Select star item
export const SELECT_STAR_ITEM_EXEC = "SELECT_STAR_ITEM_EXEC";
export const SELECT_STAR_ITEM = "SELECT_STAR_ITEM";
export const selectStarItemExec = (entities: ItemEntities): SelectStarItemExecAction => (
  { type: SELECT_STAR_ITEM_EXEC, payload: entities }
);
export const selectStarItem = (): SelectStarItemAction => (
  { type: SELECT_STAR_ITEM, meta: selectStarItemExec }
);


// Selected items move
export const SELECTED_ITEMS_MOVE_OPEN = "SELECTED_ITEMS_MOVE_OPEN";
export const SELECTED_ITEMS_MOVE_CLOSE = "SELECTED_ITEMS_MOVE_CLOSE";

export const selectedItemsMoveOpen = (): SelectedItemsMoveOpenAction => (
  { type: SELECTED_ITEMS_MOVE_OPEN }
);

export const selectedItemsMoveClose = (): SelectedItemsMoveCloseAction => (
  { type: SELECTED_ITEMS_MOVE_CLOSE }
);

export const SELECTED_ITEMS_MOVE_REQUEST = "SELECTED_ITEMS_MOVE_REQUEST";
export const SELECTED_ITEMS_MOVE_SUCCESS = "SELECTED_ITEMS_MOVE_SUCCESS";
export const SELECTED_ITEMS_MOVE_FAILURE = "SELECTED_ITEMS_MOVE_FAILURE";

export const selectedItemsMoveRequest = (boardId: BoardId): SelectedItemsMoveRequestAction => (
  { type: SELECTED_ITEMS_MOVE_REQUEST, payload: boardId }
);

export const selectedItemsMoveSuccess = (
  payload: SelectedItemsMoveSuccessPayload,
  prevBoards: Array<BoardId>
): SelectedItemsMoveSuccessAction => (
  { type: SELECTED_ITEMS_MOVE_SUCCESS, payload, meta: prevBoards }
);

export const selectedItemsMoveFailure = (
  error: Error,
  entities: ?ItemEntities,
  prevBoards: Array<BoardId>,
  nextBoard: BoardId
): SelectedItemsMoveFailureAction => (
  { type: SELECTED_ITEMS_MOVE_FAILURE, payload: error, error: true, meta: { entities, prevBoards, nextBoard } }
);


// Selected items star
export const SELECTED_ITEMS_STAR_REQUEST = "SELECTED_ITEMS_STAR_REQUEST";
export const SELECTED_ITEMS_STAR_SUCCESS = "SELECTED_ITEMS_STAR_SUCCESS";
export const SELECTED_ITEMS_STAR_FAILURE = "SELECTED_ITEMS_STAR_FAILURE";

export const selectedItemsStarRequest = (star: boolean): SelectedItemsStarRequestAction => (
  { type: SELECTED_ITEMS_STAR_REQUEST, payload: star }
);
export const selectedItemsStarSuccess = (payload: SelectedItemsStarSuccessPayload): SelectedItemsStarSuccessAction => (
  { type: SELECTED_ITEMS_STAR_SUCCESS, payload }
);
export const selectedItemsStarFailure = (error: Error, entities?: ?ItemEntities): SelectedItemsStarFailureAction => (
  { type: SELECTED_ITEMS_STAR_FAILURE, payload: error, error: true, meta: entities }
);


// Selected items delete
export const SELECTED_ITEMS_DELETE_REQUEST = "SELECTED_ITEMS_DELETE_REQUEST";
export const SELECTED_ITEMS_DELETE_SUCCESS = "SELECTED_ITEMS_DELETE_SUCCESS";
export const SELECTED_ITEMS_DELETE_FAILURE = "SELECTED_ITEMS_DELETE_FAILURE";

export const selectedItemsDeleteRequest = (): SelectedItemsDeleteRequestAction => (
  { type: SELECTED_ITEMS_DELETE_REQUEST }
);
export const selectedItemsDeleteSuccess =
  (payload: SelectedItemsDeleteSuccessPayload): SelectedItemsDeleteSuccessAction => (
  { type: SELECTED_ITEMS_DELETE_SUCCESS, payload }
);
export const selectedItemsDeleteFailure = (error: Error, entities: ?ItemEntities): SelectedItemsDeleteFailureAction => (
  { type: SELECTED_ITEMS_DELETE_FAILURE, payload: error, error: true, meta: entities }
);


// Detail drawer
export const ITEM_DETAIL_DRAWER_TOGGLE = "ITEM_DETAIL_DRAWER_TOGGLE";
export const ITEM_DETAIL_DRAWER_OPEN = "ITEM_DETAIL_DRAWER_OPEN";
export const ITEM_DETAIL_DRAWER_CLOSE = "ITEM_DETAIL_DRAWER_CLOSE";

export const itemDetailDrawerToggle = (): ItemDetailDrawerToggleAction => (
  { type: ITEM_DETAIL_DRAWER_TOGGLE }
);

export const itemDetailDrawerOpen = (): ItemDetailDrawerOpenAction => (
  { type: ITEM_DETAIL_DRAWER_OPEN }
);

export const itemDetailDrawerClose = (): ItemDetailDrawerCloseAction => (
  { type: ITEM_DETAIL_DRAWER_CLOSE }
);
