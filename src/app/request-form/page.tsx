'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import OrderCard from '@/components/orderCard';

export default function Page() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    country: '',
    city: '',
    storeName: '',
    itemUrl: '',
    itemPicture: null,
    itemBasePrice: '',
  });
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'country') {
      const selectedCountry = countries.find((c) => c.country === value);
      setCities(selectedCountry ? selectedCountry.cities : []);
      setFormData((prev) => ({ ...prev, city: '' }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, itemPicture: file }));

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    const response = await fetch('/api/requests', {
      method: 'POST',
      body: formDataToSend,
    });

    if (response.ok) {
      alert('Request submitted successfully!');
    } else {
      alert('Failed to submit the request.');
    }
  };

  useEffect(() => {
    async function fetchCountryData() {
      const response = await fetch('/countries.txt'); // Assuming the text file is hosted in the public folder
      const text = await response.text();
      const lines = text.split('\n');

      const countryData = lines.map((line) => {
        const [country, ...cities] = line.split(',');
        return { country, cities };
      });

      setCountries(countryData);
    }

    async function checkAuth() {
      const response = await fetch('/api/auth/me');
      if (!response.ok) {
        router.push('/login');
      }
    }

    fetchCountryData();
    checkAuth();
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <p className="text-4xl font-bold text-blue-600 mb-6">Request an item</p>
      <form className="w-full max-w-lg bg-white p-6 rounded shadow-md" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            required
          >
            <option value="">Select a country</option>
            {countries.map((c) => (
              <option key={c.country} value={c.country}>{c.country}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
          <select
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            required
            disabled={!formData.country}
          >
            <option value="">Select a city</option>
            {cities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="storeName" className="block text-sm font-medium text-gray-700">Store Name</label>
          <input
            type="text"
            id="storeName"
            placeholder="e.g. Uniqlo"
            name="storeName"
            value={formData.storeName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="itemUrl" className="block text-sm font-medium text-gray-700">Item URL</label>
          <input
            type="url"
            id="itemUrl"
            name="itemUrl"
            value={formData.itemUrl}
            placeholder="e.g. https://www.uniqlo.com/us/en/products/E470603-000/"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="itemPicture" className="block text-sm font-medium text-gray-700">Item Picture</label>
          <input
            type="file"
            id="itemPicture"
            name="itemPicture"
            onChange={handleFileChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            accept="image/*"
            required
          />
          {previewImage && (
            <img src={previewImage} alt="Item Preview" className="mt-4 max-w-full h-auto rounded" />
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="itemDescription" className="block text-sm font-medium text-gray-700">Item Description</label>
          <textarea
            id="itemDescription"
            name="itemDescription"
            placeholder="Describe the item..."
            value={formData.itemDescription || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 resize-none"
            rows="4"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="itemBasePrice" className="block text-sm font-medium text-gray-700">Item Base Price</label>
          <input
            type="number"
            id="itemBasePrice"
            name="itemBasePrice"
            placeholder="e.g. 100"
            value={formData.itemBasePrice}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white font-bold rounded shadow hover:bg-blue-600"
        >
          Submit Request
        </button>
      </form>


    </div>
  );
}
