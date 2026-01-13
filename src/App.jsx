import React, { useEffect, useState } from "react";
import { RiTokenSwapLine } from "react-icons/ri";


const App = () => {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("PKR");
  const [rates, setRates] = useState({});
  const [convertedAmount, setConvertedAmount] = useState(0);

  useEffect(() => {
    const API = import.meta.env.VITE_API_KEY;

    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://v6.exchangerate-api.com/v6/${API}/latest/${from}`
        );
        const data = await response.json();

        // API ka structure check karke rates ko state mein save karein
        // Exchangerate-api mein data "conversion_rates" ke andar hota hai
        setRates(data.conversion_rates);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, [from]);
  const currencyOptions = Object.keys(rates);
   
  const convert = () => {
    if (rates[to]) {
      const result = amount * rates[to];
      setConvertedAmount(result);
    }
  };

  const swap =()=>{
    setFrom(to)
    setTo(from)
  }
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      {/* Main Container */}
      <div className="bg-white/10 backdrop-blur-md border border-gray-700 p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h1 className="text-white text-3xl font-bold text-center mb-8">
          Currency Converter
        </h1>

        <div className="space-y-4">
          {/* Amount Input Section */}
          <div className="bg-gray-800 p-4 rounded-xl">
            <label className="text-gray-400 block mb-2">Amount</label>
            <input
              className="bg-transparent text-white text-2xl outline-none w-full"
              type="number"
              placeholder="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          {/* Currency Selectors */}
          <div className="flex gap-4">
            <div className="flex-1 bg-gray-800 p-3 rounded-xl">
              <label className="text-gray-400 text-xs block">From</label>
              {/* FROM Select */}
              <select
                className="bg-transparent text-white outline-none w-full cursor-pointer mt-1"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              >
                {currencyOptions.map((currency) => (
                  <option
                    key={currency}
                    className="text-black"
                    value={currency}
                  >
                    {currency.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
 <RiTokenSwapLine  onClick={swap} className="cursor-pointer text-5xl text-blue-500 mt-4" />


            <div className="flex-1 bg-gray-800 p-3 rounded-xl">
              <label className="text-gray-400 text-xs block">To</label>
              <select
                className="bg-transparent text-white outline-none w-full cursor-pointer mt-1"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              >
                {currencyOptions.map((currency) => (
                  <option
                    key={currency}
                    className="text-black"
                    value={currency}
                  >
                    {currency.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Convert Button */}
          <button onClick={convert} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition duration-200 shadow-lg mt-4">
            CONVERT
          </button>
          {/* swap  */}
          

          {/* Result Display */}
          <div className="text-center mt-6">
            <p className="text-gray-400">Converted Amount:</p>
            <h2 className="text-white text-4xl font-extrabold mt-2">
            {convertedAmount.toFixed(2)} <span className="text-blue-500 text-xl uppercase">{to}</span>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
