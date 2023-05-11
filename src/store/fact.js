import { http } from "@/utils/http";
import { action, makeAutoObservable, makeObservable, observable } from "mobx";

export class FactStore {
    ctx
    data = [];

    constructor(ctx) {
        makeObservable(this, {
            ctx: observable,
            data: observable,
            getFact: action,
            getFactById: action,
            createFact: action
        });
        this.ctx = ctx
    }

    async getFact() {
        return await http.get('/fact');
    }

    async getFactById(id) {
        return await http.get(`/fact/${id}`)
    }

    async createFact(data){
        return await http.post('/fact', data)
    }

    // async deleteArtikel(id){
    //     return await http.del(`/artikel/${id}`)
    // }

    // async updateArtikel(id, data){
    //     return await http.del(`/artikel/${id}`, data)
    // }
}