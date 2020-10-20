import React, { useEffect } from 'react'
import { Segment, Breadcrumb, Table, Divider, Header, Icon, Popup, Button, Container, Grid } from 'semantic-ui-react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { fetchCourses, deleteCourse } from '../../app/store/actions/courseActions'
import { openModal } from '../../app/store/actions/modalActions'
import LoadingComponent from '../../components/common/LoadingComponent'
import CoursesForm from '../../components/courses/CoursesForm'

const actions = {
  fetchCourses,
  openModal,
  deleteCourse
}

const mapState = (state) => ({
  courses: state.course.courses,
  loadingCourses: state.course.loadingCourses,
  loadingCurrentCourse: state.course.loadingCurrentCourse,
})

const CourseList = ({ fetchCourses, openModal, courses, loadingCourses, loadingCurrentCourse, deleteCourse }) => {
  useEffect(() => {
    fetchCourses()
  }, [fetchCourses])

  let courseListHtml = <h4>There are no course on the academy</h4>

  if (courses && courses.length > 0) {
    courseListHtml = (
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width="5">Nombre</Table.HeaderCell>
            <Table.HeaderCell width="2">Siglas</Table.HeaderCell>
            <Table.HeaderCell width="2">Estado</Table.HeaderCell>
            <Table.HeaderCell width="2" />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {courses.map((course) => (
            <Table.Row key={course.id}>
              <Table.Cell>{course.nombre}</Table.Cell>
              <Table.Cell>{course.siglas}</Table.Cell>
              <Table.Cell><div className="ui fitted toggle checkbox"><input type="radio" className="hidden" readOnly={true} checked={course.estado}/><label></label></div></Table.Cell>
              <Table.Cell>
                <Popup
                  inverted
                  content="Update Course"
                  trigger={
                    <Button
                      basic
                      color="violet"
                      icon="edit"
                      loading={loadingCurrentCourse}
                      onClick={() => {
                        openModal(<CoursesForm id={course.id} />)
                      }}
                    />
                  }
                />
                <Popup
                  inverted
                  content="Delete Course"
                  trigger={
                    <Button
                      basic
                      color="red"
                      icon="trash"
                      loading={loadingCurrentCourse}
                      onClick={() => {
                        deleteCourse(course.id)
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

  if (loadingCourses) return <LoadingComponent content="Loading Dishes..." />

  return (
    <Segment>
      <Breadcrumb size="small">
        <Breadcrumb.Section>Resources</Breadcrumb.Section>
        <Breadcrumb.Divider icon="right chevron" />
        <Breadcrumb.Section active>Courses</Breadcrumb.Section>
      </Breadcrumb>
      <Divider horizontal>
        <Header as="h4">
          <Icon name="list alternate outline" />
          Courses List
        </Header>
      </Divider>
      <Segment>
        <Button
          size="large"
          content="New Course"
          icon="add"
          color="purple"
          onClick={() => {
            openModal(<CoursesForm />)
          }}
        />
      </Segment>
      <Container>
        <Grid.Column columns="3">
          <Grid.Column width="3" />
          <Grid.Column width="10">{courseListHtml}</Grid.Column>
          <Grid.Column width="3" />
        </Grid.Column>
      </Container>
    </Segment>
  )
}

CourseList.propTypes = {
  fetchCourses: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  courses: PropTypes.array.isRequired,
  loadingCourses: PropTypes.bool.isRequired,
  loadingCurrentCourse: PropTypes.bool.isRequired,
  deleteCourse: PropTypes.func.isRequired
}

export default connect(mapState, actions)(CourseList)
