import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';

@Injectable({
    providedIn: 'root'
})
export class categoriaResolve implements Resolve<any>
{
    private readonly _categoria = inject(CategoriaService)
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> {
        return this._categoria.getCategoria();
    }
}



        





