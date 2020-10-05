import React from 'react'
import { Segment, Container, Header, Icon, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Header as="h1" inverted>
          <Icon name="id card outline" />
          Academia WebApp
        </Header>
        <Header as="h2" inverted content="Welcome to the best place for study" />
        <Button size="huge" content="Go to Academy" inverted as={Link} to="/student" />
        <Header as="h2" inverted content="Welcome to the academy" />
        <Button size="huge" content="Login" inverted />
      </Container>
    </Segment>
  )
}

export default HomePage
