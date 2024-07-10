import React from 'react';

interface InputProps {
    label: string;
    type?: 'text' | 'password' | 'email';
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ label, type = 'text', value, onChange }) => {
    return (
        <div className="mb-4">
            <label className="block text-accent-turquoise font-poppins mb-2">{label}</label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                className="w-full p-2 bg-gray-100 rounded-lg text-primary border border-accent-turquoise focus:outline-none focus:border-accent-yellow"
            />
        </div>
    );
};

export default Input;
