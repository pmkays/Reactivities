import React from 'react'
import {Menu, Container, Button} from 'semantic-ui-react'

export const NavBar = () => {
    return (
        <Menu fixed='top' inverted>
            <Container>
                <Menu.Item header>
                    <img src = "/assets/logo.png" alt="" style={{marginRight: 10}}/>
                    Reactivities
                </ Menu.Item>
                <Menu.Item name = 'Activities'>
                    <Button positive content = 'Create Activity'/>
                </ Menu.Item>
                <Menu.Item name ='friends'/>
            </Container>
        </Menu>
    )
}

export default NavBar;