import React from "react";

import styles from "../../css/MapList.module.css";

interface Candidate {
  name: string;
  score: string;
}

interface Candidates {
  candidates: Candidate[];
}

export const MapList = ({ candidates }: Candidates) => {
  const items = candidates.map((candidate, i) => {
    return (
      <li key={i}>
        {candidate.name}, {candidate.score}
      </li>
    );
  });

  return <ul className={styles.mapList}>{items}</ul>;
};
