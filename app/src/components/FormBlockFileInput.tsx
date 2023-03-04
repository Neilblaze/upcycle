import { ErrorMessage, useField } from "formik";

export const FormBlockFileInput = ({ id, label }: {id: string, label: string}) => {
	const [field, meta, helpers] = useField({ type: 'file', name: id, });
	const { setValue } = helpers;

	return (
		<div className="mb-4">
			<div>
				<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor={id}>
					{label}
				</label>
				<input
					id={id}
					required
					type='file'
					name={id}
					accept='image/png, image/jpeg'
					onChange={(event) => setValue(event.currentTarget.files?.[0])}
					className='block w-full text-sm text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'
				/>
				<p className="text-red-500 text-xs mt-1">
					<ErrorMessage name={id} />
				</p>
			</div>
		</div>
	)
}
