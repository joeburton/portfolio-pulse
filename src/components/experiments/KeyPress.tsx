import React from "react";

import { useKeyPress } from "../../hooks/useKeyPress";

import styles from "../../css/KeyPress.module.css";

export const KeyPress = () => {
  const happyPress: boolean = useKeyPress("h");
  const sadPress: boolean = useKeyPress("s");
  const robotPress: boolean = useKeyPress("r");
  const foxPress: boolean = useKeyPress("f");
  // console.log(happyPress);
  return (
    <div className={styles.keyPress}>
      <div className={styles.keys}>keys: h, s, r, f</div>
      <div className={styles.keys}>
        {happyPress && "😊"}
        {sadPress && "😢"}
        {robotPress && "🤖"}
        {foxPress && "🦊"}
      </div>
    </div>
  );
};
