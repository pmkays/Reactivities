import React, {useState, useEffect, Fragment, SyntheticEvent} from 'react';
import {Container} from 'semantic-ui-react';
import {IActivity} from '../models/activity'
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import agent from '../api/agent';
import { LoadingComponent } from './LoadingComponent';


const App = () => {
  //pass in an array: param1 = state, param2 = function we will use to set the state
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState('');

  const handleSelectActivity = (id: string) =>{
    setSelectedActivity(activities.filter(act=> act.id === id)[0]);
    setEditMode(false);
  }

  const handleOpenCreateForm = () =>{
    setSelectedActivity(null);
    setEditMode(true);
  }

  const handleCreateActivity = (activity: IActivity) =>{
    setSubmitting(true);
    agent.Activities.create(activity).then(()=>{
      setActivities([...activities, activity]);
      setSelectedActivity(activity);
      setEditMode(false);
    }).then(() => setSubmitting(false))
  }

  const handleEditActivity = (activity: IActivity) =>{
    setSubmitting(true);
    agent.Activities.update(activity).then(()=>{
      setActivities([...activities.filter(act=> act.id !== activity.id), activity]);
      setSelectedActivity(activity);
      setEditMode(false);
    }).then(() => setSubmitting(false))
  }

  const handleDeleteActivity = (event: SyntheticEvent<HTMLButtonElement>, id: string) =>{
    setSubmitting(true);
    setTarget(event.currentTarget.name);
    agent.Activities.delete(id).then(()=>{
      setActivities([...activities.filter(act=> act.id !== id)]);
    }).then(() => setSubmitting(false))
  }

  //response.data will be a an array of IActivity (strongly typed)
  useEffect(() => {
    agent.Activities.list()
    .then(response =>{
      let activities: IActivity[] = [];
      response.forEach(activity =>{
        activity.date = activity.date.split('.')[0];
        activities.push(activity);
      })
      setActivities(activities)
    }).then(() => setLoading(false))
  }, []);
  //[] second param of empty array ensures useEffect will only run once and not each time the component renders (equivalent usage of componentDidMount)
  //useEffect is a combination of componentDidMount, componentDidUpdate, componentWillUnmount

  if(loading){
    return <LoadingComponent content='Loading activities...'/>
  }

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
          submitting = {submitting}
          target={target}
        />
      </Container>  
    </Fragment>
  );
}

export default App;
