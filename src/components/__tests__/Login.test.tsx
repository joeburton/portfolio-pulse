import { render, fireEvent, waitFor } from "@testing-library/react";

import Login from "../Login";

describe("Login", () => {
  it("should render the <Login /> component", () => {
    const { getByTestId } = render(<Login />);

    const login = getByTestId("login");

    expect(login).toBeInTheDocument();
  });

  it("should display validation errors when submitting the form without values", async () => {
    const { getByText } = render(<Login />);
    const login = getByText("Login");

    fireEvent.click(login);

    await waitFor(() => {
      expect(getByText("username is a required field")).toBeInTheDocument();
      expect(getByText("password is a required field")).toBeInTheDocument();
    });
  });

  it("should display extra validation case for password that is too short", async () => {
    const { container, getByText, debug } = render(<Login />);
    const passwordInput = container.querySelector(
      "input[name=password]"
    ) as any;

    const login = getByText("Login");

    fireEvent.change(passwordInput, {
      target: { value: "123" },
    });

    fireEvent.click(login);

    await waitFor(() => {
      expect(
        getByText("Password must be at least 6 characters")
      ).toBeInTheDocument();
    });
  });
});
