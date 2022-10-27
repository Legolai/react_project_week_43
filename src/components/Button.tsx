import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	outline?: boolean;
}

const Button = ({ type, onClick, children, outline }: ButtonProps) => {
	return (
		<button
			className={`flex-grow m-0 w-full px-3 py-1 rounded-lg ${
				outline
					? "border-cyan-600 border-solid border-2 text-cyan-600 bg-white"
					: "bg-cyan-600 text-white"
			} active:scale-95 hover:scale-105 transition-all`}
			type={type}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default Button;
