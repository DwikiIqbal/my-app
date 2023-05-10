import { http } from "@/utils/http";
import { action, makeAutoObservable, makeObservable, observable } from "mobx";

export class UserStore {
    ctx
    data = [];

    constructor(ctx) {
        makeObservable(this, {
            ctx: observable,
            data: observable,
            getUser: action,
            createUser: action
        });
        this.ctx = ctx
    }

    async getUser() {
        return await http.get('/user');
    }

    async createUser(payload) {
        const response = await http.post('/user', payload);
        if (response.status === 201) {
            // update data state
            this.data.push(response.body.data);
        }
        return response;
    }
}