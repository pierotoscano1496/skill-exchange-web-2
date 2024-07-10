import React from 'react';

interface CardProps {
    title: string;
    description: string;
    children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, description, children }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h2 className="text-accent-red font-poppins text-xl mb-2">{title}</h2>
            <p className="text-secondary font-roboto mb-4">{description}</p>
            {children}
        </div>
    );
};

export default Card;
