import { http } from "@/utils/http";
import { action, makeAutoObservable, observable } from "mobx";
import Router from "next/router";

export class UserStore {
  
  ctx;
  data = [];

  constructor(ctx) {
    makeAutoObservable(this, {
      ctx: observable,
      data: observable,
      getUser: action,
      createUser: action,
    });
    this.ctx = ctx;
  }

  async getUser() {
    return await http.get('/user');
  }

  async userRegister(payload) {
    const response = await http.post('/auth/register', payload);
    if (response.status === 201) {
      // update data state
      this.data.push(response.body.data);
      localStorage.setItem("token", data.token)
     
    }
    return response;
  }
 
  async userLogin(payload) {
    const response = await http.post('/auth/login', payload);
    if (response.status === 201) {
        // update data state
        this.data.push(response.body.data);
      }
      return response;
  }

  async userRefresh(payload) {
    const response = await http.post('/auth/refresh', payload);
    if (response.status === 201) {
        // update data state
        this.data.push(response.body.data);
      }
      return response;
  }

}