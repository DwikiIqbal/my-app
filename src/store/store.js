import {enableStaticRendering} from 'mobx-react-lite';
import { ArtikelStore } from './artikel';
import { FactStore } from './fact';
import { UserStore } from './user';
enableStaticRendering(typeof window === 'undefined')

let store;

export class Store {
    artikel = new ArtikelStore(this)
    fact = new FactStore(this)
    user = new UserStore(this)
 
    constructor() {}

    hydrate = (data) => {
        if (!data) {}
    }

    
}

