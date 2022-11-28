import React from "react";
import { render } from "@testing-library/react";

import ContentContact from "../ContentContact";

const content = {
  title: "contact title",
  body1: "body 1",
};

describe("ContentContact", () => {
  it("should render the component and populate text keys", async () => {
    const { getByText, getByTestId } = render(
      <ContentContact content={content} scrollTo={() => {}} />
    );

    const contentContact = getByTestId("contentContact");

    expect(contentContact).toBeInTheDocument();
    expect(getByText("contact title")).toBeInTheDocument();
    expect(getByText("body 1")).toBeInTheDocument();
  });
});
