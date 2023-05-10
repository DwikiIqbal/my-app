import { http } from "@/utils/http";
import { action, makeAutoObservable, makeObservable, observable } from "mobx";

export class ArtikelStore {
    ctx
    data = [];

    constructor(ctx) {
        makeObservable(this, {
            ctx: observable,
            data: observable,
            getArtikel: action,
            getArtikelById: action,
            createArtikel: action
        });
        this.ctx = ctx
    }

    async getArtikel() {
        return await http.get('/artikel');
    }

    async getArtikelById(id) {
        return await http.get(`/artikel/${id}`)
    }

    async createArtikel(data){
        return await http.post('/artikel', data)
    }

    async deleteArtikel(id){
        return await http.del(`/artikel/${id}`)
    }

    async updateArtikel(id, data){
        return await http.del(`/artikel/${id}`, data)
    }
}