import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralServicesService {
  constructor(private http: HttpClient) { }

  getMarcas(tipo:any) {
    return this.http.get<any[]>(`https://parallelum.com.br/fipe/api/v1/${tipo}/marcas`);
  }
  getModelos(tipo:any,marca:any) {
    return this.http.get<any[]>(`https://parallelum.com.br/fipe/api/v1/${tipo}/marcas/${marca}/modelos`);
  }
  getAnios(tipo:any,marca:any,modelo:any) {
    return this.http.get<any[]>(`https://parallelum.com.br/fipe/api/v1/${tipo}/marcas/${marca}/modelos/${modelo}/anos`);
  }
  getTotalInfo(tipo:any,marca:any,modelo:any,anio:any) {
    return this.http.get<any[]>(`https://parallelum.com.br/fipe/api/v1/${tipo}/marcas/${marca}/modelos/${modelo}/anos/${anio}`);
  }
  getCurrencyList(){
    return this.http.get<any[]>(`https://api.currencyapi.com/v3/currencies?apikey=rv8VUS4n2WmhLX9zWnUURw92gyGSTKSQ9nFZNaKA`);
  }
  getConvertCurrencyList(valor:any){
    return this.http.get<any[]>(`https://api.currencyapi.com/v3/latest?apikey=rv8VUS4n2WmhLX9zWnUURw92gyGSTKSQ9nFZNaKA&value=${valor}&base_currency=BRL`);
  }
  getUsers() {
    let headers = new HttpHeaders({
      'app-id': '63473330c1927d386ca6a3a5'
    });
    return this.http.get<any[]>('https://dummyapi.io/data/v1/user', {
      headers: headers
    });
  }
}
