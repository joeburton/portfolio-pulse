import React from "react";
import { render } from "@testing-library/react";

import ContentIntro from "../ContentIntro";

const content = {
  title: "intro title",
  body1: "body 1",
  body2: "body 2",
};

describe("ContentIntro", () => {
  it("should render the component and populate text keys", async () => {
    const { getByText, getByTestId } = render(
      <ContentIntro content={content} />
    );

    const contentIntro = getByTestId("contentIntro");

    expect(contentIntro).toBeInTheDocument();
    expect(getByText("intro title")).toBeInTheDocument();
    expect(getByText("body 1")).toBeInTheDocument();
    expect(getByText("body 2")).toBeInTheDocument();
  });
});
