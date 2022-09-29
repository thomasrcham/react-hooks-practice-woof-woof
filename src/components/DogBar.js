function DogBar({ dogs, setDisplay }) {
  return dogs
    ? dogs.map((dog) => (
        <span onClick={() => setDisplay(dog)} key={dog.id}>
          {dog.name}
        </span>
      ))
    : null;
}

export default DogBar;
