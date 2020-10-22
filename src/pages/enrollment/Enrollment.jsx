import React from 'react'
import { Breadcrumb, Container, Divider, Grid, Header, Icon, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import EnrollmentForm from '../../components/enrollment/EnrollmentForm'

const Enrollment = () => {
  return (
    <Segment>
      <Breadcrumb size="small">
        <Breadcrumb.Section>Enrollment</Breadcrumb.Section>
        <Breadcrumb.Divider icon="right chevron" />
        <Breadcrumb.Section as={Link} to="/enrollmentlist">
          Enrollment List
        </Breadcrumb.Section>
        <Breadcrumb.Divider icon="right chevron" />
        <Breadcrumb.Section active>New Enrollment</Breadcrumb.Section>
      </Breadcrumb>
      <Divider horizontal>
        <Header as="h4">
          <Icon name="address card outline" />
          Enrollment Detail
        </Header>
      </Divider>
      <Container>
        <Grid columns="3">
          <Grid.Column width="3" />
          <Grid.Column width="10">
            <EnrollmentForm />
          </Grid.Column>
          <Grid.Column width="3" />
        </Grid>
      </Container>
    </Segment>
  )
}

export default Enrollment
