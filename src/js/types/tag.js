// @flow
import type { Action, PayloadAction, ErrorAction } from "./action";
import type { ArrayNormalized, SingleNormalized } from "./normalize";

export type TagId = number;

export type Tag = {
  id: TagId;
  name: string;
  updated_at: Date;
  created_at: Date;
};

export type Tags = Array<Tag>;

export type TagEntity = $All<Tag, {
  isUpdating: boolean;
  isDeleting: boolean;
}>;

export type TagEntities = Array<TagEntity>;

export type TagState = {
  isFetching: boolean;
  isAdding: boolean;
  results: Array<TagId>;
  currentTag: ?TagId;
  error: ?Error;
  drawerOpen: boolean;
};

export type TagEntitiesState = { [key: TagId]: TagEntity };


// Current
export type SetCurrentTagAction = PayloadAction<"SET_CURRENT_TAG", ?TagId>;


// Drawer
export type TagDrawerOpenAction = Action<"TAG_DRAWER_OPEN">;
export type TagDrawerCloseAction = Action<"TAG_DRAWER_CLOSE">;
export type TagDrawerToggleAction = Action<"TAG_DRAWER_TOGGLE">;


// Fetch
export type FetchTagsSuccessPayload = ArrayNormalized<"tags", TagEntity, TagId>;
export type FetchTagsRequestAction = Action<"FETCH_TAGS_REQUEST">;
export type FetchTagsSuccessAction = PayloadAction<"FETCH_TAGS_SUCCESS", FetchTagsSuccessPayload>;
export type FetchTagsFailureAction = ErrorAction<"FETCH_TAGS_FAILURE", Error>;


// Add
export type AddTagSuccessPayload = SingleNormalized<"tags", "tag", TagEntity, TagId>;
export type AddTagRequestAction = PayloadAction<"ADD_TAG_REQUEST", string>;
export type AddTagSuccessAction = PayloadAction<"ADD_TAG_SUCCESS", AddTagSuccessPayload>;
export type AddTagFailureAction = ErrorAction<"ADD_TAG_FAILURE", Error>;
