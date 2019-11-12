import { Injectable, PLATFORM_ID,Inject } from '@angular/core';
import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent } from 'rxjs';
import { map, filter, scan } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  handleError : any;
  isBrowser:any;
  ApiUrl = 'https://api.myjson.com/';
  constructor(private http : HttpClient,@Inject(PLATFORM_ID) private platformId) {
  	this.handleError = (error: any): Promise<any> => {
			        let prerror = this.parseRejectedError(error);
			        return Promise.reject(prerror);
		        }

   }

  	public request(url: string,type: string, body: object, optionalHeaders: object = {},overrideheaders: boolean = false, returntype: string = 'promise', observeResponse : boolean = false): any{
	  let headers = new HttpHeaders({'Content-Type': 'application/json'});
	  let opHeaderKeys = Object.keys(optionalHeaders);
	  if(opHeaderKeys.length){
	      for(let key of opHeaderKeys){
	        headers = headers.append(key,optionalHeaders[key]);
	      }
	  }
	  url= this.ApiUrl+url;
	  let httpEvent;
		if(type == 'get'){
		  httpEvent = this.http.get(url,{params : this.toHttpParams(body), headers: headers});
		}

		if(returntype == 'promise'){
		  return httpEvent
		  .toPromise()
		  .then((response) => {
		   return response;
		 })
		  .catch(this.handleError);
		}
		else{
		  	return httpEvent
		}
	}

	public parseRejectedError(error: any): any{
	    try{
	    	let error_object = {
	    		message : JSON.parse(error._body).message,
	    		status : error.status
	    	}
	      return error_object
	    }
	    catch(e){
	      return error;
	    }
	}

	toHttpParams(params) {
    return Object.getOwnPropertyNames(params)
                 .reduce((p, key) => p.set(key, params[key]), new HttpParams());
	}

}
