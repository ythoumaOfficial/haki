import { Injectable } from '@angular/core';
import { APIService } from '../api/api.service';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    dialogData: any;

    constructor(private apiService: APIService) { }


    getDialogData() {
        return this.dialogData;
    }

    getUsers(pageNo: number = 1, pageSize: number = 30, searchKey: string = ""): Promise<any> {
        return new Promise(async (resolve) => {
            if (searchKey.length === 0) {
                const res = await this.apiService.get("users?pageno=" + pageNo + "&pagesize=" + pageSize);
                resolve(res);
            } else {
                const res = await this.apiService.get("users?searchKey=" + searchKey + "&pageno=" + pageNo + "&pagesize=" + pageSize);
                resolve(res);
            }
        });
    }

    getOneUsers(id) {
        return new Promise(async (resolve) => {
            const res = await this.apiService.get("users/"+id);
            resolve(res);
        });
    }

    addUsers(data) {
        return new Promise(async (resolve) => {
            const res = await this.apiService.post("users", data);
            resolve(res);
        });
    }

    updateUsers(data) {
        return new Promise(async (resolve) => {
            const res = await this.apiService.post("users", data);
            resolve(res);
        });
    }

    deleteUsers(id) {
        return new Promise(async (resolve) => {
            const res = await this.apiService.delete("users", {id});
            resolve(res);
        });
    }

}

