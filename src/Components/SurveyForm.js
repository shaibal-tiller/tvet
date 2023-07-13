import React, { useState } from 'react';
import TextInputField from './TextInputField';
import SelectInputField from './SelectInputField';


const SurveyFormPage = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        dateOfBirth: '',
        contactNumber: '',
        numberOfSiblings: '',
        maritalStatus: '',
        spouseName: '',
        sex: '',
    });

    const handleChange = (name, value) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const calculateAge = () => {
        const currentDate = new Date();
        const birthDate = new Date(formData.dateOfBirth);

        // Calculate the age based on the difference between the current date and the birth date
        let age = currentDate.getFullYear() - birthDate.getFullYear();

        // Adjust the age if the current month is before the birth month
        if (
            currentDate.getMonth() < birthDate.getMonth() ||
            (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())
        ) {
            age--;
        }

        return age;
    };

    const handleBDTChange = (e) => {
        const bdtAmount = e.target.value;
        const usdAmount = bdtAmount / 100; // Assuming 1 BDT = 0.01 USD

        handleChange('salaryBDT', bdtAmount);
        handleChange('salaryUSD', usdAmount.toFixed(2));
    };

    return (
        <div className="p-4">
            <TextInputField
                title="Full Name"
                value={formData.fullName}
                onChange={(value) => handleChange('fullName', value)}
                backgroundColor="gray-100"
            />
            <div className="mb-4">
                <label className="block font-medium mb-1">Date of Birth</label>
                <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                    className="border border-gray-300 p-2 rounded bg-gray-100"
                />
            </div>
            <TextInputField
                title="Contact Number"
                value={formData.contactNumber}
                onChange={(value) => handleChange('contactNumber', value)}
                type="number"
                backgroundColor="gray-100"
            />
            <TextInputField
                title="Number of Siblings"
                value={formData.numberOfSiblings}
                onChange={(value) => handleChange('numberOfSiblings', value)}
                type="number"
                backgroundColor="gray-100"
            />
            <SelectInputField
                title="Marital Status"
                value={formData.maritalStatus}
                onChange={(value) => handleChange('maritalStatus', value)}
                options={['Single', 'Married']}
                backgroundColor="gray-100"
            />
            {formData.maritalStatus === 'Married' && (
                <TextInputField
                    title="Spouse Name"
                    value={formData.spouseName}
                    onChange={(value) => handleChange('spouseName', value)}
                    backgroundColor="gray-100"
                />
            )}
            <SelectInputField
                title="Sex"
                value={formData.sex}
                onChange={(value) => handleChange('sex', value)}
                options={['Male', 'Female', 'Other']}
                backgroundColor="gray-100"
            />
            <div className="mb-4">
                <label className="block font-medium mb-1">Age</label>
                <input
                    type="text"
                    value={calculateAge()}
                    readOnly
                    className="border border-gray-300 p-2 rounded bg-gray-100"
                />
            </div>
            <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5l.415-.207a.75.75 0 011.085.67V10.5m0 0h6m-6 0h-1.5m1.5 0v5.438c0 .354.161.697.473.865a3.751 3.751 0 005.452-2.553c.083-.409-.263-.75-.68-.75h-.745M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>

                <TextInputField
                    title="Salary (BDT)"
                    value={formData.salaryBDT}
                    onChange={handleBDTChange}
                    type="number"
                    backgroundColor="gray-100"
                />
            </div>
            <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>

                <TextInputField
                    title="Salary (USD)"
                    value={formData.salaryUSD}
                    readOnly
                    backgroundColor="gray-100"
                />
            </div>
        </div>
    );
};

export default SurveyFormPage;
