import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild, inject } from '@angular/core';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ProductoService } from 'src/app/services/producto/producto.service';

import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-tabla-categoria',
  templateUrl: './tabla-categoria.component.html',
  styleUrls: ['./tabla-categoria.component.scss']
})
export class TablaCategoriaComponent implements OnInit {
  private readonly _categoria = inject(CategoriaService);
  private readonly _producto = inject(ProductoService);
  private breakpointObserver = inject(BreakpointObserver);


  categorias: any;
  selectedcategoriaIndex: number = 0;
  select = 0;
  productsSelect: any;
  tiles: Tile[] = [
    { text: 'One', cols: 3, rows: 1, color: 'lightblue' },
    { text: 'Two', cols: 1, rows: 2, color: 'lightgreen' },
    { text: 'Three', cols: 1, rows: 1, color: 'lightpink' },
    { text: 'Four', cols: 2, rows: 1, color: '#DDBDF1' },
  ];

  ngOnInit(): void {
    this._categoria.getCategoria().subscribe(res => {
      this.categorias = res
      this.onChipSelected(this.categorias[this.select], this.select)
    })
  }



  onChipSelected(item: any, index: any) {
    this.productsSelect = []
    this.select = index;
    this._producto.getProducto(item.id).subscribe(res => {
      this.productsSelect = res
    })

  }


}