import { HttpClient } from "@angular/common/http";
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from "@angular/core";
import { map, mergeMap, switchMap } from 'rxjs/operators';

import { ViewEncapsulation } from "@angular/core";
import {
  Form,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { stringify } from "querystring";
import { ActivatedRoute, Router } from "@angular/router";

interface Position {
  doctorContent?: string;
  positionX: number;
  positionY: number;
}

class Usermodel {
  id?: string;
  userId?:string;
  userName?: string;
  doctorName?: string;
  content: Array<Position> = [];
}

class Users  {
  id: string;
  userName: string;
  doctorName: string;
  saved : boolean;
  content: Array<Position> = [];
};

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  @ViewChild("canvas", { static: true }) canvas: ElementRef;
  @ViewChild("contentType", { static: true }) contentType: ElementRef;
  @ViewChild("peak", { static: true }) image: ElementRef;
  count: number = 0;
  counts: Array<Position> = [];
  contentForm: FormGroup;
  AllUser: Array<Users>;
  getUrl = " http://localhost:8080/findAll";
  update = "http://localhost:8080/updateContent";
  startX : number;
  startY : number;
  constructor(
    private router: Router,
    private activeRoute :ActivatedRoute,
    private fb: FormBuilder,
    private Http: HttpClient
  ) {}

  activeCanvas : boolean = true;
  ngOnInit(): void {
    this.contentForm = this.fb.group({
      contentArr: this.fb.array([]),
    });
    this.Http.get<any>(this.getUrl).subscribe((res) =>{
      this.AllUser = res;
      this.AllUser.forEach(ele=>{
          if(ele.content === null)  ele.content = [];
       });

    });


    const canvas: HTMLCanvasElement = this.canvas.nativeElement;
    const contentType: HTMLElement = this.canvas.nativeElement;
    const context = canvas.getContext("2d");
    const img: HTMLImageElement = this.image.nativeElement;

    if (context) {
      this.drawCanvas(context, canvas, img);
     }
   }

  get contents(): FormArray {
    return this.contentForm.get("contentArr") as FormArray;
  }

  pushContentFields(): FormGroup {
    return this.fb.group({
      doctorContent: ["", Validators.required],
      positionX: "",
      positionY: "",
    });
  }

  drawCanvas(ctx: CanvasRenderingContext2D,   canvas: HTMLCanvasElement,  content: HTMLImageElement ) {
    const offsetX = canvas.offsetLeft;
    const offsetY = canvas.offsetTop;


    window.onload = (e) => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const drawOval = (e: Event) => {
      if (this.count < 3 && e.target === this.image.nativeElement && this.activeCanvas) {
        this.ctxGraphics(ctx , this.activeCanvas);
      }
    };

    const handleMouseDown = (e: Event | any) => {
      e.stopPropagation();
      this.startX = Number(+e.clientX - +offsetX);
      this.startY = Number(+e.clientY - +offsetY);
    };

    window.onclick = (e) => {
      drawOval(e);
    };

    window.onmousedown = (e) => {
      handleMouseDown(e);
    };
  }

  ctxGraphics(ctx:CanvasRenderingContext2D , active : boolean,canvas?:HTMLCanvasElement){

    if(!active){
     this.AllUser.forEach((ele,i)=>{
     console.log(ele , this.selectedUser === ele.id);
    if(this.selectedUser ===  ele.id){
      this.contents.clear();
      ctx.clearRect(0,0,canvas.width,canvas.height);
      for (let index = 0 , j =1; index < ele.content.length; index++ ,j++) {
        ctx.beginPath();
        ctx.arc(ele.content[index].positionX,ele.content[index].positionY, 25, 0, 2 * Math.PI);
        ctx.moveTo(ele.content[index].positionX,ele.content[index].positionY);
        ctx.fillStyle = "#fff";
        ctx.fillText(String(j), +ele.content[index].positionX + 10, +ele.content[index].positionY - 25);
        ctx.strokeStyle = "red";
        ctx.lineWidth = 3;
        ctx.stroke();
        this.contents.push(this.pushContentFields());
        this.contents.at(index).get('doctorContent').patchValue(ele.content[index].doctorContent);
        this.contents.disable();
      }
    }
      });
      this.activeCanvas = false
      return;
    }

    if(this.activeCanvas){
    ctx.beginPath();
    ctx.arc(this.startX, this.startY, 25, 0, 2 * Math.PI);
    ctx.moveTo(this.startX,this.startY);
    ctx.fillStyle = "#fff";
    ctx.fillText(String(this.count + 1), this.startX + 10, this.startY - 25);
    ctx.strokeStyle = "red";
    ctx.lineWidth = 3;
    ctx.stroke();
    this.counts.push({ positionX: this.startX, positionY: this.startY });
    localStorage.setItem("counts", JSON.stringify(this.counts));
    this.contents.push(this.pushContentFields());
    this.contents.at(this.count).patchValue(this.counts[this.count]);
    this.count++;
    }
  }

  openSearch(){
    const modal = document.getElementById('modal');
    modal.style.display ="block";
  }

  close(){
    const modal = document.getElementById('modal');
    modal.style.display ="none";
  }

  selectedUser: string = null;
  onUserClick(userId: string) {
    this.selectedUser = userId;
    const user = this.AllUser.find(val => val.id === userId);
    const context : HTMLCanvasElement | any = document.getElementById('canva');
    const ctx = context.getContext('2d');
    if(user.content!=null && user.content.length > 0){
      this.ctxGraphics(ctx ,  false , context);
      this.enableEdit = true;
      this.contents.enable();
    }
    else{
      ctx.clearRect(0,0,context.width , context.height);
      this.activeCanvas =true;
      this.enableEdit = false;
      this.contents.clear();
    }
   }

  editContent(){
    const edit = this.AllUser.find(val => val.id === this.selectedUser);
    this.contents.controls.forEach((ele,i)=> edit.content[i].doctorContent = ele.value.doctorContent);
     this.Http.post<any>(this.update,edit).subscribe(res=>{
      if(res){
        this.enableEdit =false;
        this.contents.disable();
      }
    });
  }

  routeUser(item:Usermodel){
    console.log(item);
    this.router.navigate(["/" , item.userId] ,{relativeTo:this.activeRoute})
  }

  searchContent(value : string){
    if(value.length === 0){
      this.ContentResults =[];
      return;
    }
    this.Http.get<any>("http://localhost:8080/findContent/"+ value).pipe(
      switchMap(async (x :Usermodel) => this.waiting(x)),
      map(x=>x)
    ).subscribe();
  }


 ContentResults :Array<Usermodel> = [];

  waiting(val : Usermodel){
    this.ContentResults.push(val);
    const lastResponse : Array<Usermodel> | any = this.ContentResults[this.ContentResults.length-1];
    this.ContentResults = [];
    this.ContentResults = lastResponse;
  }

  enableEdit : boolean = false;
  saveContent() {
    const doctorContents: FormArray = this.contentForm.get(
      "contentArr"
    ) as FormArray;
    const datas: Usermodel = this.AllUser.find(val => val.id === this.selectedUser);
    console.log(doctorContents.valid && datas);

    if (doctorContents.valid) {
      doctorContents.controls.forEach((ele, i) => {
        datas.content.push(ele.value);
      });
      this.Http.post<any>(this.update,datas).subscribe(res=>{
        if(res){
          this.enableEdit =true;
          doctorContents.disable();
        }
      });
    }
  }
}
