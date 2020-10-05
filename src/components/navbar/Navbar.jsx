import React from 'react'
import { Menu, Container, Icon, Dropdown, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const Navbar = () => {
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
              <Dropdown.Item text="Student List" icon="list" as={Link} to="/students" />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
        <Menu.Item>
          <Dropdown pointing="top left" text="Courses">
            <Dropdown.Menu>
              <Dropdown.Item text="New Course" icon="wordpress forms" as={Link} to="/course" />
              <Dropdown.Item text="Course List" icon="list" as={Link} to="/courses" />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
        <Menu.Item>
          <Dropdown pointing="top left" text="Enrollment">
            <Dropdown.Menu>
              <Dropdown.Item text="Enroll" icon="vcard" as={Link} to="/enrollment" />
              <Dropdown.Item text="Enrollment List" icon="list" as={Link} to="/enrollmentlist" />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
        <Menu.Item position="right">
          <Image avatar spaced="right" src="/assets/user.png" />
          <Dropdown pointing="top left" text="username">
            <Dropdown.Menu>
              <Dropdown.Item text="logout" icon="log out" onClick={() => console.log('logout')} />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      </Container>
    </Menu>
  )
}

export default Navbar
