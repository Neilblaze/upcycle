import { ErrorMessage, useField } from "formik";

export const FormBlockFileInput = ({ id, label, required=true }: {id: string, label: string, required?:boolean}) => {
	const [field, meta, helpers] = useField({ type: 'file', name: id, });
	const { setValue } = helpers;

	return (
		<div className="mb-4">
			<div>
				<label className="block mb-2 text-sm font-medium text-gray-900 " htmlFor={id}>
					{label}
				</label>
				<input
					id={id}
					required={required}
					type='file'
					name={id}
					accept='image/png, image/jpeg'
					onChange={(event) => setValue(event.currentTarget.files?.[0])}
					className='block w-full text-sm text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 focus:outline-none  '
				/>
				<p className="text-red-500 text-xs mt-1">
					<ErrorMessage name={id} />
				</p>
			</div>
		</div>
	)
}
