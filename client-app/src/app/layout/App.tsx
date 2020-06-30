import React, {useState, useEffect, Fragment} from 'react';
import { Header, Icon, List, Container } from 'semantic-ui-react';
import axios from 'axios';
import {IActivity} from '../models/activity'
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';


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
    <Fragment>
      <NavBar />
      <Container style = {{marginTop: '7em'}}>
        <ActivityDashboard activities={activities}/>
      </Container>  
    </Fragment>
  );
}

export default App;
