import React, { useState, useEffect } from "react";

import { useAppContext } from "../store";
import { ItemInterface } from "./Item";
import styles from "../css/ItemRecord.module.css";

const ItemRecord = (item: ItemInterface) => {
  const { dispatch, ACTIONS } = useAppContext();
  const [isDeletedVisible, setIsDeletedVisible] = useState<boolean>(false);

  useEffect(() => {
    if (isDeletedVisible) {
      setTimeout(() => {
        setIsDeletedVisible(false);
        dispatch({ type: ACTIONS.REMOVE_ITEM, payload: item });
      }, 1000);
    }
  }, [isDeletedVisible, dispatch, item, ACTIONS]);

  const deleteItem = () => {
    fetch("/api/delete-item", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: item._id }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.Error) {
          throw new Error(data.Error);
        }
        setIsDeletedVisible(true);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const editItem = () => {
    dispatch({ type: ACTIONS.SET_EDIT_ITEM_ID, payload: item._id });
  };

  return (
    <li data-testid="item-record">
      {item.company}
      <span className={styles["manage-item"]} onClick={deleteItem}>
        Delete
      </span>
      -
      <span className={styles["manage-item"]} onClick={editItem}>
        Edit
      </span>
      <span
        className={`${styles.deleted} ${isDeletedVisible ? "" : "hidden"} `}
      >
        Removing item
      </span>
    </li>
  );
};

export default ItemRecord;
