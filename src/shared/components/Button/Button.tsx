import React from 'react';
import styles from './Button.module.css'

interface  ButtonProps {
    text?: string;
    href:string

}
const Button: React.FC<ButtonProps> = ({text, href = "#"})=>{
    return (
        <div className={styles.button}>
            <a href={href}>{text}</a>
        </div>
    )
}
export default Button;