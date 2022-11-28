import { useState, useEffect } from "react";

// Hook
export const useKeyPress = (targetKey: string): boolean => {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState(false);

  // Add event listeners
  useEffect(() => {
    // console.log("useKeyPress");
    // If pressed key is our target key then set to true
    function downHandler({ key }: any): void {
      // console.log("useKeyPress pressed", key);
      if (key === targetKey) {
        setKeyPressed(!keyPressed);
      }
    }

    window.addEventListener("keydown", downHandler);
    // Remove event listeners on cleanup
    return () => {
      // console.log("remove events");
      window.removeEventListener("keydown", downHandler);
    };
  }); // Empty array ensures that effect is only run on mount and unmount
  return keyPressed;
};
