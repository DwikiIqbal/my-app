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

    async createFact(data) {
        const endpoint = 'http://localhost:4000/fact';
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        };
        const response = await fetch(endpoint, options);
        return response.json();
      };

    async deleteFact(id){
        return await http.del(`/fact/${id}`)
    }

    // async updateArtikel(id, data){
    //     return await http.del(`/artikel/${id}`, data)
    // }
}