import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class PurchaseComponent implements OnInit {
  loading = true;
  progress = 0;
  showPaymentForm = false;
  transactionDetails: {
    id: string;
    date: string;
    method: string;
    amount: number;
  } | null = null;

  selectedVehicle = {
    name: 'Truffade Adder',
    price: 1000000,
    description: 'Inspirado en el Bugatti Veyron...',
    image: 'assets/cars/adder.png'
  };
  paymentMethods = [
    { method: 'card', icon: '💳', label: 'Tarjeta' },
    { method: 'paypal', icon: '🅿️', label: 'PayPal' },
    { method: 'bank', icon: '🏦', label: 'Transferencia' }
  ];
  selectedPaymentMethod = 'card';

  ngOnInit(): void {
    this.simulateLoading();
  }

  private simulateLoading(): void {
    this.progress = 0;
    const interval = setInterval(() => {
      if (this.progress >= 100) {
        clearInterval(interval);
        setTimeout(() => this.loading = false, 500);
      } else {
        this.progress = Math.min(100, this.progress + Math.random() * 10);
      }
    }, 200);
  }

  proceedToPayment(): void {
    console.log('Botón clickeado');
    this.showPaymentForm = true;
    setTimeout(() => window.scrollTo({ top:  this.getOffsetTop('paymentForm') - 20, behavior: 'smooth' }), 0);
  }

  selectPaymentMethod(method: string): void {
    this.selectedPaymentMethod = method;
  }

  processPayment(
    cardName: string,
    cardNumber: string,
    expiryDate: string,
    cvv: string
  ): void {
    if (!cardName || !cardNumber || !expiryDate || !cvv) {
      alert('Por favor completa todos los campos');
      return;
    }

    this.loading = true;
    this.simulateProcessing(() => {
      this.loading = false;
      this.showPaymentForm = false;
      const now = new Date();
      this.transactionDetails = {
        id: `DEMO-${Math.floor(Math.random() * 1e12)}`,
        date: now.toLocaleString(),
        method: this.selectedPaymentMethod,
        amount: this.selectedVehicle.price
      };
      setTimeout(() => window.scrollTo({ top: this.getOffsetTop('paymentConfirmation') - 20, behavior: 'smooth' }), 0);
    });
  }

  private simulateProcessing(callback: () => void): void {
    let width = 0;
    const interval = setInterval(() => {
      width = Math.min(100, width + Math.random() * 8);
      this.progress = width;
      if (width >= 100) {
        clearInterval(interval);
        setTimeout(callback, 500);
      }
    }, 200);
  }

  downloadReceipt(): void {
    if (!this.transactionDetails) return;
    const { id, date, method, amount } = this.transactionDetails;
    const receipt = `COMPROBANTE DE PAGO - SIMULACIÓN\nID: ${id}\nFecha: ${date}\nMétodo: ${method}\nMonto: $${amount}\n`;
    const blob = new Blob([receipt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'comprobante_pago_demo.txt';
    a.click();
    URL.revokeObjectURL(url);
  }

  private getOffsetTop(id: string): number {
    const el = document.getElementById(id);
    return el ? el.offsetTop : 0;
  }

  onSubmit(cardName: string, cardNumber: string, expiryDate: string, cvv: string): void {
    this.processPayment(cardName, cardNumber, expiryDate, cvv);
  }

}