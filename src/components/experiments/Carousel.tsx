import React, { useState, useRef } from "react";
import { ChevronRight, ChevronLeft } from "react-bootstrap-icons";

import styles from "../../css/Carousel.module.css";

interface Item {
  description: string;
  image: string;
}

interface CarouselInterface {
  items: Item[];
}

const CarouselItem = ({ image, description }: Item) => {
  return (
    <li>
      <img src={image} alt={description} />
    </li>
  );
};

export const Carousel = ({ items }: CarouselInterface) => {
  let [itemPosition, setItemPosition] = useState(1);

  const eleRef = useRef(null) as any;

  const previous = () => {
    if (itemPosition === 1) return;
    eleRef.current.style.transform = `translateX(-${itemPosition - 2}00%)`;
    setItemPosition((prevState) => prevState - 1);
  };

  const next = () => {
    if (itemPosition === 5) return;
    eleRef.current.style.transform = `translateX(-${100 * itemPosition}%)`;
    setItemPosition((prevState) => prevState + 1);
  };

  // console.log("Carousel state update.", itemPosition);

  return (
    <div data-testid="carousel" className={styles.carousel}>
      <div className={styles.left} onClick={() => previous()}>
        <ChevronLeft color="white" size={20} />
      </div>
      <ul className={styles.items} ref={eleRef}>
        {items.map((item, i) => (
          <CarouselItem {...item} key={i} />
        ))}
      </ul>
      <div className={styles.right} onClick={() => next()}>
        <ChevronRight color="white" size={20} />
      </div>
    </div>
  );
};
