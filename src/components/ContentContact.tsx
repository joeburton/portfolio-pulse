import React from "react";
import BackToTop from "./BackToTop";

import styles from "../css/ContentContact.module.css";

interface ContentContactProps {
  scrollTo: any;
  content: any;
}

const ContentContact = ({ content, scrollTo }: ContentContactProps) => {
  if (!content) {
    return <div />;
  }

  return (
    <section
      id="contact"
      className={styles.contact}
      data-testid="contentContact"
    >
      <div className={styles.content}>
        <div className={styles.frame}>
          <h2>{content.title}</h2>
          <h5 className={styles.box}>{content.body1}</h5>
        </div>
        <BackToTop scrollTo={scrollTo} />
      </div>
    </section>
  );
};

export default ContentContact;
