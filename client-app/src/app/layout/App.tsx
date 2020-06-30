import React, {useState, useEffect, Fragment} from 'react';
import {Container} from 'semantic-ui-react';
import axios from 'axios';
import {IActivity} from '../models/activity'
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';


const App = () => {
  //pass in an array: param1 = state, param2 = function we will use to set the state
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
  const [editMode, setEditMode] = useState(false);

  const handleSelectActivity = (id: string) =>{
    setSelectedActivity(activities.filter(act=> act.id === id)[0]);
    setEditMode(false);
  }

  const handleOpenCreateForm = () =>{
    setSelectedActivity(null);
    setEditMode(true);
  }

  const handleCreateActivity = (activity: IActivity) =>{
    setActivities([...activities, activity]);
    setSelectedActivity(activity);
    setEditMode(false);
  }

  const handleEditActivity = (activity: IActivity) =>{
    setActivities([...activities.filter(act=> act.id !== activity.id), activity]);
    setSelectedActivity(activity);
    setEditMode(false);
  }

  const handleDeleteActivity = (id: string) =>{
    setActivities([...activities.filter(act=> act.id !== id)]);
  }

  //response.data will be a an array of IActivity (strongly typed)
  useEffect(() => {
    axios.get<IActivity[]>('http://localhost:5000/api/activities')
    .then(response =>{
      let activities: IActivity[] = [];
      response.data.forEach(activity =>{
        activity.date = activity.date.split('.')[0];
        activities.push(activity);
      })
      setActivities(response.data)
    })
  }, []);
  //[] second param of empty array ensures useEffect will only run once and not each time the component renders (equivalent usage of componentDidMount)
  //useEffect is a combination of componentDidMount, componentDidUpdate, componentWillUnmount


  return (
    <Fragment>
      <NavBar openCreateForm = {handleOpenCreateForm}/>
      <Container style = {{marginTop: '7em'}}>
        <ActivityDashboard 
          activities={activities} 
          selectActivity = {handleSelectActivity} 
          selectedActivity={selectedActivity} 
          editMode = {editMode} 
          setEditMode = {setEditMode}
          setSelectedActivity = {setSelectedActivity}
          createActivity = {handleCreateActivity}
          editActivity = {handleEditActivity}
          deleteActivity = {handleDeleteActivity}
        />
      </Container>  
    </Fragment>
  );
}

export default App;
