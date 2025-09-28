import React from 'react';
import { Link } from 'react-router-dom';
// @ts-ignore
import styles from './Button.module.css';

interface ButtonProps {
    text: string;
    to?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
}
const Button: React.FC<ButtonProps> = ({ text, to, onClick, className = '', type = 'button' }) => {
    if (to) {
        return (
            <Link to={to} className={`${styles.button} ${className}`}>
                {text}
            </Link>
        );
    }

    return (
        <button type={type} onClick={onClick} className={`${styles.button} ${className}`}>
            {text}
        </button>
    );
};

export default Button;
