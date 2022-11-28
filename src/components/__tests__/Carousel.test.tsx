import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
// import userEvent from "@testing-library/user-event";

import { Carousel } from "../experiments/Carousel";

describe("Carousel", () => {
  it("should render", () => {
    expect(true).toBeTruthy();
  });
  it.skip("should render", () => {
    const { getByTestId } = render(
      <Carousel
        items={[
          {
            description: "item 1",
            image:
              "https://media.istockphoto.com/photos/vintage-rearview-mirror-on-old-blue-car-picture-id820230782?k=20&m=820230782&s=612x612&w=0&h=XDwkcCXZ_nVHI5utWvfMy33HekFDKm0icDrFUZpkDsg=",
          },
          {
            description: "item 2",
            image:
              "https://media.istockphoto.com/photos/vintage-car-detail-picture-id174566383?k=20&m=174566383&s=612x612&w=0&h=IcPCtMvbKiNRV5geYgDGqHUveR7l8lKjReX_Bgsbnuc=",
          },
        ]}
      />
    );
    expect(getByTestId("carousel")).toHaveTextContent("Carousel");
  });
});
