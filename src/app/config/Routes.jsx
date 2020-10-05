import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import HomePage from '../../pages/home/HomePage'
import Navbar from '../../components/navbar/Navbar'
import Course from '../../pages/course/Course'
import Student from '../../pages/student/Student'
import Enrollment from '../../pages/enrollment/Enrollment'
import CourseList from '../../pages/course/CourseList'
import StudentList from '../../pages/student/StudentList'
import EnrollmentList from '../../pages/enrollment/EnrollmentList'

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
                <Route path="/course" component={Course} />
                <Route path="/courses" component={CourseList} />
                <Route path="/student" component={Student} />
                <Route path="/students" component={StudentList} />
                <Route path="/enrollment" component={Enrollment} />
                <Route path="/enrollmentlist" component={EnrollmentList} />
              </Switch>
            </Container>
          </>
        )}
      />
    </>
  )
}

export default Routes
