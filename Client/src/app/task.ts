export class Task {
    _id: string;
    title: string;
    description: string;
    date_created: Date;
    date_due: Date;
    date_start_by: Date;
    complete: boolean;

    constructor(){
        this._id = "";
        this.title = "";
        this.description = '';
        this.date_created = new Date;
        this.date_due = new Date;
        this.date_start_by = new Date;
        this.complete = false;
    }
}