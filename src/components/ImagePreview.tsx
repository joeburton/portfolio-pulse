import React, { useState, useEffect } from "react";

const ImagePreview = ({ ...props }) => {
  const [image, setImage] = useState<any>();

  useEffect(() => {
    let reader = new FileReader();
    reader.onloadend = () => {
      setImage({
        file: props.file,
        imagePreviewUrl: reader.result,
      });
    };

    reader.readAsDataURL(props.file);
  }, [props.file]);

  return (
    <>
      {image && image.imagePreviewUrl && (
        <img
          src={image.imagePreviewUrl}
          height={40}
          alt={props.file.name}
          data-testid="thumbnail"
        />
      )}
    </>
  );
};

export default ImagePreview;
