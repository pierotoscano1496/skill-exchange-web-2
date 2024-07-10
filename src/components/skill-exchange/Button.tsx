import React from 'react';
import classNames from 'classnames';

interface ButtonProps {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary';
    size?: 'small' | 'medium' | 'large';
}

const Button: React.FC<ButtonProps> = ({ label, onClick, variant = 'primary', size = 'medium' }) => {
    const baseStyles = 'rounded-lg font-poppins transition-colors';
    const variantStyles = variant === 'primary' ? 'bg-accent-red text-white' : 'bg-accent-turquoise text-white';
    const sizeStyles = size === 'small' ? 'py-1 px-2' : size === 'large' ? 'py-3 px-6' : 'py-2 px-4';

    return (
        <button onClick={onClick} className={classNames(baseStyles, variantStyles, sizeStyles)}>
            {label}
        </button>
    );
};

export default Button;
