import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GeneralServicesService } from '../services/general-services.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  form: FormGroup;
  marcasList = [];
  modelosList = [];
  aniosList = [];
  infoTotal:any  = {};

  valorCOP;
  valorImpuestoPorc;
  valorImpuesto;
  constructor(private fb: FormBuilder, private services: GeneralServicesService,) { }

  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.form = this.fb.group({
      tipoVehiculo: [''],
      marca: [''],
      modelo: [''],
      anio: [''],
    });
  }
  seleccionarTipo(){
    this.services.getMarcas(this.form.value.tipoVehiculo).subscribe((response:any)=>{
      this.marcasList = response;
    });
  }
  seleccionarMarca(){
    this.services.getModelos(this.form.value.tipoVehiculo,this.form.value.marca).subscribe((response:any)=>{
      this.modelosList = response.modelos;
    });
  }
  seleccionarModelo(){
    this.services.getAnios(this.form.value.tipoVehiculo,this.form.value.marca,this.form.value.modelo).subscribe((response:any)=>{
      this.aniosList = response;
    });
  }
  seleccionarAnio(){
    this.services.getTotalInfo(this.form.value.tipoVehiculo,this.form.value.marca,this.form.value.modelo,this.form.value.anio).subscribe((response:any)=>{
      console.log(response);
      this.infoTotal = response;
    });
  }
  limpiar(){
    this.form.reset();
    this.infoTotal = {};
  }
  convertirAPesosCol(){
    let realesANumero = this.infoTotal.Valor;
    let tipoCombustible = this.infoTotal.SiglaCombustivel;
    realesANumero = realesANumero.split('R$ ');
    realesANumero = parseFloat(realesANumero[1]);
    realesANumero = realesANumero.toString();
    realesANumero = realesANumero.replaceAll('.','')
    realesANumero = parseInt(realesANumero)
    console.log(realesANumero);
    this.services.getConvertCurrencyList(realesANumero).subscribe((response:any)=>{
      this.valorCOP = realesANumero * response.data.COP.value.toFixed(2);
      if(tipoCombustible == 'E'){
        this.valorImpuestoPorc = 1;
        this.valorImpuesto = this.valorCOP * 0.01;
      }
      else if(tipoCombustible == 'D'){
        this.valorImpuestoPorc = 2.5;
        this.valorImpuesto = this.valorCOP * 0.025;
      }
      else{
        this.valorImpuestoPorc = 5;
        this.valorImpuesto = this.valorCOP * 0.05;
      }
    });
  }
}
