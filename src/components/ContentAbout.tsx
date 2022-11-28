import React from "react";
import BackToTop from "./BackToTop";

import styles from "../css/ContentAbout.module.css";

interface ContentAboutProps {
  scrollTo: any;
  content: any;
}

const ContentAbout = ({ content, scrollTo }: ContentAboutProps) => {
  if (!content) {
    return <div />;
  }

  return (
    <section id="about" className={styles.about} data-testid="contentAbout">
      <div className={styles.content}>
        <div className={styles.frameSplit}>
          <h2>{content.title}</h2>
          <div className={styles.alpha}>
            <h4>{content.body1}</h4>
          </div>
          <div className={styles.beta}>
            <h4>{content.body2}</h4>
          </div>
        </div>
        <BackToTop scrollTo={scrollTo} />
      </div>
    </section>
  );
};

export default ContentAbout;
