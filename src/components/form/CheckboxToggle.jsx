import React from 'react'
import { Form } from 'semantic-ui-react'

const CheckboxToggle = ({ input, width, type, label, checked, meta: { touched, error } }) => {
    let labelHtml = <></>
    if(label) {
        labelHtml = <label width="2">{label}</label>
    }

    return (
        <Form.Field error={touched && !!error} type={type} width={width}>
            {labelHtml}
            <div className="ui fitted toggle checkbox">
                <input {...input} />
                <label></label>
            </div>
        </Form.Field>
    )
}

export default CheckboxToggle
