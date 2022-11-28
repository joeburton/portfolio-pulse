import { render, fireEvent } from "@testing-library/react";

import { Item } from "../Item";

const item = {
  _id: "2342434BSDF23234",
  order: 1,
  logo: "logo.svg",
  class: "logo-class",
  role: "developer",
  company: "gingerblue",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  skills: "limited",
  links: [{ visual: "www.cashflows.com", url: "https://www.cashflows.com/" }],
};

describe("Item", () => {
  it("should render the component and populate text keys", async () => {
    const { container } = render(<Item {...item} />);

    const project = container.querySelector("li");
    const image = container.querySelector("img");
    const href = container.querySelector("a");

    expect(project).toBeInTheDocument();
    expect(container).toHaveTextContent("developer");
    expect(image).toHaveAttribute("src", "../images/logo.svg");
    expect(href).toHaveAttribute("href", "https://www.cashflows.com/");
    expect(href).toHaveTextContent("www.cashflows.com");
  });

  it("should toggle open and close the description text", () => {
    const { getByTestId, queryByTestId, debug } = render(<Item {...item} />);

    expect(getByTestId("description")).toBeInTheDocument();

    fireEvent.click(getByTestId("expand-description"));

    expect(queryByTestId("description")).toHaveStyle("height: 100%");
  });

  it("should update the toggle description link text when clicked ", () => {
    const { getByTestId, queryByTestId, debug } = render(<Item {...item} />);

    expect(getByTestId("expand-description").textContent).toEqual(
      "Read more >"
    );
    fireEvent.click(getByTestId("expand-description"));

    expect(getByTestId("expand-description").textContent).toEqual(
      "Read less v"
    );
  });
});
