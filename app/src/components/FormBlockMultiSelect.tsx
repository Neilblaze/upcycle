import { useField } from "formik"
import Select, { Options } from 'react-select';

export const FormBlockMultiSelect = ({ id, label, options }: {
	id: string,
	label: string,
	options: { value: string, label: string }[]
}) => {
	const [field, meta, helpers] = useField({ type: 'text', name: id })
	const { setValue } = helpers;
	const { error, touched } = meta;

	const getValue = () => {
		if (options) {
			return options.filter(option => field.value.indexOf(option.value) >= 0)
		} else {
			return []
		}
	};

	return (
		<div className="mb-4">
			<div className='form-inline-group'>
				<label className="block mb-2 text-sm font-medium text-gray-900 " htmlFor={id}>
					{label}
				</label>
				<Select
					name={id}
					onChange={(option) => {
						setValue((option as any).map((item: any) => item.value))
					}}
					isMulti={true}
					value={getValue()}
					className='block w-full text-sm text-gray-900  cursor-pointer bg-gray-50 focus:outline-none  '
					options={options.map((e, indx) => (
						{
							value: e.value,
							label: e.label
						}
					))}
				/>

				{error &&
					touched &&
					<p className="text-red-500 text-xs mt-1">
						{error}
					</p>}
			</div>
		</div>
	)
}
