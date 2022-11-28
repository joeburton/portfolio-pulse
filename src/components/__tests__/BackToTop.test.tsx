import { render, fireEvent } from "@testing-library/react";

import BackToTop from "../BackToTop";

describe("BackToTop", () => {
  const scrollToMock = jest.fn();

  it("should render the component and fire the attached event when clicked", () => {
    const { getByText } = render(<BackToTop scrollTo={scrollToMock} />);
    const link = getByText("^");
    fireEvent.click(link);

    expect(scrollToMock).toHaveBeenCalledTimes(1);
  });
});
