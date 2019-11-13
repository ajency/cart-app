import { Injectable, isDevMode} from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class AppServiceService {

  private addToCart = new Subject<any>();
  private openCart = new Subject<any>();
  private closeCart = new Subject<any>();
  private cartCount = new Subject<any>();
  private fetchItem = new Subject<any>();
  cartItems:any=[];
 

  constructor( ) { 
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

  fetchItemTrigger(){
    this.fetchItem.next();
  }

  listenToFetchItemTrigger() : Observable<any> {    
    return this.fetchItem.asObservable();
  }
}
