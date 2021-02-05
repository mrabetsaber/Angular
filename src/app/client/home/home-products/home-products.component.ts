import { Subscription } from 'rxjs';
import { CategorieService } from './../../../services/categorie.service';


import { Component, OnInit, OnChanges, ViewChild, ElementRef, HostListener  } from '@angular/core';


@Component({
  selector: 'home-products',
  templateUrl: './home-products.component.html',
  styleUrls: ['./home-products.component.css']
})
export class HomeProductsComponent implements OnInit {

  subscribe:Subscription;
  products:any[];
  filterProduct:any[];
  
  showFiller = false;
  
  constructor(private categorieServ:CategorieService) {

    this.subscribe=this.categorieServ.getProd().subscribe(res=>{
      this.filterProduct=this.products=res;
    console.log(this.filterProduct);
    })

   }


  

  ngOnInit(): void {
    
    
  }
  filte(queryString: string){
        
        
        
    if(queryString !==""){
      this.filterProduct=[]
       this.products.forEach((p)=> {if(p.payload.doc.data().cat.toLocaleLowerCase().includes(queryString.toLocaleLowerCase())||
         p.payload.doc.data().nom.toLocaleLowerCase().includes(queryString.toLocaleLowerCase()) || 
         
         p.payload.doc.data().desc.toLocaleLowerCase().includes(queryString.toLocaleLowerCase())){

        this.filterProduct.push(p)
        }
        
      }

         )
       
      

    }
    else{
      this.filterProduct= this.products
    }

  }

}
