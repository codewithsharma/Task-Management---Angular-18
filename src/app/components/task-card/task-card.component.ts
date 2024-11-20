import { DatePipe, JsonPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css'
})
export class TaskCardComponent implements OnInit {

  @Input() task : {
    assignedBy    :    string
    assignedTo    :    string
    description    :   string
    dueDate    :    string
    dueTime    :    string
    status    :   string
    title    :    string
    __v    :    number
    _id    :   string
    createdAt:string
    updatedAt:string
  }= {
    assignedBy
: 
"673c7f09d00685bd9598df73",
assignedTo
: 
"673c84240314582fe9a89795",
description
: 
"qwfeqerre",
dueDate
: 
"2024-11-21",
dueTime
: 
"17:59",
status
: 
"Pending",
title
: 
"ewewqew",
__v
: 
0,
_id
: 
"673c843e0314582fe9a8979c",
createdAt:"string",
updatedAt:"string"

  }

  ngOnInit(): void {
    console.log("task", this.task)
  }

}
