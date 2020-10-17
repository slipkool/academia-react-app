import React from 'react'
import { Menu, Container, Icon, Dropdown, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logout } from '../../app/store/actions/authActions'

const mapState = (state) => ({
  currentUser: state.auth.currentUser,
})

const actions = {
  logout,
}

const Navbar = ({ currentUser, logout }) => {
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header as={Link} to="/">
          <Icon name="address card outline" /> Academy
        </Menu.Item>
        <Menu.Item>
          <Dropdown pointing="top left" text="Students">
            <Dropdown.Menu>
              <Dropdown.Item text="New Student" icon="user plus" as={Link} to="/student" />
              <Dropdown.Item text="Students List" icon="list" as={Link} to="/students" />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
        <Menu.Item>
          <Dropdown pointing="top left" text="Courses">
            <Dropdown.Menu>
              <Dropdown.Item text="New Course" icon="wordpress forms" as={Link} to="/course" />
              <Dropdown.Item text="Courses List" icon="list" as={Link} to="/courses" />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
        <Menu.Item>
          <Dropdown pointing="top left" text="Enrollment">
            <Dropdown.Menu>
              <Dropdown.Item text="Enroll" icon="vcard" as={Link} to="/enrollment" />
              <Dropdown.Item text="Enrollments List" icon="list" as={Link} to="/enrollmentslist" />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
        <Menu.Item position="right">
          <Image avatar spaced="right" src="/assets/user.png" />
          <Dropdown pointing="top left" text={currentUser.sub}>
            <Dropdown.Menu>
              <Dropdown.Item text="Logout" icon="log out" onClick={logout} />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      </Container>
    </Menu>
  )
}

Navbar.propTypes = {
  currentUser: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
}

export default connect(mapState, actions)(Navbar)
