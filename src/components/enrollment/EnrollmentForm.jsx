import React, { useEffect, useState } from 'react'
import { Form as FinalForm, Field } from 'react-final-form'
import { combineValidators, isRequired } from 'revalidate'
import { Button, Form, Grid, Header, Popup, Table } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'
import PropTypes from 'prop-types'
import history from '../..'
import ErrorMessage from '../form/ErrorMessage'
import SelectedInput from '../form/SelectedInput'

import { fetchCourses } from '../../app/store/actions/courseActions'
import EnrollmentService from '../../app/api/EnrollService'
import useFetchStudents from '../../app/hook/useFetchStudents'
import TextInput from '../form/TextInput'
import CheckboxToggle from '../form/CheckboxToggle'

const validate = combineValidators({
    enrollDate: isRequired({ message: 'The enroll date is required' }),
    state: isRequired({ message: 'The enroll state is required' }),
    student: isRequired(''),
    courses: isRequired(''),
})

const actions = {
    fetchCourses: fetchCourses,
}

const mapState = (state) => {
  const courses = []

  if (state.course.courses && state.course.courses.length > 0) {
    state.course.courses.forEach((item) => {
      const course = {
        key: item.id,
        text: item.nombre,
        value: item.id,
      }
      courses.push(course)
    })
  }

  return {
    loading: state.course.loadingCourses,
    courses: courses,
  }
}

const EnrollmentForm = ({ fetchCourses, courses, loading }) => {
  const [students] = useFetchStudents()
  const [studentsList, setStudentsList] = useState([])
  const [loadingStudents, setLoadingStudents] = useState(true)
  const [items, setItems] = useState([])
  const [item, setItem] = useState(null)

  useEffect(() => {
    if (courses.length === 0) {
      fetchCourses()
    }
    setLoadingStudents(true)
    if (students) {
      const studentsList = []
      students.forEach((item) => {
        const student = {
          key: item.id,
          text: `${item.nombres} ${item.apellidos}`,
          value: item.id,
        }
        studentsList.push(student)
      })
      setStudentsList(studentsList)
      setLoadingStudents(false)
    }
  }, [students, courses.length, fetchCourses])

  const handleAddingItems = () => {
    const newItems = [...items]
    const coursesList = [...courses]
    const index = newItems.findIndex((a) => a.id === item)

    if(index === -1) {
      const newItem = {
        id: item,
        name: coursesList.filter((a) => a.key === item)[0].text
      }
      newItems.push(newItem)
    }
    setItems(newItems)
  }

  const handleRemoveItems = (id) => {
    let updatedItems = [...items]
    updatedItems = updatedItems.filter((a) => a.id !== id)
    setItems(updatedItems)
  }

  const handleAddNewEnrollment = async (values) => {
    const newCourses = [...items]
    const courseForEnrollment = newCourses.map((item) => {
      return { curso: { id: item.id } }
    })

    const newEnrollment = {
        fechaMatricula: values.enrollDate,
        estado: values.state,
        estudiante: {
        id: values.student,
      },
      cursos: courseForEnrollment,
    }
    try {
      const enrollment = await EnrollmentService.addEnroll(newEnrollment)
      toast.info('The enrollment was sucessfully created')
      history.push(`enrollment/${enrollment.id}`)
    } catch (error) {
      toast.error(error)
    }
  }

  return (
    <FinalForm
      onSubmit={(values) => handleAddNewEnrollment(values)}
      initialValues={{ state: true }}
      validate={validate}
      render={({ handleSubmit, submitting, submitError, invalid, pristine, dirtySinceLastSubmit }) => (
        <Form onSubmit={handleSubmit} error loading={loading || loadingStudents}>
          <Header as="h2" content="Add New Enroll" color="pink" textAlign="center" />
          <Field name="enrollDate" component={TextInput} type="date" placeholder="Select enroll date" label="Enroll date" width="7" />
          <Field name="state" component={CheckboxToggle}  label="State" width="7" type="checkbox" />
          <Field
            name="student"
            component={SelectedInput}
            placeholder="Select a Student"
            options={studentsList}
            width="4"
          />
          <Grid columns="2">
            <Grid.Row columns="2">
              <Grid.Column width="5">
                <Field
                  name="courses"
                  component={SelectedInput}
                  placeholder="Select a Course"
                  options={courses}
                  width="4"
                  handleOnChange={(e) => setItem(e)}
                />
              </Grid.Column>
              <Grid.Column>
                <Popup
                  inverted
                  content="Add Course To Enrollment"
                  trigger={
                    <Button
                      type="button"
                      loading={submitting}
                      color="violet"
                      icon="plus circle"
                      onClick={handleAddingItems}
                      disabled={!item}
                    />
                  }
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              {items && items.length > 0 && (
                <Table celled collapsing style={{ marginLeft: '2%' }}>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Course</Table.HeaderCell>
                      <Table.HeaderCell />
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {items.map((item) => (
                      <Table.Row key={item.id}>
                        <Table.Cell>{item.name}</Table.Cell>
                        <Table.Cell>
                          <Popup
                            inverted
                            content="Remove from course"
                            trigger={
                              <Button
                                color="red"
                                icon="remove circle"
                                type="button"
                                onClick={() => handleRemoveItems(item.id)}
                              />
                            }
                          />
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              )}
            </Grid.Row>
          </Grid>
          <br />
          {submitError && !dirtySinceLastSubmit && <ErrorMessage error={submitError} text="Invalid Values" />}
          <Button
            fluid
            disabled={(invalid && !dirtySinceLastSubmit) || pristine || items.length === 0}
            loading={submitting}
            color="violet"
            content="Add New Enroll"
          />
        </Form>
      )}
    />
  )
}

EnrollmentForm.propTypes = {
    fetchCourses: PropTypes.func.isRequired,
    courses: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
}

export default connect(mapState, actions)(EnrollmentForm)
