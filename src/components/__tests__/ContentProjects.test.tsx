import { render, act, waitFor, fireEvent } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";

import { AppProvider } from "../../store";
import ContentProjects from "../ContentProjects";

const server = setupServer(
  rest.get("/api/source", (req, res, ctx) => {
    return res(
      ctx.json([
        {
          _id: "5f2d6202152d0e34970d3fbf",
          order: 1,
          logo: "ge.png",
          role: "Senior UI Developer",
          company: "GE Power Digital 1",
          description:
            "<p>Whilst with GE. - I wonder if it would be acceptable to the goals and intentions of this library to provide certain other custom matchers for common tasks. In this particular case I'd be proposing a .toHaveAttribute custom matcher that could work both to assert that an element has an attribute present or not, but also to assert that the attribute is present and has a certain value:</p>",
          skills: "Polymer & Gulp",
          class: "ge-logo",
          links: [
            {
              visual: "www.link1.com/power/",
              url: "https://www.ge.com/power/software",
            },
          ],
        },
        {
          order: 2,
          logo: "cashflows.png",
          role: "Lead UI Developer",
          company: "CashFlows",
          description: "<p>Whilst I was with CashFlows</p>",
          skills: "React",
          class: "cashflows-logo",
          links: [
            { visual: "www.cashflows.com", url: "https://www.cashflows.com/" },
          ],
        },
      ])
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const content = {
  projects: {
    title: "projects title",
  },
  errors: {
    serviceError: "Oops it broke",
  },
};

describe.skip("ContentProjects", () => {
  it("should render the projects list fetched from the server and populate text keys", async () => {
    await act(async () => {
      const { container, getByText, queryByTestId } = render(
        <AppProvider>
          <ContentProjects content={content} scrollTo={() => {}} />
        </AppProvider>
      );

      await waitFor(() => {
        const contentProjects = queryByTestId("contentProjects") as any;

        expect(contentProjects.querySelectorAll("li").length).toEqual(2);
        expect(contentProjects).toBeInTheDocument();
        expect(getByText("projects title")).toBeInTheDocument();
        expect(getByText("www.link1.com/power/")).toBeInTheDocument();
        expect(container.querySelectorAll("img")[0]).toHaveAttribute(
          "alt",
          "GE Power Digital 1"
        );
        expect(container.querySelectorAll("img")[1]).toHaveAttribute(
          "alt",
          "CashFlows"
        );
      });
    });
  });

  it("should toogle open and close the description text", async () => {
    await act(async () => {
      const { container, queryByTestId } = render(
        <AppProvider>
          <ContentProjects content={content} scrollTo={() => {}} />
        </AppProvider>
      );

      await waitFor(() => {
        const contentProjects = queryByTestId("contentProjects") as any;
        const detailsContainer = container.querySelector(".details") as any;
        const openDesc = container.querySelector(".expand") as any;

        expect(contentProjects.querySelectorAll("li").length).toEqual(2);
        expect(detailsContainer).toHaveStyle("height: 60px");

        fireEvent.click(openDesc);
        expect(detailsContainer).toHaveStyle("height: 100%");
      });
    });
  });

  it("should display an error message when the request fails", async () => {
    await act(async () => {
      server.use(
        rest.get("/api/source", (_req, res, ctx) => {
          return res(ctx.status(500));
        })
      );

      const { queryByTestId } = render(
        <AppProvider>
          <ContentProjects content={content} scrollTo={() => {}} />
        </AppProvider>
      );

      await waitFor(() => {
        const contentProjects = queryByTestId("contentProjects") as any;
        const error = contentProjects.querySelector("h4");
        expect(error).toHaveTextContent("Oops it broke");
      });
    });
  });
});
