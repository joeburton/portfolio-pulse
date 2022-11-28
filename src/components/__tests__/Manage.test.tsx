import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { AppProvider } from "../../store";
import Manage from "../Manage";

const item = {
  _id: "23423423",
  order: 1,
  logo: "logo.svg",
  class: "logo-class",
  role: "developer",
  company: "gingerblue",
  description: "Lorem ipsum",
  skills: "limited",
  links: [
    {
      visual: "www.gingerblue.com",
      url: "https://www.gingerblue.com",
    },
  ],
};

describe("Manage", () => {
  it("should render the component with the default tab and associated content active", async () => {
    const { getByTestId, queryByTestId } = render(<Manage />);

    const manage = getByTestId("manage");

    expect(manage).toBeInTheDocument();

    expect(getByTestId("tabs")?.querySelectorAll("li")[0]).toHaveClass(
      "active"
    );

    expect(getByTestId("manage-items")).toBeInTheDocument();
    expect(queryByTestId("items-list")).toBeNull();
    expect(queryByTestId("add-item")).toBeNull();
  });

  it("should switch the active tab and render associated content", async () => {
    const testState = {
      content: [],
      items: [{ ...item, company: "Escape Enterprises" }, item],
      manageActive: true,
      itemToEditId: "",
      userSession: {
        username: "fish",
        loggedIn: true,
      },
    };

    const { getByTestId, queryByTestId, debug } = render(
      <AppProvider defaultState={testState}>
        <Manage />
      </AppProvider>
    );

    userEvent.click(getByTestId("tabs")?.querySelectorAll("li")[1]);
    expect(getByTestId("add-item")).toBeInTheDocument();
    expect(queryByTestId("manage-items")).toBeNull();
    expect(queryByTestId("items-list")).toBeNull();

    userEvent.click(getByTestId("tabs")?.querySelectorAll("li")[2]);
    expect(getByTestId("items-list")).toBeInTheDocument();
    expect(queryByTestId("manage-items")).toBeNull();
    expect(queryByTestId("add-item")).toBeNull();

    userEvent.click(getByTestId("tabs")?.querySelectorAll("li")[0]);
    expect(getByTestId("manage-items")).toBeInTheDocument();
    expect(queryByTestId("items-list")).toBeNull();
    expect(queryByTestId("add-item")).toBeNull();
  });

  it("should render the current number of items", () => {
    const { getByTestId } = render(
      <AppProvider
        defaultState={{
          content: [],
          items: [{ ...item, company: "Escape Enterprises" }, item],
          manageActive: false,
          itemToEditId: "",
          userSession: {
            username: "fish",
            loggedIn: true,
          },
        }}
      >
        <Manage />
      </AppProvider>
    );
    userEvent.click(getByTestId("tabs")?.querySelectorAll("li")[2]);
    expect(getByTestId("items-list")).toBeInTheDocument();

    expect(
      getByTestId("items-list").querySelectorAll("li")[0]
    ).toHaveTextContent("Escape Enterprises");
    expect(
      getByTestId("items-list").querySelectorAll("li")[1]
    ).toHaveTextContent("gingerblue");
  });
});
