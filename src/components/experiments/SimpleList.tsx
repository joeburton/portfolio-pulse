import React from "react";

import styles from "../../css/SimpleList.module.css";

interface Candidate {
  name: string;
  score: string;
}

interface Candidates {
  candidates: Candidate[];
}

const ComponentListItem = ({ name, score }: Candidate) => {
  return (
    <li>
      {name}, {score}
    </li>
  );
};

export const ComponentList = ({ candidates }: Candidates) => {
  const items = candidates.map((candidate, i) => {
    return <ComponentListItem {...candidate} key={i} />;
  });

  return <ul className={styles.simpleList}>{items}</ul>;
};
