import { Injectable, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private readonly afs = inject(AngularFirestore);
  getCategoria() {
    return this.afs.collection('categorias') .valueChanges({ idField: 'id' })
  }
}
