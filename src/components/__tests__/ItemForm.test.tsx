import { render, fireEvent, waitFor, act } from "@testing-library/react";

import ItemForm from "../ItemForm";

describe.skip("ItemForm", () => {
  it("should render the component", () => {
    const { getByText, getByTestId } = render(<ItemForm />);

    const image = getByTestId("image");
    const className = getByTestId("class-name");
    const role = getByTestId("role");
    const company = getByTestId("company");
    const skills = getByTestId("skills");
    const description = getByTestId("description");

    const submit = getByText("Submit");

    expect(image).toBeInTheDocument();
    expect(className).toBeInTheDocument();
    expect(role).toBeInTheDocument();
    expect(company).toBeInTheDocument();
    expect(skills).toBeInTheDocument();
    expect(description).toBeInTheDocument();

    expect(submit).toBeInTheDocument();
  });

  it("should display validation errors when submitting the form without values", async () => {
    const { getByText } = render(<ItemForm />);
    const submit = getByText("Submit");

    fireEvent.click(submit);

    await waitFor(() => {
      expect(getByText("logo is a required field")).toBeInTheDocument();
      expect(getByText("class is a required field")).toBeInTheDocument();
      expect(getByText("role is a required field")).toBeInTheDocument();
      expect(getByText("company is a required field")).toBeInTheDocument();
      expect(getByText("skills is a required field")).toBeInTheDocument();
      expect(getByText("description is a required field")).toBeInTheDocument();
    });
  });

  it("should set the form fields with the correct values", async () => {
    const { container, getByText, queryByTestId, getByTestId, debug } = render(
      <ItemForm />
    );

    const file = new File(["hello"], "hello.png", { type: "image/png" });

    const imageInput = getByTestId("upload-image");

    const classNameInput = container.querySelector(
      "[data-testid=class-name] input"
    ) as any;
    const roleInput = container.querySelector(
      "[data-testid=role] input"
    ) as any;
    const companyInput = container.querySelector(
      "[data-testid=company] input"
    ) as any;
    const skillsInput = container.querySelector(
      "[data-testid=skills] input"
    ) as any;
    const descriptionTextarea = container.querySelector(
      "[data-testid=description] textarea"
    ) as any;

    await act(async () => {
      Object.defineProperty(imageInput, "files", {
        value: [file],
      });

      fireEvent.change(imageInput);

      fireEvent.change(classNameInput, {
        target: { value: "worldfirst-logo" },
      });
      fireEvent.change(roleInput, {
        target: { value: "Senior Software Engineer" },
      });
      fireEvent.change(companyInput, { target: { value: "WorldFirst" } });
      fireEvent.change(skillsInput, { target: { value: "Leadership" } });
      fireEvent.change(descriptionTextarea, { target: { value: "Team Lead" } });

      await waitFor(() => {
        const thumb = queryByTestId("thumbnail") as any;
        expect(thumb).toBeInTheDocument();
        expect(thumb).toHaveAttribute("height");
        expect(thumb.src).toEqual("data:image/png;base64,aGVsbG8=");
      });
    });

    expect(classNameInput).toHaveValue("worldfirst-logo");
    expect(roleInput).toHaveValue("Senior Software Engineer");
    expect(companyInput).toHaveValue("WorldFirst");
    expect(skillsInput).toHaveValue("Leadership");
    expect(descriptionTextarea).toHaveValue("Team Lead");
  });

  it("should submit the form when all fields are valid", () => {});
});
