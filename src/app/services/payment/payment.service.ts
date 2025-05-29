import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl = 'https://api.tu-pasarela-de-pago.com';

  constructor(private http: HttpClient) {}

  processPayment(paymentData: any): Observable<any> {
    // Llama a la API de la pasarela de pago para procesar el pago
    return this.http.post(`${this.apiUrl}/process-payment`, paymentData);
  }
}
