// This code calls the api to get the exchange rates of the exchange rates in mongoDB are not updated for today

import axios from 'axios';
import ExchangeRate from '@/models/ExchangeRate';
import { connectToDatabase } from '@/utils/mongodb';

const API_KEY = process.env.EXCHANGE_RATE_API_KEY;
const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest`;
export async function getExchangeRates(baseCurrency: string) {
  await connectToDatabase();

  // Check if rates are already in the database
  const existingRates = await ExchangeRate.findOne({ baseCurrency });
  const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

  if (existingRates && existingRates.lastUpdated.toISOString().split('T')[0] === today) {
    console.log('Returning cached exchange rates');
    return existingRates;
  }

  // Fetch rates from the API
  try {
    const { data } = await axios.get(`${API_URL}/${baseCurrency}`);
    if (data.result !== 'success') {
      throw new Error('Failed to fetch exchange rates');
    }

    // Save or update rates in the database
    const updatedRates = await ExchangeRate.findOneAndUpdate(
      { baseCurrency },
      { rates: data.conversion_rates, lastUpdated: new Date() },
      { new: true, upsert: true }
    );

    console.log('Fetched and updated exchange rates');
    return updatedRates;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    throw error;
  }
}
