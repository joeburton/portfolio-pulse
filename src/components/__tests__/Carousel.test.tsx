import { render } from "@testing-library/react";

import { Carousel } from "../experiments/Carousel";

describe("Carousel", () => {
  it("should render the Carousel component with the correct items", () => {
    const { getByAltText } = render(
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
    expect(getByAltText("item 1")).toBeDefined();
    expect(getByAltText("item 2")).toBeDefined();
  });
});
