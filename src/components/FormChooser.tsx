import { ReactElement, useState } from "react";
import Button from "./Button";

interface FormChooserProps {
	forms: { title: string; form: JSX.Element }[];
}

const FormChooser = ({ forms }: FormChooserProps) => {
	const [selectedForm, setSelectedFrom] = useState(forms[0]);

	return (
		<div className="flex flex-col gap-4 my-4">
			<div className="flex border-2 rounded-lg border-blue-400 items-center justify-around ">
				{forms.map(form => (
					<button
						key={form.title}
						className={`flex-grow p-2 rounded-md transition-all ${
							selectedForm.title == form.title
								? "bg-blue-400 text-white"
								: "bg-white text-blue-400"
						}`}
						onClick={() => setSelectedFrom(form)}
					>
						{form.title}
					</button>
				))}
			</div>
			{selectedForm.form}
		</div>
	);
};

export default FormChooser;
