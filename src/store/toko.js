import { http } from "@/utils/http";
import { action, makeAutoObservable, makeObservable, observable } from "mobx";

export class TokoStore {
    ctx
    data = [];

    constructor(ctx) {
        makeObservable(this, {
            ctx: observable,
            data: observable,
            getToko: action,
            createToko: action
        });
        this.ctx = ctx
    }

    async getToko() {
        return await http.get('/toko');
    }

    async createToko(payload) {
        const response = await http.post('/toko', payload);
        if (response.status === 201) {
            // update data state
            this.data.push(response.body.data);
        }
        return response;
    }
}