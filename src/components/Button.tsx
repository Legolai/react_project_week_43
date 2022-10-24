import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = ({ type, onClick, children }: ButtonProps) => {
	return (
		<button
			className="flex-grow m-0 w-full px-3 py-1 rounded-lg bg-blue-400 text-white active:scale-95 hover:scale-105 transition-all"
			type={type}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default Button;
