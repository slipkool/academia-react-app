import React, { useEffect, useState } from 'react'
import { Form, Header, Button } from 'semantic-ui-react'
import { Form as FinalForm, Field } from 'react-final-form'
import { combineValidators, isRequired } from 'revalidate'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import TextInput from '../form/TextInput'
import { fetchCurrentCourse, addCourse, updateCourse } from '../../app/store/actions/courseActions'
import ErrorMessage from '../form/ErrorMessage'

const validate = combineValidators({
  nombre: isRequired({ message: 'Please type a name' }),
  siglas: isRequired({ message: 'The acronym is required' })
})

const actions = {
    fetchCurrentCourse,
    addCourse,
    updateCourse,
}

const mapState = (state) => ({
  course: state.course.currentCourse,
  loading: state.course.loadingCurrentCourse,
})

const CoursesForm = ({ id, course, fetchCurrentCourse, loading, addCourse, updateCourse }) => {
  const [actionLabel, setActionLabel] = useState('Add Course')

  useEffect(() => {
    if (id) {
        fetchCurrentCourse(id)
        setActionLabel('Edit Course')
    } else setActionLabel('Add Course')
  }, [fetchCurrentCourse, id])

  const handleCreateorEdit = (values) => {
    if (id) {
        updateCourse(values)
    } else {
      const newCourse = {
        nombre: values.nombre,
        siglas: values.siglas,
        estado: true,
      }
      addCourse(newCourse)
    }
  }

  return (
    <FinalForm
      onSubmit={(values) => handleCreateorEdit(values)}
      initialValues={id && course}
      validate={validate}
      render={({ handleSubmit, submitting, submitError, invalid, pristine, dirtySinceLastSubmit }) => (
        <Form onSubmit={handleSubmit} error loading={loading}>
          <Header as="h2" content={actionLabel} color="pink" textAlign="center" />
          <Field name="nombre" component={TextInput} placeholder="Type the course name" />
          <Field name="siglas" component={TextInput} placeholder="Type the acronym of the course" />
          {submitError && !dirtySinceLastSubmit && <ErrorMessage error={submitError} text="Invalid values" />}
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

CoursesForm.propTypes = {
  id: PropTypes.string,
  course: PropTypes.object,
  fetchCurrentCourse: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  addCourse: PropTypes.func.isRequired,
  updateCourse: PropTypes.func.isRequired,
}

CoursesForm.defaultProps = {
  id: null,
  course: null,
}

export default connect(mapState, actions)(CoursesForm)
