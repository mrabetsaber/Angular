import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CategorieService } from './../../services/categorie.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import * as firebase from 'firebase/app'
import { Subscription } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-gestprod',
  templateUrl: './gestprod.component.html',
  styleUrls: ['./gestprod.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class GestprodComponent implements OnDestroy {
   myForm : FormGroup
   Products:any[];
   FilterProduct:any[];
   selectedImg: any =null;
   fileUrl :any
   Subscribe:Subscription;
   url:'';
   panelOpenState = false;
   
   
   prod
   nom
   prix
   cat
   desc


  

  constructor(   private categorieServ:CategorieService , private router:Router ,private fb :FormBuilder) {
    
   this.Subscribe=  this.categorieServ.getProd().subscribe(res=>
    { this.FilterProduct = this.Products = res;
    
    }
    
    ) }
    ngOnInit(): void {
      
      
      
      
  }
    
  
  supprimerProd(cle){
    this.categorieServ.supprimProd(cle).then(
      res=>console.log("suprimer")
      
    )
  }

//   la fonction qui permet la recherche


    filte(queryString: string){
        
        
        
      if(queryString !==""){
        this.FilterProduct=[]
         this.Products.forEach((p)=> {if(p.payload.doc.data().cat.toLocaleLowerCase().includes(queryString.toLocaleLowerCase())||
           p.payload.doc.data().nom.toLocaleLowerCase().includes(queryString.toLocaleLowerCase()) || 
           
           p.payload.doc.data().desc.toLocaleLowerCase().includes(queryString.toLocaleLowerCase())){

          this.FilterProduct.push(p)
          }
          
        }

           )
         
        

      }
      else{
        this.FilterProduct= this.Products
      }

    }
    
 

  


  ngOnDestroy(): void {
    this.Subscribe.unsubscribe()
    
  }
  changeNom(id){
   
   let Record ={};
   this.categorieServ.getPro(id).subscribe(res=>
  
   {this.prod=res;
   Record['cat']= this.prod.payload.data().cat
   Record['prix']=this.prod.payload.data().prix;
   Record['desc']=this.prod.payload.data().desc;
   Record['nom']=this.nom;
   this.categorieServ.updateProd(id,Record);
  
   this.router.navigate(['/admin/gestprod']);
   
   });
   
    
    
    
    
  
    
  }
  changeCat(id){
   
   let Record ={};
   this.categorieServ.getPro(id).subscribe(res=>
  
   {this.prod=res;
   Record['nom']= this.prod.payload.data().nom
   Record['prix']=this.prod.payload.data().prix;
   Record['desc']=this.prod.payload.data().desc;
   Record['cat']=this.cat;
   this.categorieServ.updateProd(id,Record);
   
   });
   
    
    
    
    
  
    
  }
  changePrix(id){
   
   let Record ={};
   this.categorieServ.getPro(id).subscribe(res=>
  
   {this.prod=res;
   Record['cat']= this.prod.payload.data().cat
   Record['nom']=this.prod.payload.data().nom;
   Record['desc']=this.prod.payload.data().desc;
   Record['prix']=this.prix;
   this.categorieServ.updateProd(id,Record);
   
   });
   
    
    
    
    
  
    
  }
  changeImg(e,id){
    
    if(e.target.files&&e.target.files[0]){
      var reader =new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=(event:any)=>{
        this.url=event.target.result;
        
        
        
        
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
          this.fileUrl=url
        console.log(url);
        })
          
          
            

          
        })
        
        let Record ={};
        this.categorieServ.getPro(id).subscribe(res=>
       
        {this.prod=res;
        Record['cat']= this.prod.payload.data().cat
        Record['prix']=this.prod.payload.data().prix;
        Record['nom']=this.prod.payload.data().nom;
        Record['desc']=this.prod.payload.data().desc;
        Record['img']=this.fileUrl
        this.categorieServ.updateProd(id,Record);})






    }
    else{
      this.selectedImg=null;
    }
  

  }
  changeDesc(id){
   
   let Record ={};
   this.categorieServ.getPro(id).subscribe(res=>
  
   {this.prod=res;
   Record['cat']= this.prod.payload.data().cat
   Record['prix']=this.prod.payload.data().prix;
   Record['nom']=this.prod.payload.data().nom;
   Record['desc']=this.desc;
   this.categorieServ.updateProd(id,Record);
   
   });
   
    
    
    
    
  
    
  }
  
}


  