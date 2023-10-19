import { Component, OnInit, inject } from '@angular/core';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { ProductoService } from 'src/app/services/producto/producto.service';


import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

import Swal from 'sweetalert2'


@Component({
  selector: 'app-tabla-categoria',
  templateUrl: './tabla-categoria.component.html',
  styleUrls: ['./tabla-categoria.component.scss']
})
export class TablaCategoriaComponent implements OnInit {
  private readonly _categoria = inject(CategoriaService);
  private readonly _producto = inject(ProductoService);

  categorias: any;
  selectedcategoriaIndex: number = 0;
  select = 0;
  productsSelect: any;


  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value = 50;

  loading = true;
  ngOnInit(): void {
    this._categoria.getCategoria().subscribe(res => {
      this.categorias = res
      this.onChipSelected(this.categorias[this.select], this.select)
      this.loading = false

    })
  }

  onChipSelected(item: any, index: any) {
    this.productsSelect = []
    this.select = index;
    this._producto.getProduct(item.id).subscribe(res => {
      this.productsSelect = res
    })
  }



  agregarCategorias() {
    Swal.fire({
      title: 'Ingresa información',
      html:
        '<input id="input1" class="swal2-input" placeholder="Nombre">',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        const input1 = (document.getElementById('input1') as HTMLInputElement).value;
        this._categoria.add(input1).then(res => {
          Swal.fire({
            icon: 'success',
            title: 'Categoria agregada',
          })
        }).catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
          })
        })
      }
    });
  }


  agregarProducto() {
    Swal.fire({
      title: 'Ingresa información',
      html:
        '<input id="input1" class="swal2-input" placeholder="Nombre">' +
        '<input id="input2" class="swal2-input" placeholder="Precio" type="number">',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        const input1 = (document.getElementById('input1') as HTMLInputElement).value;
        const input2 = (document.getElementById('input2') as HTMLInputElement).value;
        this._producto.addProduct(this.categorias[this.select].id, input1, input2).then(res => {
          Swal.fire({
            icon: 'success',
            title: 'Producto agregado',
          })
        }).catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
          })
        })
      }
    });
  }

  deleteProduct(item: any) {
    this._producto.deleteProduct(this.categorias[this.select].id, item.id)
      .then(res => {
        Swal.fire({
          icon: 'success',
          title: 'Producto eliminado',
        })
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
        })
      })
  }

  editarProducto(item: any) {

    Swal.fire({
      title: 'Ingresa información',
      html: `
        <input id="input1" class="swal2-input" placeholder="Campo 1" value="${item.nombre}">
        <input id="input2" class="swal2-input" placeholder="Campo 2" type="number" value="${item.precio}">
      `,
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const input1 = (document.getElementById('input1') as HTMLInputElement).value;
        const input2 = (document.getElementById('input2') as HTMLInputElement).value;
        return {
          input1: input1,
          input2: input2
        };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this._producto.update(this.categorias[this.select].id, item.id, result.value.input1, result.value.input2)
          .then(res => {
            Swal.fire({
              icon: 'success',
              title: 'Producto eliminado',
            })
          })
          .catch(res => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
            })
          })
      }
    });
  }
}