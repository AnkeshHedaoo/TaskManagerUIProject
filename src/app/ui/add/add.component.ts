import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task';
import { SharedService } from '../../services/shared.service';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { DateTimeFormatter } from '../../services/DateFormat';
import { Router, ActivatedRoute } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
item:Task={};
taskList:Array<Task>;
addTaskForm : NgForm;

  constructor(private _router:Router,private shareservice:SharedService,
    private dateformat:DateTimeFormatter) {    
    this.GetList();
    
   }

  ngOnInit() {
    
  }
  GetList(){
    debugger;
    this.shareservice.GetListTask().subscribe(res=>{
      debugger;
      this.taskList=res;
    });
  }
  Add()
  {
    debugger;
    this.shareservice.AddTask(this.item).subscribe(res=>{
      this.item=res;      
      this._router.navigateByUrl("/view");
    });
  }

reset(form?: NgForm )
{
  form.reset();
  this.addTaskForm.reset();
}
}
