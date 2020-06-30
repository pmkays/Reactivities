export interface IActivity{
    id: string;
    title: string;
    description: string;
    date: Date;
    city: string;
    venue: string;
}

//doesn't show up in JS;  we want strong typing for our TS to avoid error.
//not using class because we just want blueprint and we don't need it to be converted to JS (interface doesn't get converted)