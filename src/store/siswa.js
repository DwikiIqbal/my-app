import { http } from "@/utils/http";
import { action, makeAutoObservable, makeObservable, observable } from "mobx";

export class SiswaStore {
    ctx
    data = [];

    constructor(ctx) {
        makeObservable(this, {
            ctx: observable,
            data: observable,
            getSiswa: action
        });
        this.ctx = ctx
    }

    async getSiswa() {
        return await http.get('/siswa');
    }

}