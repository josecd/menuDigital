import { Injectable, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private readonly afs = inject(AngularFirestore);
  getProduct(id: any) {
    return this.afs.collection('categorias').doc(id).collection('productos').valueChanges({ idField: 'id' })
  }
  addProduct(catID: any, nombre: string, precio: any) {
    const userRef = this.afs.collection('categorias').doc(catID);
    return userRef.collection('productos').add({
      nombre: nombre,
      precio: precio
    });
  }
  deleteProduct(catID: any, prodId: any) {
    const userRef = this.afs.collection('categorias').doc(catID);
    return userRef.collection('productos').doc(prodId).delete()
  }

  update(catID: any, prodId: any, nombre: any, precio: any) {
    const userRef = this.afs.collection('categorias').doc(catID);
    return userRef.collection('productos').doc(prodId).update({
      nombre: nombre,
      precio: precio
    })
  }

}
