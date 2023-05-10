import {enableStaticRendering} from 'mobx-react-lite';
import { SiswaStore } from './siswa';
import { TokoStore } from './toko';
import { ArtikelStore } from './artikel';
import { FactStore } from './fact';
enableStaticRendering(typeof window === 'undefined')

let store;

export class Store {
    siswa = new SiswaStore(this)
    toko = new TokoStore(this) 
    artikel = new ArtikelStore(this)
    fact = new FactStore(this)
 
    constructor() {}

    hydrate = (data) => {
        if (!data) {}
    }

    
}

