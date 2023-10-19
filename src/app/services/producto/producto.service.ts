import { Injectable, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private readonly afs = inject(AngularFirestore);
  getProducto(id:any) {
    return this.afs.collection('categorias').doc(id).collection('productos').valueChanges({ idField: 'id' })
  }
}
