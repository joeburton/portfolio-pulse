import React, { useEffect } from "react";

import Header from "./Header";
import Footer from "./Footer";

import Experiments from "./Experiments";
import ContentIntro from "./ContentIntro";
import ContentAbout from "./ContentAbout";
import ContentContact from "./ContentContact";
import ContentProjects from "./ContentProjects";

import siteContent from "../content";
import { useAppContext } from "../store";

const scrollTo = (e: { target: { id: any }; preventDefault: () => void }) => {
  const element = document.querySelector(e.target.id).offsetTop;
  e.preventDefault();
  window.scrollTo({
    behavior: "smooth",
    left: 0,
    top: element,
  });
};

const App = () => {
  const { state, dispatch, ACTIONS } = useAppContext();

  // console.log("current state: ", state);

  useEffect(() => {
    dispatch({ type: ACTIONS.UPDATE_CONTENT, payload: siteContent });
  }, [dispatch, ACTIONS]);

  return (
    <div className="wrapper" data-testid="app">
      {state.content && (
        <>
          <Header content={state.content.header} scrollTo={scrollTo} />
          <section className={`main ${state.manageActive ? "hidden" : ""}`}>
            <Experiments content={state.content.experiments} />
            <ContentIntro content={state.content.intro} />
            <ContentProjects content={state.content} scrollTo={scrollTo} />
            <ContentAbout content={state.content.about} scrollTo={scrollTo} />
            <ContentContact
              content={state.content.contact}
              scrollTo={scrollTo}
            />
          </section>

          <Footer content={state.content.footer} />
        </>
      )}
    </div>
  );
};
export default App;
