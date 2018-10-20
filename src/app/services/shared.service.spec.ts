import { TestBed, inject,async } from '@angular/core/testing';
import { HttpModule,Http,Response,ResponseOptions,XHRBackend } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { MockBackend } from '@angular/http/testing';
import { Task } from '../models/task';
import { SharedService } from './shared.service';

let service: SharedService;
describe('SharedService', () => {
  beforeEach(() => 
    TestBed.configureTestingModule({
      imports:[HttpModule,HttpClientModule],
      providers: [HttpModule,HttpClientModule,SharedService,
      {provide:XHRBackend, useClass: MockBackend}],
}));
it('Service should be created',() => {
  const service: SharedService= TestBed.get(SharedService);
  expect(service).toBeTruthy();
});
it('Adding record',()=>{
  const item:Task={TaskID:'123',TaskName:'TestService',ParentID:'ParentTask',Priority:10,PriorityTo:11,SDate: new Date(2018,11,2),EDate: new Date(2019,11,2),IsTaskEnded:true}
  const service: SharedService = TestBed.get(SharedService);
  service.AddTask(item).subscribe(
r => {  expect(r.TaskName).toEqual('TestService');});});
it('Deleting record',()=>{
  const TaskID = '1022';
  const service: SharedService = TestBed.get(SharedService);
  service.DeleteTask(TaskID);
  expect(service).toBeTruthy();
});
it('Get all Task',()=>{
  const service : SharedService= TestBed.get(SharedService);
  service.GetListTask().subscribe(r=>{expect(r.length).toEqual(3);});
});
it('Edit Task',()=>{
  const item:Task={TaskID:'1022',TaskName:'Test edit Service',ParentID:'ParentTask',Priority:10,PriorityTo:11,SDate: new Date(2018,11,2),EDate: new Date(2019,11,2),IsTaskEnded:true}
  const service: SharedService =  TestBed.get(SharedService);
  service.Edit(item).subscribe(
    r=>{expect(r.length).toEqual(3);});
});});