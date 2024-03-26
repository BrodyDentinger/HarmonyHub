/*
Names: Brody Dentinger and Muhammad Yasir Patel
Student IDs: 100561604 and 100854895
Date: March 26, 2024
File: eventCalendar.js
Description: Class file handling event creation for pushing/deleting events from the JSON.
*/

"use strict";

class CalendarEvent {

    private _id: number;
    private _owner: string;
    private _title: string;
    private _start: Date;
    private _attendees: string[]; // Represents a list of usernames attending the event
    private _end?: Date; // Optional because not all events might have an end date/time
    private _description?: string; // Optional additional information

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get owner(): string {
        return this._owner;
    }

    set owner(value: string) {
        this._owner = value;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get start(): Date {
        return this._start;
    }

    set start(value: Date) {
        this._start = value;
    }

    get attendees(): string[] {
        return this._attendees;
    }

    set attendees(value: string[]) {
        this._attendees = value;
    }

    get end(): Date {
        return <Date>this._end;
    }

    set end(value: Date) {
        this._end = value;
    }

    get description(): string {
        return <string>this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    constructor(id: number, owner : string, title: string, start: Date, attendees : string[], end?: Date, description?: string) {
        this._id = id;
        this._owner = owner;
        this._title = title;
        this._start = start;
        this._attendees = attendees;
        this._end = end;
        this._description = description;
    }

    /**
     * Converts an eventCalendar object into JSON formatted string
     * @returns a JSON string
     */
    public toJSON(): string {
        return JSON.stringify({
            id: this._id,
            owner: this._owner,
            title: this._title,
            start: this._start.toISOString(), // Explicitly converting to ISOString (widely accepted JSON date format for dates)
            attendees: this._attendees,
            end: this._end ? this._end.toISOString() : null, // End date is optional so ensure it's truthy before converting
            description: this._description,
        });
    }

    /**
     * Adds a user to the attending list of an event object
     * @param username the username to add to the list of attendees
     */
    public addAttendee(username: string) {
        this._attendees.push(username);
    }
}
