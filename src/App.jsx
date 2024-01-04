import { Children, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [firstTime, setFirstTime] = useState(0);
  const [ans, setAns] = useState(0);
  const [count, setCount] = useState(0);
  const [number, setNumber] = useState("");
  const [inputValueArray, setInputValueArray] = useState([]);
  const [numLength, setNumLength] = useState(0);
  const inputref = useRef(null);
  const predictAns = (num) => {
    const length = num.toString().length;
    const multi = 10 ** length - 1;
    const anser = 3 * multi + parseInt(num);
    console.log(parseInt(num));
    console.log(anser);
    setAns(anser);
    setNumLength(length);
  };
  useEffect(() => {
    inputref.current.focus();
  }, [ans, numLength]);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(number);
    if (count === 0) {
      setFirstTime(number);
      setCount(count + 1);
      predictAns(number);
      setInputValueArray((prevValue) => [...prevValue, number]);
      setNumber("");
    } else if (count <= 3 && number.toString().length === numLength) {
      setInputValueArray((prevValue) => [...prevValue, number]);
      const length = number.toString().length;
      const multi = 10 ** length - 1;
      const anser = multi - parseInt(number);
      setInputValueArray((prevValue) => [...prevValue, anser]);
      setCount(count + 1);
      setNumber("");
    }
  };
  const handleInputChange = (e) => {
    if (e.target.value.toString().length <= numLength && count > 0) {
      setNumber(e.target.value);
    } else if (count === 0 && e.target.value.toString().length <= 5) {
      setNumber(e.target.value);
    }
  };
  const handleReset = () => {
    setFirstTime(0);
    setAns(0);
    setCount(0);
    setNumber("");
    setInputValueArray([]);
    setNumLength(0);
  };
  return (
    <>
      <div className="h-full w-full flex flex-col justify-center items-center mt-5">
        <div className=" flex flex-col justify-center items-center h-full w-full relative">
          <div className="flex flex-col items-center justify-center absolute top-10">
            <div className="flex  relative w-screen text-center items-center justify-center">
              <h1 className="text-xl font-bold">magic math</h1>
              <button
                type="reset"
                className="bg-green-800 h-10 w-20 rounded-lg absolute right-4 text-white"
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
            <div className="m-10">
              <h2 className="text-lg text-blue-500 font-bold">Numbers</h2>
              {inputValueArray.length > 0 && (
                <div className="flex flex-col justify-center items-center mt-4">
                  <h3 className="text-lg font-semibold mb-2">Input Values:</h3>
                  <ul className="list-none">
                    {inputValueArray.map((value, index) => (
                      <li className="" key={index}>
                        {value}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className=" text-center absolute bottom-1/2">
            <div class="border-t border-gray-500 my-4 w-60 bottom-11"></div>
            <div className="flex justify-center ">
              <span>Anser : </span>
              <p> {ans !== 0 ? `  ${ans}` : ""}</p>
            </div>
          </div>

          <div className="flex bottom-1/3 absolute justify-center ">
            <form action="#" onSubmit={handleSubmit}>
              <input
                ref={inputref}
                min={0}
                max={99999}
                className="border-2 border-gray-500 rounded p-2 w-60"
                type="number"
                name="number"
                id="number"
                placeholder="Enter the number of 1 to 5 digit"
                value={number}
                onChange={handleInputChange}
              />
              <button
                type="submit"
                className="bg-blue-800 ml-4 w-20 rounded text-white h-10"
              >
                Enter
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
