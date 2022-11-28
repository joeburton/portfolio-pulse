import React, { useEffect, useReducer } from "react";

import { useAppContext } from "../store";
import ItemForm from "./ItemForm";
import ItemRecord from "./ItemRecord";
import Login from "./Login";

import styles from "../css/Manage.module.css";

type State = {
  manageItems: boolean;
  addItem: boolean;
  editItem: boolean;
  itemsList: boolean;
};

const initialState: State = {
  manageItems: false,
  addItem: false,
  editItem: false,
  itemsList: false,
};

enum MANAGE_ACTIONS {
  MANAGE_ITEMS_TAB,
  ADD_ITEM_TAB,
  ITEMS_LIST_TAB,
  EDIT_ITEM_TAB,
}

type Action = {
  type: MANAGE_ACTIONS;
  payload?: any;
};

const manageReducer = (state: State, { type, payload }: Action) => {
  switch (type) {
    case MANAGE_ACTIONS.MANAGE_ITEMS_TAB:
      return { ...initialState, manageItems: payload };
    case MANAGE_ACTIONS.ADD_ITEM_TAB:
      return { ...initialState, addItem: payload };
    case MANAGE_ACTIONS.ITEMS_LIST_TAB:
      return { ...initialState, itemsList: payload };
    case MANAGE_ACTIONS.EDIT_ITEM_TAB:
      return { ...initialState, editItem: payload };
    default:
      return { ...initialState, manageItems: true };
  }
};

const Manage = () => {
  const { state, dispatch, ACTIONS } = useAppContext();
  const items = state.items;
  const userSession = state.userSession;

  const [adminState, dispatchAdminState] = useReducer(manageReducer, {
    ...initialState,
    manageItems: true,
  });

  useEffect(() => {
    if (state.itemToEditId && adminState.itemsList) {
      dispatchAdminState({ type: MANAGE_ACTIONS.EDIT_ITEM_TAB, payload: true });
    } else if (!state.itemToEditId && adminState.editItem) {
      dispatchAdminState({
        type: MANAGE_ACTIONS.ITEMS_LIST_TAB,
        payload: true,
      });
    }
  }, [state.itemToEditId, adminState.editItem, adminState.itemsList]);

  return (
    <section className={styles.manage} data-testid="manage">
      <div className={styles.content}>
        <ul className={styles.tabs} data-testid="tabs">
          <li
            onClick={() =>
              dispatchAdminState({
                type: MANAGE_ACTIONS.MANAGE_ITEMS_TAB,
                payload: true,
              })
            }
            className={adminState.manageItems ? styles.active : ""}
          >
            Manage
          </li>
          {userSession.loggedIn && (
            <li
              onClick={() =>
                dispatchAdminState({
                  type: MANAGE_ACTIONS.ADD_ITEM_TAB,
                  payload: true,
                })
              }
              className={adminState.addItem ? styles.active : ""}
            >
              Add Item
            </li>
          )}
          {userSession.loggedIn && (
            <li
              onClick={() => {
                dispatchAdminState({
                  type: MANAGE_ACTIONS.ITEMS_LIST_TAB,
                  payload: true,
                });
                dispatch({
                  type: ACTIONS.SET_EDIT_ITEM_ID,
                  payload: "",
                });
              }}
              className={adminState.itemsList ? styles.active : ""}
            >
              Items List
            </li>
          )}
          {userSession.loggedIn && adminState.editItem && (
            <li className={styles.active}>Edit Item</li>
          )}
        </ul>
        {adminState.manageItems && (
          <div className={styles["manage-items"]} data-testid="manage-items">
            <Login />
          </div>
        )}
        {adminState.addItem && <ItemForm />}
        {adminState.itemsList && (
          <div className={styles["items-list"]} data-testid="items-list">
            <h4>Items List</h4>
            <ul>
              {items.map((item, i) => {
                return <ItemRecord key={i} {...item} />;
              })}
            </ul>
          </div>
        )}
        {adminState.editItem && <ItemForm id={state.itemToEditId} />}
      </div>
    </section>
  );
};

export default Manage;
