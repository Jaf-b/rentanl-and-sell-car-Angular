import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {carModel} from '../model/car-model';
import {shopModel} from '../model/shop-model';

@Injectable({
  providedIn: 'root'
})
export class databaseService {

  constructor() {
  }

  protected readonly http = inject(HttpClient);
  protected readonly Url = "http://localhost:1000"

  getCars() {
    return this.http.get<carModel[]>(`${this.Url}/car`);
  }

  getCarsByID(id: string) {
    return this.http.get<carModel>(`${this.Url}/car/${id}`);
  }

  getCarsByShopId(id: string) {
    return this.http.get<carModel[]>(`${this.Url}/car/shop/${id}`);
  }

  AddCar(car: any) {
    return this.http.post(`${this.Url}/car`, car);
  }

  getShop(UserID: string) {
    return this.http.get<shopModel>(`${this.Url}/shop/${UserID}`);
  }

  createShop(shop: shopModel) {
    return this.http.post(`${this.Url}/shop`, shop);
  }

}
