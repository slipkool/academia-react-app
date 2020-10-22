import React from 'react'
import { Form, Label } from 'semantic-ui-react'

//parametro META enviado por la libreria final form
const TextInput = ({ input, width, type, placeholder, label, meta: { touched, error } }) => {
  let labelHtml = <></>
  if(label) {
      labelHtml = <label width="2">{label}</label>
  }

  return (
    <Form.Field error={touched && !!error} type={type} width={width}>
      {labelHtml}
      <input {...input} placeholder={placeholder} />
      {touched && error && (
        <Label basic color="red" pointing>
          {error}
        </Label>
      )}
    </Form.Field>
  )
}

export default TextInput
