import React, { useEffect } from "react";
import BackToTop from "./BackToTop";
import useFetch from "../hooks/useDataLoader";
import { useAppContext } from "../store";
import { Item, ItemInterface } from "./Item";

import styles from "../css/ContentProjects.module.css";

interface ContentProjectsProps {
  scrollTo: any;
  content: any;
}

const ContentProjects = (props: ContentProjectsProps) => {
  const { content, scrollTo } = props;
  const { state, dispatch, ACTIONS } = useAppContext();

  const items = state?.items;

  const [response, error] = useFetch("/api/source");

  useEffect(() => {
    if (response) {
      dispatch({ type: ACTIONS.UPDATE_ITEMS, payload: response });
    }
  }, [dispatch, ACTIONS, response]);

  if (!content) {
    return <div />;
  }

  return (
    <section
      id="projects"
      className={styles.projects}
      data-testid="contentProjects"
    >
      <div className={styles.content}>
        {content.projects && (
          <div className={styles.frame}>
            <h2>{content.projects.title}</h2>
            {!response && !error && (
              <>
                <h4
                  style={{
                    margin: "auto 0",
                    textAlign: "center",
                    color: "black",
                  }}
                >
                  Projects loading...
                </h4>
              </>
            )}
            {error && (
              <h4
                style={{ margin: "auto 0", textAlign: "center", color: "red" }}
                data-testid="has-error"
              >
                {content.errors.serviceError}
              </h4>
            )}
            <ul>
              {items &&
                items.length &&
                items.map((item: ItemInterface, index) => {
                  return <Item key={index} {...item} />;
                })}
            </ul>
          </div>
        )}
        <BackToTop scrollTo={scrollTo} />
      </div>
    </section>
  );
};

export default ContentProjects;
