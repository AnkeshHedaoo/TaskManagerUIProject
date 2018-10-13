import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Task } from '../../models/task';
import { SharedService } from '../../services/shared.service';
//import { ActivatedRoute } from '@angular/router/src/router_state';
import { DateTimeFormatter } from '../../services/DateFormat';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
item:Task={};
submitted:boolean=false;
taskList:Array<Task>;
errormsg:string="";
  constructor(private _router:Router,
    private shareservice:SharedService,
    private _route:ActivatedRoute,
    private dateformat:DateTimeFormatter
  ) {this.GetList();
    
    if(this.shareservice.IDs != null && this.shareservice.IDs != undefined && this.shareservice.IDs)
    {
      debugger;
      this.shareservice.GetTaskByID(this.shareservice.IDs).subscribe(res =>{
        debugger;
        this.item=res;
      })
    }
   }

  ngOnInit() {
    // debugger;    
    // this._route.paramMap.subscribe(parameterMap =>{
    //   const id = + parameterMap.get('id');
    //   this.shareservice.GetTaskByID(id);
      
    // });
  }
  GetList(){
    debugger;
    this.shareservice.GetListTask().subscribe(res=>{
      debugger;
      this.taskList=res;
    });
  }
  Cancel(){
    this._router.navigateByUrl("/view");
  }

  Update()
  {
    debugger;
    this.shareservice.UpdateTask(this.item,this.item.TaskID).subscribe(res=>{
    this.errormsg="";
    this._router.navigateByUrl("/view");
    });
  }

}
