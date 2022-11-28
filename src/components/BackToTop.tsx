import React from "react";

interface BackToTopProps {
  scrollTo: () => void;
}

const BackToTop = ({ scrollTo }: BackToTopProps) => {
  return (
    <div className="top">
      <span id="#root" onClick={scrollTo} className="goto">
        ^
      </span>
    </div>
  );
};

export default BackToTop;
