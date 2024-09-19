"use client"
import {useEffect, useState} from "react";

const Test = () => {
  const [x, setX] = useState(0);

  useEffect(() => {
      setX(window.innerWidth);
  }, [])

  return <title>{x}</title>;
}

export default Test;