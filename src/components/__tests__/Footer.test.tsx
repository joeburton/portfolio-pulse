import { render } from "@testing-library/react";

import Footer from "../Footer";

describe("Footer", () => {
  const content = { copy: "Made in the UK" };
  it("should render the component and populate text keys", async () => {
    const { getByText, getByTestId } = render(<Footer content={content} />);

    const footer = getByTestId("footer");

    expect(footer).toBeInTheDocument();
    expect(getByText("Made in the UK")).toBeInTheDocument();
  });
});
