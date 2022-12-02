import React, { createContext, useReducer, useContext, ReactNode } from 'react';
import { ItemInterface } from '../components/Item';

interface User {
  username: string;
  loggedIn: boolean;
}

type State = {
  content: any;
  items: Array<ItemInterface>;
  manageActive: boolean;
  itemToEditId?: string;
  userSession: User;
};

export const DEFAULT_STATE: State = {
  content: [],
  items: [],
  manageActive: false,
  itemToEditId: '',
  userSession: {
    username: '',
    loggedIn: false,
  },
};

enum ACTION_NAME {
  UPDATE_ITEMS,
  UPDATE_CONTENT,
  TOGGLE_MANAGE_ACTIVE,
  REMOVE_ITEM,
  SET_EDIT_ITEM_ID,
  UPDATE_SESSION,
}

type Action = {
  type: ACTION_NAME;
  payload?: any;
};

export const reducer = (state: State, { type, payload }: Action): State => {
  switch (type) {
    case ACTION_NAME.UPDATE_ITEMS:
      return { ...state, items: payload };
    case ACTION_NAME.REMOVE_ITEM:
      const items = state.items.filter((value) => value._id !== payload._id);
      return { ...state, items: items };
    case ACTION_NAME.UPDATE_CONTENT:
      return { ...state, content: payload };
    case ACTION_NAME.TOGGLE_MANAGE_ACTIVE:
      return { ...state, manageActive: payload };
    case ACTION_NAME.SET_EDIT_ITEM_ID:
      return { ...state, itemToEditId: payload };
    case ACTION_NAME.UPDATE_SESSION:
      return { ...state, userSession: payload };
    default:
      return state;
  }
};

type ComponentContext = [State, React.Dispatch<Action>];

const Context: React.Context<ComponentContext> = createContext([
  DEFAULT_STATE,
  ({ type, payload }) => {},
]);

export const AppProvider = (props: {
  children: ReactNode;
  defaultState?: State;
}) => {
  const [state, dispatch] = useReducer(
    reducer,
    props?.defaultState ? props.defaultState : DEFAULT_STATE
  );

  return (
    <Context.Provider value={[state, dispatch]}>
      {props.children}
    </Context.Provider>
  );
};

export const useAppContext = () => {
  const [state, dispatch] = useContext(Context);

  return {
    state,
    dispatch,
    ACTIONS: ACTION_NAME,
  };
};
