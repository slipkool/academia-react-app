import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { combineValidators, isRequired } from 'revalidate'
import { Form as FinalForm, Field } from 'react-final-form'
import { Button, Form, Header } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import useFetchStudent from '../../app/hook/useFetchStudent'
import ErrorMessage from '../form/ErrorMessage'
import TextInput from '../form/TextInput'

const validate = combineValidators({
    nombres: isRequired({ message: 'The name is required' }),
    apellidos: isRequired({ message: 'The last name is required' }),
    dni: isRequired({ message: 'The dni is required' }),
    edad: isRequired({ message: 'The age is required' })
})

function StudentForm({ studentId, submitHandler }) {
    const [actionLabel, setActionLabel] = useState('Add Student')
    //Custom hook
    const [student, loading] = useFetchStudent(studentId)

    useEffect(() => {
        if(studentId) {
            setActionLabel('Edit Student')
        }else {
            setActionLabel('Add Student')
        }
    }, [studentId])

    return (
        <FinalForm
          onSubmit={(values) => submitHandler(values)}
          initialValues={studentId && student}
          validate={validate}
          render={({ handleSubmit, submitting, submitError, invalid, pristine, dirtySinceLastSubmit }) => (
            <Form onSubmit={handleSubmit} error loading={loading}>
              <Header as="h2" content={actionLabel} color="pink" textAlign="center" />
              <Field name="nombres" component={TextInput} placeholder="Type the Name" />
              <Field name="apellidos" component={TextInput} placeholder="Type the Lastname" />
              <Field name="dni" component={TextInput} type="number" placeholder="Type the dni" />
              <Field name="edad" component={TextInput} type="number" placeholder="Type the age" />
              {submitError && !dirtySinceLastSubmit && (
                <ErrorMessage error={submitError} text="Invalid username or password" />
              )}
              {/*pristine: focus o onblur, dirtySinceLastSubmit: valores en los componentes mientras este abierto el form */}
              <Button
                fluid
                disabled={(invalid && !dirtySinceLastSubmit) || pristine}
                loading={submitting}
                color="violet"
                content={actionLabel}
              />
            </Form>
          )}
        />
      )
}

StudentForm.propTypes = {
    studentId: PropTypes.string,
    submitHandler: PropTypes.func.isRequired,
}

StudentForm.defaultProps = {
    studentId: null,
}

export default StudentForm
