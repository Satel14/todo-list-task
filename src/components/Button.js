import React from 'react'
import '../styles/button.scss'
import { getClasses } from '../utils/getClasses';
function Button({ type, variant, children, ...rest }) {
    const buttonTypes = {
        primary: 'primary',
        secondary: 'secondary',
    };
    return (
        <button
            className={getClasses([
                'button',
                [`button--${buttonTypes[variant]}`],
            ])}
            type={type === 'submit' ? 'submit' : 'button'}
            {...rest}
        >
            {children}
        </button>
    );
}

function SelectButton({ children, id, ...rest }) {
    return (
        <select id={id} className={getClasses(['button',
        'button__select'])}
            {...rest}
        >
            {children}
        </select>
    )
}
export { SelectButton }
export default Button;