import React, { useCallback, useEffect, useState } from 'react'
import { Breadcrumb, Button, Container, Divider, Grid, Header, Icon, Popup, Segment, Table } from 'semantic-ui-react'
import StudentService from '../../app/api/StudentService'
import LoadingComponent from '../../components/common/LoadingComponent'
import { openModal, closeModal } from '../../app/store/actions/modalActions'
import { connect } from 'react-redux'
import StudentForm from '../../components/students/StudentForm'
import { toast } from 'react-toastify'

const actions = {
  openModal,
  closeModal,
}

const StudentsList = ({ openModal, closeModal }) => {
  const [studentsList, setStudentsList] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingAction, setLoadingAction] = useState(false)

  const fetchStudents = useCallback(
    async() => {
      setLoading(true)
      try {
        const students = await StudentService.fetchStudents()
        if(students) setStudentsList(students)
      } catch (error) {
        console.error(error)
      }
      setLoading(false)
    },
    [],
  )

  useEffect(() => {
    fetchStudents()
  }, [fetchStudents])

  const handlerCreateOrEdit = async (values) => {
    try {
      const studentUpdateList = [...studentsList]
      if(values.id) {
        const updateStudent = await StudentService.updateStudent(values)
        const index = studentUpdateList.findIndex((a) => a.id === values.id)
        studentUpdateList[index] = updateStudent
        toast.success('The student selected was update')
      }else {
        const student = {
          nombres: values.nombres,
          apellidos: values.apellidos,
          dni: values.dni,
          edad: values.edad
        }
        const newStudent = await StudentService.addStudent(student)
        studentUpdateList.push(newStudent)
        toast.success('Added new student')
      }
      setStudentsList(studentUpdateList)
    } catch (error) {
      toast.error(error)
    }
    closeModal()
  }

  const handlerDelete = async (id) => {
    setLoadingAction(true)
    try {
      let studentUpdateList = [...studentsList]
      await StudentService.deleteStudent(id)
      studentUpdateList = studentUpdateList.filter((a) => a.id !== id)
      setStudentsList(studentUpdateList)
      setLoadingAction(false)
      toast.success('The student was deleted')
    } catch (error) {
      setLoadingAction(false)
      toast.error(error)
    }
  } 

  let studentsListHtml = <h4>There no students</h4>
  if(studentsList && studentsList.length > 0) {
    studentsListHtml = (
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width="5">Name</Table.HeaderCell>
            <Table.HeaderCell width="3">LastName</Table.HeaderCell>
            <Table.HeaderCell width="2">DNI</Table.HeaderCell>
            <Table.HeaderCell width="2">AGE</Table.HeaderCell>
            <Table.HeaderCell width="4" />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {studentsList.map((student) => (
            <Table.Row key={student.id}>
              <Table.Cell>{student.nombres}</Table.Cell>
              <Table.Cell>{student.apellidos}</Table.Cell>
              <Table.Cell>{student.dni}</Table.Cell>
              <Table.Cell>{student.edad}</Table.Cell>
              <Table.Cell>
                <Popup
                  inverted
                  content="Update Customer"
                  trigger={ <Button color="violet" icon="edit" onClick={() => { openModal(<StudentForm studentId={ student.id } submitHandler={ handlerCreateOrEdit } />) }} /> }
                />
                <Popup
                  inverted
                  content="Delete Customer"
                  trigger={
                    <Button
                      color="red"
                      icon="trash"
                      onClick={() => {
                        handlerDelete(student.id)
                      }}
                    />
                  }
                />
                <Popup
                  inverted
                  content="Upload Photo"
                  trigger={
                    <Button
                      color="vk"
                      icon="cloud upload"
                      onClick={() => {
                        console.log('upload photo')
                      }}
                    />
                  }
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    )
  }

  if(loading || loadingAction) return <LoadingComponent content="Loading Students..." />

  return (
    <>
      <Segment>
        <Breadcrumb size="small">
          <Breadcrumb.Section>Resources</Breadcrumb.Section>
          <Breadcrumb.Divider icon="right chevron" />
          <Breadcrumb.Section active>Students</Breadcrumb.Section>
        </Breadcrumb>
        <Divider horizontal>
          <Header as="h4">
            <Icon name="list alternate outline" />
            Students List
          </Header>
        </Divider>
        <Segment>
          <Button
            size="large"
            content="New Student"
            icon="add user"
            color="purple"
            onClick={() => {
              openModal(<StudentForm  submitHandler={ handlerCreateOrEdit }/>)
            }}
          />
        </Segment>
        <Container textAlign="center">
          <Grid columns="3">
            <Grid.Column width="3" />
            <Grid.Column width="10">{studentsListHtml}</Grid.Column>
            <Grid.Column width="3" />
          </Grid>
        </Container>
      </Segment>
    </>
  )
}

export default connect(null, actions)(StudentsList)
