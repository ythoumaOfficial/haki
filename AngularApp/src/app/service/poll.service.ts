import { Injectable } from '@angular/core';
import { APIService } from '../api/api.service';

@Injectable({
    providedIn: 'root'
})
export class PollService {
    dialogData: any;

    constructor(private apiService: APIService) { }


    getDialogData() {
        return this.dialogData;
    }

    getPoll(pageNo: number = 1, pageSize: number = 30, searchKey: string = ""): Promise<any> {
        return new Promise(async (resolve) => {
            if (searchKey.length === 0) {
                const res = await this.apiService.get("poll?pageno=" + pageNo + "&pagesize=" + pageSize);
                resolve(res);
            } else {
                const res = await this.apiService.get("poll?searchKey=" + searchKey + "&pageno=" + pageNo + "&pagesize=" + pageSize);
                resolve(res);
            }
        });
    }

    getOnePoll(id) {
        return new Promise(async (resolve) => {
            const res = await this.apiService.get("poll/"+id);
            resolve(res);
        });
    }

    addPoll(data) {
        return new Promise(async (resolve) => {
            const res = await this.apiService.post("poll", data);
            resolve(res);
        });
    }

    updatePoll(data) {
        return new Promise(async (resolve) => {
            const res = await this.apiService.post("poll", data);
            resolve(res);
        });
    }

    deletePoll(id) {
        return new Promise(async (resolve) => {
            const res = await this.apiService.delete("poll", {id});
            resolve(res);
        });
    }

}

