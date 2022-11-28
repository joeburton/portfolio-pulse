import { render } from "@testing-library/react";

import ContentAbout from "../ContentAbout";

const content = {
  title: "about title",
  body1: "body 1",
  body2: "body 2",
};
describe("ContentAbout", () => {
  it("should render the component and populate text keys", async () => {
    const { getByText, getByTestId } = render(
      <ContentAbout content={content} scrollTo={() => {}} />
    );

    const contentAbout = getByTestId("contentAbout");

    expect(contentAbout).toBeInTheDocument();
    expect(getByText("about title")).toBeInTheDocument();
    expect(getByText("body 1")).toBeInTheDocument();
    expect(getByText("body 2")).toBeInTheDocument();
  });
});
