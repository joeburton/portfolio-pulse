import React from "react";

import styles from "../css/ContentIntro.module.css";

const rule = {
  background: `url(${process.env.PUBLIC_URL + `../images/line.png`}) repeat-x`,
  backgroundPosition: "left center",
};

const ContentIntro = ({ content }: any) => {
  if (!content) {
    return <div />;
  }

  const createMarkup = (htmlString: string) => {
    return { __html: htmlString };
  };

  return (
    <section className={styles.intro} data-testid="contentIntro">
      <div className={styles.content}>
        <div className={styles.frame}>
          <h1 style={rule}>
            <span className={styles.welcome}>{content.title}</span>
          </h1>
          <div>
            <h2 dangerouslySetInnerHTML={createMarkup(content.body1)}></h2>
            <h3>{content.body2}</h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentIntro;
