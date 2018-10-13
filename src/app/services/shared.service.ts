import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { debuglog } from 'util';

@Injectable()
export class SharedService {
baseUrl:"http://localhost/TaskManager.API/";
  constructor(private httpclient: HttpClient) 
  { }
  IDs:string;
  selectedTask : Task;
  TaskList : Task[];
  GetListTask():Observable<any>
  {
    return this.httpclient.get("http://localhost/TaskManager.API/GetAllTask");
  }
  AddTask(task:Task):Observable<any>
  {
    debugger;
    return this.httpclient.post("http://localhost/TaskManager.API/AddTask",task);
    
  }
  GetTaskByID(IDs:string):Observable<any>{
    debugger;
    return this.httpclient.get("http://localhost/TaskManager.API/GetTaskById/"+IDs);
    
  }  
  DeleteTask(ID:string):Observable<any>{
    return this.httpclient.delete("http://localhost/TaskManager.API/DeleteTaskById/"+ID);

  }
  UpdateTask(task:Task,IDs):Observable<boolean>{
    debugger;
    return this.httpclient.put<any>("http://localhost/TaskManager.API/UpdateTaskById/"+IDs,task);
  }  

  EndTask(task:Task,IDs):Observable<any>
  {
    debugger
    return this.httpclient.put<any>("http://localhost/TaskManager.API/EndTaskById/"+IDs,task);
    
  }
}
