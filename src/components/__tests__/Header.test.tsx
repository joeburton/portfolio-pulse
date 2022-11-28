import { render, fireEvent } from "@testing-library/react";

import Header from "../Header";

describe("Header", () => {
  const content = { link1: "link 1", link2: "link 2", link3: "link 3" };
  it("should render the component and populate text keys", async () => {
    const { getByText, getByTestId } = render(
      <Header content={content} scrollTo={() => {}} />
    );

    const header = getByTestId("header");

    expect(header).toBeInTheDocument();
    expect(getByText("link 1")).toBeInTheDocument();
  });

  it("should toggle the display of the Manage component when clicking the logo", () => {
    const { container, queryByTestId, getByTestId } = render(
      <Header content={content} scrollTo={() => {}} />
    );

    const logo = container.querySelector(".logo") as any;

    fireEvent.click(logo);
    expect(getByTestId("manage")).toBeInTheDocument();

    fireEvent.click(logo);
    expect(queryByTestId("manage")).toBeNull();
  });
});
