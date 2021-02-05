import { CategorieService } from '../../../services/categorie.service';


import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, RequiredValidator} from '@angular/forms'; 
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase/app'
@Component({
  selector: 'productadd',
  templateUrl: './productadd.component.html',
  styleUrls: ['./productadd.component.css']
})

export class ProductaddComponent implements OnInit {
 myForm :FormGroup;
 url:'';
 message:string;
 imgExist=false;
 selectedImg: any =null;
 fileUrl :any
 
 

  constructor(private fb :FormBuilder,private categorieService :CategorieService,private router :Router,private storage:AngularFireStorage  ) { }
   







  ngOnInit(): void {
    
    this.myForm =this.fb.group({
      
      nom:'',
      prix:'',
      desc:'',
      img:'',
      cat:''
    })  
  
  }
  
   


  onSelectFile(e){
    
    if(e.target.files&&e.target.files[0]){
      var reader =new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=(event:any)=>{
        this.url=event.target.result;
        this.imgExist=true;
        
      }
      this.selectedImg=e.target.files[0];
      
      const metaData={'contentType':this.selectedImg.type}
      console.log(this.selectedImg.name);
      
      const storageRef:firebase.default.storage.Reference = firebase.default.storage().ref('/photos/featured/'+this.selectedImg.name)
      const uploadTask :firebase.default.storage.UploadTask= storageRef.put(this.selectedImg,metaData);
      console.log("uploading" , this.selectedImg.name);
      
        uploadTask.then((uploadSnapshot: firebase.default.storage.UploadTaskSnapshot)=>{

          console.log("upload is complite");
          
          storageRef.getDownloadURL().then(url=> {
            // `url` is the download URL for 'images/stars.jpg'
          this.fileUrl=url})
          
          
            

          
        })







    }
    else{
      this.selectedImg=null;
    }
  }
  createRecord(){
    
    let Record ={};
    Record['cat']=this.myForm.value.cat;
    Record['nom']=this.myForm.value.nom;
    Record['prix']=this.myForm.value.prix;
    Record['desc']=this.myForm.value.desc;
    Record['img']=this.fileUrl
    this.categorieService.addNewProd(Record).then(res =>{
      this.myForm.value.nom= "";
      this.myForm.value.prix= undefined;
      this.myForm.value.desc= "";
      this.myForm.value.img= "";
      this.myForm.value.cat= "";
      console.log(res);
      this.router.navigate(['/admin/gestprod'])
     
    }).catch(error=>{
      console.log(error);
      
    }) 
  }

  reset(){
    this.myForm.reset();
    this.router.navigate(['admin/gestprod'])
  }
  
    

 

}
