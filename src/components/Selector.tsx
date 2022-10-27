import { JSXElementConstructor, useEffect, useRef, useState } from "react";
import "../assets/css/selector.module.css";

interface Option {
	text: string | number;
	value: string | number;
	selected?: boolean;
	defaultSelected?: boolean;
}

interface SelectorProps {
	placeholder: string;
	options: Option[];
	required?: boolean;
	option: (props: Option) => JSX.Element;
}

const Selector = ({ options, option, placeholder }: SelectorProps) => {
	const [selected, setSelected] = useState<{ text: string | number; value: string | number }>({
		text: placeholder,
		value: "",
	});
	const selectRef = useRef<HTMLDivElement | null>(null);
	const optionsRef = useRef<HTMLDivElement | null>(null);

	const onClick = () => {
		selectRef.current?.classList.toggle("open");
	};

	const onSelect = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		console.log(e.target);
	};

	return (
		<div className="selectWrapper" onClick={onClick}>
			<div ref={selectRef} className="select">
				<div className="selectTrigger">
					<div className="arrow" />
					<span>{selected.text}</span>
				</div>
				<div onClick={onSelect} className="options">
					{options.map(o => {
						if (o.defaultSelected) setSelected(o);
						return option(o);
					})}
				</div>
			</div>
		</div>
	);
};

export default Selector;
