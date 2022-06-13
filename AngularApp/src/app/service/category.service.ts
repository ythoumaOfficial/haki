import { Injectable } from '@angular/core';
import { APIService } from '../api/api.service';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    dialogData: any;

    constructor(private apiService: APIService) { }


    getDialogData() {
        return this.dialogData;
    }

    getCategory(pageNo: number = 1, pageSize: number = 30, searchKey: string = ""): Promise<any> {
        return new Promise(async (resolve) => {
            if (searchKey.length === 0) {
                const res = await this.apiService.get("category?pageno=" + pageNo + "&pagesize=" + pageSize);
                resolve(res);
            } else {
                const res = await this.apiService.get("category?searchKey=" + searchKey + "&pageno=" + pageNo + "&pagesize=" + pageSize);
                resolve(res);
            }
        });
    }

    getOneCategory(id) {
        return new Promise(async (resolve) => {
            const res = await this.apiService.get("category/"+id);
            resolve(res);
        });
    }

    addCategory(data) {
        return new Promise(async (resolve) => {
            const res = await this.apiService.post("category", data);
            resolve(res);
        });
    }

    updateCategory(data) {
        return new Promise(async (resolve) => {
            const res = await this.apiService.put("category", data);
            resolve(res);
        });
    }

    deleteCategory(id) {
        return new Promise(async (resolve) => {
            const res = await this.apiService.delete("category", {id});
            resolve(res);
        });
    }

}

