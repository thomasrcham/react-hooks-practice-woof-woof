import { useState } from "react";

function DisplayDog({ display, toggleGoodDog }) {
  const [isGoodDog, setIsGoodDog] = useState(display.isGoodDog);
  return (
    <>
      <img src={display.image} alt={display.name} />
      <h2>{display.name}</h2>
      {isGoodDog ? (
        <button
          onClick={() => {
            toggleGoodDog(display);
            setIsGoodDog(false);
          }}
        >
          "No, they're a Bad Dog!"
        </button>
      ) : (
        <button
          onClick={() => {
            toggleGoodDog(display);
            setIsGoodDog(true);
          }}
        >
          "No, they're a Good Dog!"
        </button>
      )}
    </>
  );
}

export default DisplayDog;
