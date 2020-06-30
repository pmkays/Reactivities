import React, { useState, FormEvent } from 'react'
import {Segment, Form, Button} from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'
import {v4 as uuid} from 'uuid'

interface IProps{
    setEditMode: (editMode : boolean) => void;
    activity: IActivity;
    editActivity: (activity: IActivity) => void;
    createActivity: (activity: IActivity) => void;
}

export const ActivityForm:React.FC<IProps> = ({setEditMode, activity: initialFormState, createActivity, editActivity}) => {

    const initialiseForm = () =>{
        if(initialFormState){
            return initialFormState
        } else {
            return {
                id: '',
                title: '',
                category: '',
                description:'',
                date:'',
                city:'',
                venue:''
            }
        }
    };

    const [activity, setActivity] = useState<IActivity>(initialiseForm);

    const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        const {name, value} = event.currentTarget;
        setActivity({...activity, [name]: value})
    };

    const handleSubmit = () =>{
        if(activity.id.length === 0){
            let newActivity ={
                ...activity,
                id: uuid()
            }
            createActivity(newActivity);
        } else {
            editActivity(activity);
        }
    };

    return (
        <Segment clearing>
            <Form onSubmit = {handleSubmit}>
                <Form.Input placeholder = 'Title' name = 'title' onChange = {handleInputChange} value = {activity.title}/>
                <Form.TextArea rows ={2} placeholder = 'Description' name = 'description' onChange = {handleInputChange} value = {activity.description}/>
                <Form.Input placeholder = 'Category' name = 'category' onChange = {handleInputChange}  value ={activity.category}/>
                <Form.Input type = 'datetime-local' placeholder = 'Date' name = 'date' onChange = {handleInputChange} value = {activity.date}/>
                <Form.Input placeholder = 'City' name = 'city' onChange = {handleInputChange} value = {activity.city}/>
                <Form.Input placeholder = 'Venue' name = 'venue' onChange = {handleInputChange} value = {activity.venue}/>
                <Button floated='right' positive type='submit' content='Submit'/>
                <Button onClick={() => setEditMode(false)} floated='right' type='submit' content='Cancel'/>                                
            </Form>
        </Segment>
    )
}
