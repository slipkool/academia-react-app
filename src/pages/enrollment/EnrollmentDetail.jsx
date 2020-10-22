import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import PropTypes from 'prop-types'
import { Breadcrumb, Button, Checkbox, Container, Divider, Grid, Header, Icon, Segment, Table } from 'semantic-ui-react'

import StudentService from '../../app/api/StudentService'
import CourseService from '../../app/api/CourseService'
import EnrollService from '../../app/api/EnrollService'
import LoadingComponent from '../../components/common/LoadingComponent'

const EnrollmentDetail = ({ match }) => {
  const [enrollment, setEnrollment] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchEnrollment = useCallback(async () => {
    setLoading(true)
    try {
      const enrollment = await EnrollService.fetchEnroll(match.params.id)
      if (enrollment) {
        const student = await StudentService.fetchStudent(enrollment.estudiante.id)

        const items = []
        if (enrollment.cursos.length > 0) {
          enrollment.cursos.forEach((item) => {
            CourseService.fetchCourse(item.curso.id)
              .then((response) => {
                if (response) {
                  const courseItem = {
                    id: response.id,
                    nombre: response.nombre,
                    siglas: response.siglas,
                    estado: response.estado
                  }
                  items.push(courseItem)
                }

                const enrollmentDetail = {
                  id: enrollment.id,
                  student: student,
                  items,
                  enrollDate: new Date(enrollment.fechaMatricula).toLocaleDateString(),
                  state: enrollment.estado
                }
                setEnrollment(enrollmentDetail)
              })
              .catch((error) => toast.error(error))
          })
        }
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast.error(error)
    }
  }, [match.params.id])

  useEffect(() => {
    fetchEnrollment()
  }, [fetchEnrollment])

  if (loading) return <LoadingComponent content="Loading Enrollment Details..." />
  let enrollmentDetailedHtml = <h4>Enrollment Details</h4>

  if (enrollment) {
    enrollmentDetailedHtml = (
      <Segment.Group>
        <Segment>
          <Header as="h4" block color="violet">
            Student
          </Header>
        </Segment>
        <Segment.Group>
          <Segment>
            <p>
              <strong>Name: </strong>
              {`${enrollment.student.nombres} ${enrollment.student.apellidos}`}
            </p>
          </Segment>
        </Segment.Group>
        <Segment>
          <Header as="h4" block color="violet">
            Enrollment
          </Header>
        </Segment>
        <Segment.Group>
          <Segment><strong>Enrollment Code: </strong> {enrollment.id} </Segment>
          <Segment><strong>State: </strong> <Checkbox toggle readOnly={true} checked={enrollment.state} /></Segment>
          <Segment><strong>Enroll Date: </strong> {enrollment.enrollDate} </Segment>
        </Segment.Group>
        <Segment>
          <Table celled striped color="violet">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell colSpan="4">
                  <Icon name="list" />
                  Courses
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Acronym</Table.HeaderCell>
                <Table.HeaderCell>State</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {enrollment.items.length > 0 &&
                enrollment.items.map((item) => (
                  <Table.Row key={item.id}>
                    <Table.Cell>{item.nombre}</Table.Cell>
                    <Table.Cell>{item.siglas}</Table.Cell>
                    <Table.Cell><Checkbox toggle readOnly={true} checked={item.estado}/></Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </Segment>
      </Segment.Group>
    )
  }

  return (
    <Segment>
      <Breadcrumb size="small">
        <Breadcrumb.Section>Enrollment</Breadcrumb.Section>
        <Breadcrumb.Divider icon="right chevron" />
        <Breadcrumb.Section as={Link} to="/enrollmentlist">
          Enrollment List
        </Breadcrumb.Section>
        <Breadcrumb.Divider icon="right chevron" />
        <Breadcrumb.Section active>Enrollment Detail</Breadcrumb.Section>
      </Breadcrumb>
      <Divider horizontal>
        <Header as="h4">
          <Icon name="address card outline" />
          Enrollment Detail
        </Header>
      </Divider>
      <Segment>
          <Button
            size="large"
            content="New Enroll"
            icon="add user"
            color="purple"
            as={Link} to="/new-enrollment"
          />
        </Segment>
      <Container>
        <Grid columns="3">
          <Grid.Column width="3" />
          <Grid.Column width="10">{enrollmentDetailedHtml}</Grid.Column>
          <Grid.Column width="3" />
        </Grid>
      </Container>
    </Segment>
  )
}

EnrollmentDetail.propTypes = {
  match: PropTypes.object.isRequired,
}

export default EnrollmentDetail
