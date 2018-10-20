import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../../models/task';
import { SharedService } from '../../services/shared.service';
import { PagerService } from '../../services/page.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  list:Task[]=[];
  list1:Task[]=[];
  SDate:Date;
  EDate:Date;
  PriFrom:number;
  PriTo:number;
  searchTask:string;
  searchfrom:string;
  searchto:string;
  SearchParentTask:string;
  errormsg: string=''; 
  task:Task={};
  item:Task={};
  taskList:Array<Task>;
  filterdArrayByDate:Task[] = new Array();  
  //public disabled: boolean = false
 pager:any={};
 pagedItems:Task[]=[];
 page:number=1;
  constructor(private _router:Router,
    private pagerService:PagerService,
    private sharedservice:SharedService,


  ) 
  { 
    this.GetList();
    this.item= new Task();
    this.sharedservice.GetListTask()
    .subscribe(i=>this.list=i);
    this.sharedservice.GetListTask()
    .subscribe(i=>this.pagedItems=i);
  }

  ngOnInit() {
  }
  setPage(page) {
    debugger;
    // get pager object from service
    this.pager = this.pagerService.getPager(this.taskList.length, page);

    // get current page of items
    this.pagedItems = this.taskList.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
  Edit(id:string){  
    debugger;
    this.sharedservice.IDs=id;  
    this._router.navigateByUrl("/update");
  }  
    
  GetList(){
    debugger;
    this.sharedservice.GetListTask().subscribe(res=>{
      debugger;
      this.taskList=res;
      this.setPage(this.page);
     // this._router.navigateByUrl("view");
    });

  }
  Delete(ID:string){
    this.sharedservice.DeleteTask(ID).subscribe(() => {
      this.GetList();
    })

  }

  END(ID:string)
  {
    debugger;    
    this.sharedservice.EndTask(this.item,ID).subscribe(() => {
      this.GetList();
    });      
  }

  SearchBySDate(ssdate:Date)
  {
    debugger;
    if(ssdate!==undefined)
    this.pagedItems=this.list.filter(i =>i.SDate.toString().toUpperCase().startsWith(ssdate.toString().toUpperCase()))

  }

  SearchByEDate(eedate:Date)
  {
    if(eedate!==undefined &&eedate!=null)
    this.pagedItems=this.list.filter(i=>i.EDate.toString().toUpperCase().startsWith(eedate.toString().toUpperCase()))
    
  }


  // SearchByParentTask(PTask:string)
  // {
  //   debugger;
  //   this.pagedItems=this.list.filter(i=>i.ParentID.toUpperCase().indexOf(PTask.toUpperCase()));
  // }

  searchByPriorityFrom(pri:number)
  {
    this.PriFrom=pri;
    this.pagedItems=this.list.filter(i=>i.Priority.toString().startsWith(pri.toString()));
    console.log("Priority:"+this.pagedItems);
  }

  searchByPriorityTo(pri:string)
  {
    debugger;
    this.pagedItems=this.list.filter((i) => (i.Priority.toString() >= this.PriFrom.toString() && i.Priority.toString() <= pri.toString()));
  }  
}
