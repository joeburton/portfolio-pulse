import React from "react";
import { render, waitFor } from "@testing-library/react";

import App from "../App";
import { AppProvider } from "../../store";

describe("App", () => {
  it("should render the main app container and its core child elements", async () => {
    const { queryAllByTestId, getByTestId } = render(
      <AppProvider>
        <App />
      </AppProvider>
    );

    await waitFor(() => {
      // check content has loaded
      expect(queryAllByTestId("header")).toHaveLength(1);
    });

    const appContainer = getByTestId("app");
    const appHeder = getByTestId("header");
    const contentIntro = getByTestId("contentIntro");
    const contentProjects = getByTestId("contentProjects");
    const contentAbout = getByTestId("contentAbout");
    const contentContact = getByTestId("contentContact");

    expect(appContainer).toBeInTheDocument();
    expect(appHeder).toBeInTheDocument();
    expect(contentIntro).toBeInTheDocument();
    expect(contentProjects).toBeInTheDocument();
    expect(contentAbout).toBeInTheDocument();
    expect(contentContact).toBeInTheDocument();
  });
});
