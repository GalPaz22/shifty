import React, { useState } from 'react';

const RenderList = ({ itemsList, setItemsList }) => {
  // State to manage checkboxes visibility
  const [showCheckboxes, setShowCheckboxes] = useState(false);

  // State to keep track of items to be deleted
  const [itemsToDelete, setItemsToDelete] = useState([]);
  


  // Function to handle checkbox visibility

  // Function to handle item deletion
  const onDelete = () => {
    // Filter out the items to be deleted
    const updatedList = itemsList.filter((item, index) => !itemsToDelete.includes(index));
    // Reset the state
    setItemsToDelete([]);
    setShowCheckboxes(false);
    // Log deleted items and update itemsList
    const deletedItems = itemsList.filter((item, index) => itemsToDelete.includes(index));
    console.log('Deleting selected items:', deletedItems);
    setItemsList(updatedList);
  };
  

  // Function to handle clearing the entire list
  const onClearList = () => {
  setItemsList([]);
  };

  // Function to toggle selection of items
  const toggleSelection = (index) => {
    if (itemsToDelete.includes(index)) {
      // Remove item index from selected list
      setItemsToDelete(itemsToDelete.filter((itemIndex) => itemIndex !== index));
    } else {
      // Add item index to selected list
      setItemsToDelete([...itemsToDelete, index]);
    }
  };

  // Calculate the total amount
  const totalAmount = itemsList.reduce((total, item) => {
    return total + (item.hoursOfWork * item.tariff + item.drives * 25);
  }, 0);

  const totalHours = itemsList.reduce((total, item) => {
    return total + parseFloat( item.hoursOfWork);
}, 0);

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-md mb-4">
      <h2 className="text-xl font-bold mb-4">Calculator</h2>
      {showCheckboxes && (
        <div>
          <ul>
            {itemsList.map((item, index) => (
              <li
                key={index}
                className={`flex items-center ${
                  itemsToDelete.includes(index) ? 'bg-gray-100' : ''
                }`}
              >
                <input
                  type="checkbox"
                  checked={itemsToDelete.includes(index)}
                  onChange={() => toggleSelection(index)}
                  className="mr-2"
                />
                <span>
                  Date: {item.date}, Hours of Work: {item.hoursOfWork}, Tariff: {item.tariff}, Drives: {item.drives}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4">
    
  <button
    onClick={onDelete}
    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mr-2 focus:outline-none focus:shadow-outline"
  >
    Delete Selected
  </button>

          </div>
        </div>
      )}
      {!showCheckboxes && (
        <ul>
          {itemsList.map((item, index) => (
            <li key={index}>
              Date: {item.date}, Hours of Work: {item.hoursOfWork}, Tariff: {item.tariff}, Drives: {item.drives}
            </li>
          ))}
        </ul>
      )}
      <div className="flex mt-4">
        <button
          onClick={() => setShowCheckboxes(!showCheckboxes)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2 focus:outline-none focus:shadow-outline"
        >
          {showCheckboxes ? 'Hide Checkboxes' : 'Delete Item'}
        </button>
        <button
          onClick={onClearList}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
        >
          Clear List
        </button>
      </div>
      <p>Total Amount: {totalAmount}₪</p>
      <p>Total Hours: {totalHours}</p>
    </div>
  );
};

export default RenderList;
