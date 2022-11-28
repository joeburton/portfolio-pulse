import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { rest } from "msw";
import { setupServer } from "msw/node";

import { AppProvider } from "../../store";
import ItemRecord from "../ItemRecord";

const server = setupServer(
  rest.post("/api/delete-item", (_req, res, ctx) => {
    return res(
      ctx.json([
        {
          result: { ok: 1, n: 1 },
        },
      ])
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

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

describe("ItemRecord", () => {
  it("should render the component", () => {
    const { findByTestId, getByTestId, getByText } = render(
      <ItemRecord {...item} />
    );

    findByTestId("item-record");

    expect(getByTestId("item-record")).toHaveTextContent("gingerblue");
    expect(getByText("Delete")).toBeDefined();
    expect(getByText("Edit")).toBeDefined();
  });

  it("should display the remove item message whilst the item is being deleted", async () => {
    const { getByText } = render(
      <AppProvider
        defaultState={{
          content: [],
          items: [item],
          manageActive: false,
          itemToEditId: "",
          userSession: {
            username: "",
            loggedIn: false,
          },
        }}
      >
        <ItemRecord {...item} />
      </AppProvider>
    );

    expect(getByText("Removing item")).toHaveClass("hidden");
    userEvent.click(getByText("Delete"));

    await waitFor(() =>
      expect(getByText("Removing item")).not.toHaveClass("hidden")
    );
  });
});
