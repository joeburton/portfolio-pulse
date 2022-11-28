import React, { useState } from "react";
import Manage from "./Manage";
import { useAppContext } from "../store";

import styles from "../css/Header.module.css";

const SpinningMe = {
  background: `url(${process.env.PUBLIC_URL + `../images/me.jpg?me=1`}) 0 0`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "50px 50px",
};

interface HeaderProps {
  scrollTo: any;
  content: any;
}

const Header = ({ content, scrollTo }: HeaderProps) => {
  const { dispatch, ACTIONS } = useAppContext();

  const [manageActive, setManageActive] = useState<boolean>(false);

  const openLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch({ type: ACTIONS.TOGGLE_MANAGE_ACTIVE, payload: !manageActive });
    setManageActive(!manageActive);
  };

  if (!content) {
    return <div />;
  }

  return (
    <div data-testid="header">
      <header id="top">
        <nav>
          <ul>
            <li>
              <button id="#projects" onClick={scrollTo}>
                {content.link1}
              </button>
            </li>
            <li>
              <button id="#about" onClick={scrollTo}>
                {content.link2}
              </button>
            </li>
            <li>
              <button id="#contact" onClick={scrollTo}>
                {content.link3}
              </button>
            </li>
          </ul>
        </nav>
        <button className={styles.logo} style={SpinningMe} onClick={openLogin}>
          <span>JB</span>
        </button>
      </header>
      {manageActive && <Manage />}
    </div>
  );
};

export default Header;
