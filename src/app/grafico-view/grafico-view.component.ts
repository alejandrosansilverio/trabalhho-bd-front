import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { api } from '../shared/config/api-config';
import { APIService } from '../shared/services/api/api.service';


@Component({
  selector: 'app-grafico-view',
  templateUrl: './grafico-view.component.html',
  styleUrls: ['./grafico-view.component.css']
})
export class GraficoViewComponent implements OnInit {

  title = 'Variação';
  type = 'CandlestickChart';
  data = [];
  columnNames = ['Date', 'Teste', 'B', 'C', 'D'];
  options = {
    candlestick: {
      fallingColor: { strokeWidth: 2, stroke: '#a52714' }, // red
      risingColor: { strokeWidth: 2, stroke: '#0f9d58' }   // green
    }
  };
  width = 900;
  height = 350;

  flagCarregaGrafico = false;
  corporations = [];
  dataSearch: FormGroup;
  simbolo
  periodo
  corporation;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loadForm()
    this.http.get("http://localhost:5000/corporations").subscribe((response: any) => {
      console.log(response)
      this.corporations = response.corporations
    })


  }


  loadForm() {
    this.dataSearch = new FormGroup({
      simbolo: new FormControl(null, Validators.required),
      periodo: new FormControl(null, Validators.required),
    });
  }


  stockDiario() {
    this.data = [];
    this.http.get("http://localhost:5000/stock-diario/"+ this.dataSearch.value.simbolo).subscribe((response: any) => {
      console.log(response)
      response.stoks.forEach((e) => {
        let array = [e.data, e.low, e.preco_abertura, e.preco_fechamento, e.high]
        this.data.push(array);
      })
      this.flagCarregaGrafico = true;
    })
  }

  stockMensal() {
    this.data = [];
    this.http.get("http://localhost:5000/stock-mensal/"+ this.dataSearch.value.simbolo).subscribe((response: any) => {
      console.log(response)
      response.stoks.forEach((e) => {
        let array = [e.data, e.low, e.preco_abertura, e.preco_fechamento, e.high]
        this.data.push(array);
      })
      this.flagCarregaGrafico = true;
    })
  }

  stockSemanal() {
    this.data = [];
    this.http.get("http://localhost:5000/stock-semanal/"+ this.dataSearch.value.simbolo).subscribe((response: any) => {
      console.log(response)
      response.stoks.forEach((e) => {
        let array = [e.data, e.low, e.preco_abertura, e.preco_fechamento, e.high]
        this.data.push(array);
      })
      this.flagCarregaGrafico = true;
    })
  }

  resolve() {
    this.flagCarregaGrafico = false;
    this.corporation = null;
    this.corporations.forEach((c)=>{
      if(this.dataSearch.value.simbolo==c.simbolo){
        this.corporation = c;
      }
    })
    this.columnNames[1] = this.dataSearch.value.simbolo
    if(this.dataSearch.value.periodo==0){//diário
      this.stockDiario();
    }else if(this.dataSearch.value.periodo==1){//semanal
      this.stockSemanal();
    }else{//mensal
      this.stockMensal();
    }
  }

  limparPesquisa(){
    this.flagCarregaGrafico = false;
    this.corporation = null;
    this.dataSearch.patchValue({
      simbolo: null,
      periodo: null
    })
  }

}
