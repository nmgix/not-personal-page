import { ButtonProps } from "../types";
import "./default-button.scss";

export const Button = ({ children, onClick, disabled }: ButtonProps) => {
  return (
    <button className='button default-button' onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
