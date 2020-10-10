import React, { useCallback, useEffect, useState } from 'react'
import { Breadcrumb, Button, Container, Divider, Grid, Header, Icon, Popup, Segment, Table } from 'semantic-ui-react';
import StudentService from '../../app/api/StudentService'

const StudentsList = () => {
  const [studentsList, setStudentsList] = useState([]);

  const fetchStudents = useCallback(
    async() => {
      try {
        const students = await StudentService.fetchStudents()
        if(students) setStudentsList(students)
      } catch (error) {
        console.error(error)
      }
    },
    [],
  )

  useEffect(() => {
    fetchStudents()
  }, [fetchStudents])

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
                  trigger={
                    <Button
                      color="violet"
                      icon="edit"
                      onClick={() => {
                        console.log('edit')
                      }}
                    />
                  }
                />
                <Popup
                  inverted
                  content="Delete Customer"
                  trigger={
                    <Button
                      color="red"
                      icon="trash"
                      onClick={() => {
                        console.log('delete')
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
            content="New Customer"
            icon="add user"
            color="purple"
            onClick={() => {
              console.log('new student')
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

export default StudentsList
