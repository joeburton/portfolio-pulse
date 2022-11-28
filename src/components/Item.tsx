import React, { useEffect, useState } from "react";

import styles from "../css/Item.module.css";
import "../css/logos.css";

export interface LinksInterface {
  visual: string;
  url: string;
}

export interface ItemInterface {
  _id?: string;
  order?: number;
  logo?: string;
  class?: string;
  role?: string;
  company?: string;
  description?: string;
  skills?: string;
  links?: Array<LinksInterface>;
}

const Links = (props: any) => {
  const links = props.links.map((link: LinksInterface, index: any) => (
    <a
      id={`item-${index}`}
      key={index}
      href={`${link.url}`}
      target="_blank"
      rel="noopener noreferrer"
    >{`${link.visual}`}</a>
  ));
  return <div className="links">{links}</div>;
};

export const Item = (item: ItemInterface) => {
  const [expand, setExpand] = useState<boolean>(false);
  const [expandVisible, setExpandVisible] = useState<boolean>(true);

  useEffect(() => {
    if (item.description && item.description.length < 100) {
      setExpand(true);
      setExpandVisible(false);
    }
  }, [item]);

  return (
    <li className={styles.item}>
      {item.logo && (
        <img
          src={process.env.PUBLIC_URL + `../images/${item.logo}`}
          alt={`${item.company}`}
          className={`${styles["company-logo"]} ${item.class}`}
        />
      )}
      {item.role && (
        <p className={!item.logo ? "no-logo" : ""}>Role&#58; {item.role}</p>
      )}
      {item.company && <p>Company: {item.company}</p>}
      {item.skills && (
        <p>
          <span>Skills&#58; </span>
          <span dangerouslySetInnerHTML={{ __html: item.skills }} />
        </p>
      )}
      {item.description && (
        <p>
          <span
            data-testid="description"
            className={styles.details}
            style={{ height: expand ? `100%` : `60px` }}
            dangerouslySetInnerHTML={{ __html: item.description }}
          />
          {expandVisible && (
            <span
              data-testid="expand-description"
              onClick={() => {
                setExpand(!expand);
              }}
              className={styles.expand}
            >
              {expand === false ? `Read more >` : `Read less v`}
            </span>
          )}
        </p>
      )}
      {item.links && <Links links={item.links} />}
    </li>
  );
};
