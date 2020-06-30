import React from 'react'
import {Menu, Container, Button} from 'semantic-ui-react'

interface IProps{
    openCreateForm: () => void;
}

export const NavBar:React.FC<IProps> = ({openCreateForm}) => {
    return (
        <Menu fixed='top' inverted>
            <Container>
                <Menu.Item header>
                    <img src = "/assets/logo.png" alt="" style={{marginRight: 10}}/>
                    Reactivities
                </ Menu.Item>
                <Menu.Item name = 'Activities'>
                    <Button onClick = {openCreateForm} positive content = 'Create Activity'/>
                </ Menu.Item>
                <Menu.Item name ='friends'/>
            </Container>
        </Menu>
    )
}

export default NavBar;