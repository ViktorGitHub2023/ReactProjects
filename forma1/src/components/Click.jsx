import { useState } from "react";

export default function Click( {intitalCount} ) {
  const [count, setCount] = useState(intitalCount);

  // kattintás számláló növelése
  const incraseCounter = () => {
    setCount(count + 1);
  };
  // reset
  const resetCounter = () => {
    setCount(0);
  };
  return(
    <>
       <h2>Kattintások száma: {count} </h2>
      <button onClick={incraseCounter}>Kattints ide!</button>
      <button onClick={resetCounter}>Reset!</button>
    </>
  )
}
