import React, { useEffect, useState } from "react";
import DogBar from "./DogBar";
import DisplayDog from "./DisplayDog";

function App() {
  const [dogs, setDogs] = useState(null);
  const [display, setDisplay] = useState(null);
  const [filtered, setFiltered] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3001/pups")
      .then((r) => r.json())
      .then((d) => setDogs(d));
  }, []);

  function toggleGoodDog(dogArray) {
    const changeDog = !dogArray.isGoodDog;
    let newArray = { ...dogArray, isGoodDog: changeDog };
    fetch(`http://localhost:3001/pups/${newArray.id}`, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(newArray),
    })
      .then((r) => r.json())
      .then((d) => {
        let changedDog = d;
        let id = changedDog.id - 1;
        dogs[id].isGoodDog = changedDog.isGoodDog;
        setDogs(dogs);
      });
  }

  let filteredDogs = dogs
    ? filtered
      ? dogs.filter((dog) => dog.isGoodDog === true)
      : dogs
    : null;

  return (
    <div className="App">
      <div id="filter-div">
        {filtered ? (
          <button id="good-dog-filter" onClick={() => setFiltered(false)}>
            Filter good dogs: ON
          </button>
        ) : (
          <button id="good-dog-filter" onClick={() => setFiltered(true)}>
            Filter good dogs: OFF
          </button>
        )}
      </div>
      <div id="dog-bar">
        {dogs ? <DogBar dogs={filteredDogs} setDisplay={setDisplay} /> : null}
      </div>
      <div id="dog-summary-container">
        <h1>DOGGO:</h1>
        <div id="dog-info">
          {display ? (
            <DisplayDog display={display} toggleGoodDog={toggleGoodDog} />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
