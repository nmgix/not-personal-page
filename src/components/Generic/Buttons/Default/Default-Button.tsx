import { ButtonProps } from "../types";
import "./default-button.scss";

export const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button className='button default-button' onClick={onClick}>
      {children}
    </button>
  );
};
