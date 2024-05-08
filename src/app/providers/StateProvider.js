'use client';
import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [hoursOfWork, setHoursOfWork] = useState(0);
  const [tariff, setTariff] = useState('');
  const [drives, setDrives] = useState('');
  const [itemsList, setItemsList] = useState([]);
  const [tariffList, setTariffList] = useState([]);

  return (
    <StateContext.Provider value={{ hoursOfWork, tariff, drives, setHoursOfWork, setTariff, setDrives, itemsList, setItemsList , tariffList, setTariffList   }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
