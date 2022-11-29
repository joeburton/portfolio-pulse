import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

describe("ContentProjects", () => {
  it("should render the projects list fetched from the server and populate text keys", async () => {
    const { getByAltText, findAllByTestId, debug } = render(
      <AppProvider>
        <ContentProjects content={content} scrollTo={() => {}} />
      </AppProvider>
    );

    const projectItems = await findAllByTestId("project-item");

    expect(projectItems.length).toEqual(2);
    expect(projectItems[0]).toHaveTextContent("Senior UI Developer");
    expect(getByAltText("CashFlows")).toHaveAttribute("alt", "CashFlows");
  });

  it("should toogle open and close the description text", async () => {
    const { queryAllByTestId, findAllByTestId } = render(
      <AppProvider>
        <ContentProjects content={content} scrollTo={() => {}} />
      </AppProvider>
    );

    const projectItems = await findAllByTestId("project-item");

    const toggleDescriptions = queryAllByTestId("expand-description");
    const descriptions = queryAllByTestId("description");

    expect(projectItems.length).toEqual(2);
    expect(descriptions[0]).toHaveStyle("height: 60px");

    userEvent.click(toggleDescriptions[0]);
    expect(descriptions[0]).toHaveStyle("height: 100%");
  });

  it("should display an error message when the request fails", async () => {
    server.use(
      rest.get("/api/source", (_req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    const { findByTestId } = render(
      <AppProvider>
        <ContentProjects content={content} scrollTo={() => {}} />
      </AppProvider>
    );

    const error = await findByTestId("has-error");

    expect(error).toHaveTextContent("Oops it broke");
  });
});
