import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import HomePage from '../../pages/home/HomePage'
import Navbar from '../../components/navbar/Navbar'
import Enrollment from '../../pages/enrollment/Enrollment'
import CourseList from '../../pages/course/CourseList'
import StudentsList from '../../pages/student/StudentsList'
import EnrollmentList from '../../pages/enrollment/EnrollmentList'
import EnrollmentDetail from '../../pages/enrollment/EnrollmentDetail'
import NotFound from '../../components/common/NotFound'

const Routes = () => {
  return (
    <>
      <Route exact path="/" component={HomePage} />
      <Route
        path="/(.+)"
        render={() => (
          <>
            <Navbar />
            <Container style={{ marginTop: '7em' }}>
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/courses" component={CourseList} />
                <Route path="/students" component={StudentsList} />
                <Route path="/new-enrollment" component={Enrollment} />
                <Route path="/enrollment/:id" component={EnrollmentDetail} />
                <Route path="/enrollmentlist" component={EnrollmentList} />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </>
        )}
      />
    </>
  )
}

export default Routes
