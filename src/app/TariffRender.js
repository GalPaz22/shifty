import React from 'react';

const TariffRender = ({ tariffList, setTariffList }) => {
  const [newTariff, setNewTariff] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to update tariffList with the new tariff value
    // Assuming tariffList is an array
    const updatedTariffList = [...tariffList, parseFloat(newTariff)];
    setTariffList(updatedTariffList);
    // Reset tariff value after submission
    setNewTariff('');
  };

  return (
    <div className=" bg-gray-300 p-4 rounded-md">
      <h2 className="text-xl font-bold mb-4">New Rate Value</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="tariff" className="block text-sm font-medium text-gray-700 mb-2">
          Enter Rate:
        </label>
        <input
          type="number"
          id="tariff"
          min="0"
          value={newTariff}
          onChange={(e) => setNewTariff(e.target.value)}
          className="input mb-4"
          required
        />
        <button type="submit" className="bg-blue-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline">
          Submit
        </button>
      </form>

      <div className="mt-4">
        <h2 className="text-xl font-bold mb-4">Current Rate List</h2>
        <ul>
            <li>80₪</li>
            <li>100₪</li>
          {tariffList.map((newTariff, index) => (
            <li key={index} className="mb-2">
              {newTariff + '₪'}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TariffRender;
