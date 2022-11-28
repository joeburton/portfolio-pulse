import React from "react";
import { render, fireEvent, act, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

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

describe.skip("ItemRecord", () => {
  it("should render the component", () => {
    const { container } = render(<ItemRecord {...item} />);

    expect(container).toHaveTextContent("gingerblue");
    expect(container).toHaveTextContent("Delete");
    expect(container).toHaveTextContent("Edit");
  });

  it("should display the remove item message whilst the item is being deleted", async () => {
    await act(async () => {
      const { container, getByText } = render(
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

      const deleteButton = container.querySelectorAll(".manage-item")[0];
      fireEvent.click(deleteButton);

      await waitFor(() =>
        expect(getByText("Removing item")).not.toHaveClass("hidden")
      );
    });
  });
});
