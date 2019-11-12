import { Injectable, isDevMode, EventEmitter, Output} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ApiServiceService } from './api-service.service';
// import * as moment from 'moment';

declare var $: any;
// declare var cdn_url : any;

@Injectable()
export class AppServiceService {

  private addToCart = new Subject<any>();
  private openCart = new Subject<any>();
  private closeCart = new Subject<any>();
  private cartCount = new Subject<any>();
  cartItems:any=[];
 

  constructor( private apiservice : ApiServiceService) { 
  }

  openCartTrigger(){
    this.openCart.next();
  }

  listenToOpenCartTrigger() : Observable<any> {    
    return this.openCart.asObservable();
  }

  closeCartTrigger(){
    this.closeCart.next();
  }

  listenToCloseCartTrigger() : Observable<any> {    
    return this.closeCart.asObservable();
  }

  cartCountTrigger(count){
    this.cartCount.next(count);
  }

  listenToCartCountTrigger() : Observable<any> {    
    return this.cartCount.asObservable();
  }
}
