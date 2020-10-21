import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Breadcrumb, Button, Checkbox, Container, Divider, Grid, Header, Icon, Popup, Segment, Table } from 'semantic-ui-react'
import PropTypes from 'prop-types'

import EnrollService from '../../app/api/EnrollService'
import LoadingComponent from '../../components/common/LoadingComponent'

const EnrollmentList = ({ history }) => {
  const [enrollments, setEnrollments] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchEnrollments = useCallback(async () => {
    setLoading(true)
    try {
      const enrollments = await EnrollService.fetchEnrollments()
      if (enrollments) setEnrollments(enrollments)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast.error(error)
    }
  }, [])

  useEffect(() => {
    fetchEnrollments()
  }, [fetchEnrollments])

  let enrollmentListHtml = <h4>There is no registered invoices</h4>

  if (enrollments && enrollments.length > 0) {
    enrollmentListHtml = (
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width="5">Enroll Date</Table.HeaderCell>
            <Table.HeaderCell width="2">State</Table.HeaderCell>
            <Table.HeaderCell width="3" />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {enrollments.map((enroll) => (
            <Table.Row key={enroll.id}>
              <Table.Cell>{new Date(enroll.fechaMatricula).toLocaleDateString()}</Table.Cell>
              <Table.Cell><Checkbox toggle readOnly={true} checked={enroll.estado} /></Table.Cell>
              <Table.Cell>
                <Popup
                  inverted
                  content="Enrollment Detail"
                  trigger={
                    <Button
                      color="violet"
                      icon="address card outline"
                      onClick={() => {
                        history.push(`/enrollment/${enroll.id}`)
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

  if (loading) return <LoadingComponent content="Loading Enrollments..." />

  return (
    <Segment>
      <Breadcrumb size="small">
        <Breadcrumb.Section>Enrollment</Breadcrumb.Section>
        <Breadcrumb.Divider icon="right chevron" />
        <Breadcrumb.Section active>Enrollment List</Breadcrumb.Section>
      </Breadcrumb>
      <Divider horizontal>
        <Header as="h4">
          <Icon name="list alternate outline" />
          Enrollments
        </Header>
      </Divider>
      <Container>
        <Grid columns="3">
          <Grid.Column width="3" />
          <Grid.Column width="10">{enrollmentListHtml}</Grid.Column>
          <Grid.Column width="3" />
        </Grid>
      </Container>
    </Segment>
  )
}

EnrollmentList.propTypes = {
  history: PropTypes.object.isRequired,
}

export default EnrollmentList
