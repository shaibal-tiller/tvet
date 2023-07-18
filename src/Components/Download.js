import React from 'react';
import * as XLSX from 'xlsx';

const Download = () => {
  const downloadData = () => {
    // Dummy dataset
    const dataset = [
        { name: 'John', id: 1, father: 'Michael', mother: 'Emily', contact: '123456789', email: 'john@example.com', address: '123 Street', occupation: 'Engineer', salary: 50000, designation: 'Senior Developer', age: 30 },
        { name: 'Emma', id: 2, father: 'David', mother: 'Sophia', contact: '987654321', email: 'emma@example.com', address: '456 Avenue', occupation: 'Doctor', salary: 80000, designation: 'Physician', age: 35 },
        { name: 'Liam', id: 3, father: 'Daniel', mother: 'Olivia', contact: '456123789', email: 'liam@example.com', address: '789 Road', occupation: 'Teacher', salary: 40000, designation: 'Math Instructor', age: 28 },
        { name: 'Oliver', id: 4, father: 'William', mother: 'Ava', contact: '789456123', email: 'oliver@example.com', address: '321 Lane', occupation: 'Accountant', salary: 60000, designation: 'Senior Accountant', age: 32 },
        { name: 'Sophia', id: 5, father: 'Benjamin', mother: 'Emma', contact: '123789456', email: 'sophia@example.com', address: '654 Boulevard', occupation: 'Engineer', salary: 55000, designation: 'Software Developer', age: 29 },
        { name: 'Jackson', id: 6, father: 'Alexander', mother: 'Isabella', contact: '987321654', email: 'jackson@example.com', address: '987 Drive', occupation: 'Lawyer', salary: 70000, designation: 'Attorney', age: 34 },
        { name: 'Mia', id: 7, father: 'Matthew', mother: 'Sophia', contact: '321654987', email: 'mia@example.com', address: '456 Road', occupation: 'Nurse', salary: 45000, designation: 'Registered Nurse', age: 27 },
        { name: 'Lucas', id: 8, father: 'James', mother: 'Olivia', contact: '789321654', email: 'lucas@example.com', address: '123 Avenue', occupation: 'Marketing Manager', salary: 75000, designation: 'Marketing Manager', age: 33 },
        { name: 'Ava', id: 9, father: 'Ethan', mother: 'Ava', contact: '654321789', email: 'ava@example.com', address: '789 Street', occupation: 'Software Engineer', salary: 60000, designation: 'Software Engineer', age: 31 },
        { name: 'Logan', id: 10, father: 'Michael', mother: 'Emma', contact: '987789654', email: 'logan@example.com', address: '321 Boulevard', occupation: 'Teacher', salary: 42000, designation: 'English Instructor', age: 26 }
      ];
  

    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Convert the dataset to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(dataset);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Generate a unique filename
    const fileName = `dummy_data_${Date.now()}.xlsx`;

    // Save the workbook as a file
    XLSX.writeFile(workbook, fileName);
  };

  return (
    <div>
      <button onClick={downloadData}>Download Dummy Data</button>
    </div>
  );
};

export default Download;
