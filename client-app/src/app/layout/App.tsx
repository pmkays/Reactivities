import React, {useState, useEffect} from 'react';
import { Header, Icon, List } from 'semantic-ui-react';
import axios from 'axios';
import {IActivity} from '../models/activity'


const App = () => {
  //pass in an array: param1 = state, param2 = function we will use to set the state
  const [activities, setActivities] = useState<IActivity[]>([]);

  //response.data will be a an array of IActivity (strongly typed)
  useEffect(() => {
    axios.get<IActivity[]>('http://localhost:5000/api/activities')
    .then(response =>{
      setActivities(response.data)
    })
  }, []);
  //[] second param of empty array ensures useEffect will only run once and not each time the component renders (equivalent usage of componentDidMount)
  //useEffect is a combination of componentDidMount, componentDidUpdate, componentWillUnmount

  return (
    <div>
      <Header as='h2'>
        <Icon name='users' />
        <Header.Content>Reactivities</Header.Content>
      </Header>
      <List>
        {activities.map(activity => (
          <List.Item key = {activity.id}>{activity.title}</List.Item>
        ))}
      </List>
    </div>
  );
}

export default App;
