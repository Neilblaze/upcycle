import { ErrorMessage, Field } from "formik"

// must be used inside Formik
export const FormBlockTextInput = ({ placeholder, id, label, as='input', type='text' }: { placeholder: string, id: string, label: string, as?: 'textarea' | 'input', type?: string }) => {
	return (
		<div className="mb-4">
			<label className="block mb-2 text-sm font-medium text-gray-900 " htmlFor={id}>
				{label}
			</label>
			<Field
				id={id}
				type={type}
				name={id}
				as={as}
				rows={3}
				placeholder={placeholder}
				required={true}
				className='bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
			/>
			<p className="text-red-500 text-xs mt-1">
				<ErrorMessage name={id} />
			</p>
		</div>
	)
}
