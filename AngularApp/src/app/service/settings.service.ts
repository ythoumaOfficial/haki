import { Injectable } from '@angular/core';
import { APIService } from '../api/api.service';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {
    dialogData: any;

    constructor(private apiService: APIService) { }


    getDialogData() {
        return this.dialogData;
    }

    getSettings(pageNo: number = 1, pageSize: number = 30, searchKey: string = ""): Promise<any> {
        return new Promise(async (resolve) => {
            if (searchKey.length === 0) {
                const res = await this.apiService.get("settings?pageno=" + pageNo + "&pagesize=" + pageSize);
                resolve(res);
            } else {
                const res = await this.apiService.get("settings?searchKey=" + searchKey + "&pageno=" + pageNo + "&pagesize=" + pageSize);
                resolve(res);
            }
        });
    }

    getOneSettings(id) {
        return new Promise(async (resolve) => {
            const res = await this.apiService.get("settings/"+id);
            resolve(res);
        });
    }

    addSettings(data) {
        return new Promise(async (resolve) => {
            const res = await this.apiService.post("settings", data);
            resolve(res);
        });
    }

    updateSettings(data) {
        return new Promise(async (resolve) => {
            const res = await this.apiService.put("settings", data);
            resolve(res);
        });
    }

    deleteSettings(id) {
        return new Promise(async (resolve) => {
            const res = await this.apiService.delete("settings", {id});
            resolve(res);
        });
    }

}

