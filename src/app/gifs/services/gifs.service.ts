import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private apiKey: string = '23CPcWRz5ydyaNwf8xcpodS9CehIW1Kq';
  private _historial: string[] = [];

  get historial() {
    return [...this._historial]; //...this._historial rompe la referencia, para prevenir que el objeto original nunca pueda ser modificado
  }

  constructor(private http: HttpClient) {}

  buscarGifs(query: string) {
    query = query.trim().toLocaleLowerCase();
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
    }
    console.log(this._historial);

    this.http
      .get(
        'https://api.giphy.com/v1/gifs/search?api_key=23CPcWRz5ydyaNwf8xcpodS9CehIW1Kq&q=dbz&limit=10'
      )
      .subscribe((resp) => {
        console.log(resp);
      });
  }
}
