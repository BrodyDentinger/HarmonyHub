/*
Names: Brody Dentinger and Muhammad Yasir Patel
Student IDs: 100561604 and 100854895
Date: March 26, 2024
File: eventCalendar.js
Description: Class file handling event creation for pushing/deleting events from the JSON.
*/
"use strict";
class CalendarEvent {
    _id;
    _owner;
    _title;
    _start;
    _attendees; // Represents a list of usernames attending the event
    _end; // Optional because not all events might have an end date/time
    _description; // Optional additional information
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get owner() {
        return this._owner;
    }
    set owner(value) {
        this._owner = value;
    }
    get title() {
        return this._title;
    }
    set title(value) {
        this._title = value;
    }
    get start() {
        return this._start;
    }
    set start(value) {
        this._start = value;
    }
    get attendees() {
        return this._attendees;
    }
    set attendees(value) {
        this._attendees = value;
    }
    get end() {
        return this._end;
    }
    set end(value) {
        this._end = value;
    }
    get description() {
        return this._description;
    }
    set description(value) {
        this._description = value;
    }
    constructor(id, owner, title, start, attendees, end, description) {
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
    toJSON() {
        return JSON.stringify({
            id: this._id,
            owner: this._owner,
            title: this._title,
            start: this._start.toISOString(),
            attendees: this._attendees,
            end: this._end ? this._end.toISOString() : null,
            description: this._description,
        });
    }
    /**
     * Adds a user to the attending list of an event object
     * @param username the username to add to the list of attendees
     */
    addAttendee(username) {
        this._attendees.push(username);
    }
}
