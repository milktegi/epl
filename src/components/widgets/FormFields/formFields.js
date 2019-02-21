import React from 'react'
import style from './formFields.css'

const FormFields = ({ change, formdata, id }) => {
	
	const renderTempalte = () => {
		let formTemplate = null;
		switch(formdata.element) {
			case('input'):
			formTemplate = (
				<div>
					<Input 
						{...formdata.config}
						value={formdata.value}
						onBlur={(event) => change({event, id, blur: true })}
						onChange={(event) => change({event, id, blur: false })}
						/>
				</div>
			)
			break;
			default:
			formTemplate = null;
		}	
		return formTemplate;
	}
	 
	
	return(
		<div>
			{renderTempalte()}
		</div>
	)
}


export default FormFields; 