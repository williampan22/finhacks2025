// A component to display the exchange rates of the day from usd to each currency

import { useEffect, useState } from 'react';

export default function ExchangeRates() {
  const [rates, setRates] = useState(null);

  useEffect(() => {
    async function fetchRates() {
      try {
          const response = await fetch('/api/exchange-rates?base=USD');
        const data = await response.json();
        setRates(data.rates);
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
      }
    }

    fetchRates();
  }, []);

  return (
    <div>
      <h1>Exchange Rates</h1>
      {rates ? (
        <ul>
          {Object.entries(rates).map(([currency, rate]) => (
            <li key={currency}>
              {currency}: {rate}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading exchange rates...</p>
      )}
    </div>
  );
}
