import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [amount, setAmount] = useState(1);
  const [initialCurrency, setInitialCurrency] = useState("EUR");
  const [convertedCurrency, setConvertedCurrency] = useState("USD");
  const [converted, setConverted] = useState("");
  useEffect(
    function () {
      async function converter() {
        const host = "api.frankfurter.app";
        const res = await fetch(
          `https://${host}/latest?amount=${amount}&from=${initialCurrency}&to=${convertedCurrency}`
        );
        const data = await res.json();
        setConverted(data.rates[convertedCurrency]);
      }
      converter();
    },
    [amount, initialCurrency, convertedCurrency]
  );
  return (
    <div className="App">
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(+e.target.value)}
      />
      <select
        value={initialCurrency}
        onChange={(e) => setInitialCurrency(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={convertedCurrency}
        onChange={(e) => setConvertedCurrency(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>{converted} {convertedCurrency}</p>
    </div>
  );
}

export default App;
