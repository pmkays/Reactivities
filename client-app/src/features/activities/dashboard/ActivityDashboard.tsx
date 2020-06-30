import React from 'react'
import { Grid, List } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity';
import { ActivityList } from './ActivityList';
import { ActivityDetails } from '../details/ActivityDetails';
import { ActivityForm } from '../form/ActivityForm';

interface IProps{
    activities: IActivity[]
}

//dereference props straightaway so you can get activities and don't need to use props.activites
export const ActivityDashboard: React.FC<IProps> = ({activities}) => {
    return (
        <Grid>
            <Grid.Column width = {10}>
                <ActivityList activities = {activities}/>
            </Grid.Column>
            <Grid.Column width = {6}>
                <ActivityDetails/>
                <ActivityForm/>
            </Grid.Column>
        </Grid>
    )
}

export default ActivityDashboard;

