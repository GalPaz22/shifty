// components/DatePicker.js
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CustomDatePicker = ({ selectedDate, onChange }) => {
  return <DatePicker selected={selectedDate} onChange={onChange}  showMonthYearPicker dateFormat="MM/yyyy" />;
};

export default CustomDatePicker;
