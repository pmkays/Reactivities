import React, {Component} from 'react';
import { Header, Icon, List } from 'semantic-ui-react';
import axios from 'axios';
import {IActivity} from '../models/activity'

//make an interface so that we can specify activities is an array of IActivity when implementing componentDidMount()
interface IState{
  activities: IActivity[]
}

//empty props parameter since not passing anything down, pass in IState for state paramater
class App extends Component<{}, IState>{
  readonly state: IState = {
    activities: []
  }

  //use readonly so we can avoid altering state using this.state = instead of using this.setState() 
  componentDidMount(){
    axios.get<IActivity[]>('http://localhost:5000/api/activities')
    .then((response) =>{
      this.setState({
        activities: response.data
      })
    })
  }

  render(){
    return (
      <div>
        <Header as='h2'>
          <Icon name='users' />
          <Header.Content>Reactivities</Header.Content>
        </Header>
        <List>
          {this.state.activities.map((activity) => (
            <List.Item key = {activity.id}>{activity.title}</List.Item>
          ))}
        </List>
      </div>
    );
  }
  
}

export default App;
