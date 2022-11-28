import { render, act, waitFor } from "@testing-library/react";

import ImagePreview from "../ImagePreview";

describe.skip("ImagePreview", () => {
  const file = new File(["hello"], "hello.png", { type: "image/png" });

  it("should display the selected image", async () => {
    await act(async () => {
      const { findByTestId } = render(<ImagePreview file={file} />);

      await waitFor(() => {
        const thumb = findByTestId("thumbnail") as any;
        expect(thumb).toBeInTheDocument();
        expect(thumb).toHaveAttribute("height");
        expect(thumb.src).toEqual("data:image/png;base64,aGVsbG8=");
      });
    });
  });
});
