export class Task {
    _id: string;
    title: string;
    description: string;
    date_created: Date;
    date_due: Date;
    date_start_by: Date;
    date_completed: Date;
    complete: boolean;

    constructor(){
        this._id = "";
        this.title = "";
        this.description = '';
        this.date_created = new Date;
        this.date_due = new Date;
        this.date_start_by = new Date;
        this.date_completed = new Date;
        this.complete = false;
    }
}