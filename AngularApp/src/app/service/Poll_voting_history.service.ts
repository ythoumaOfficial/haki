import { Injectable } from '@angular/core';
import { APIService } from '../api/api.service';

@Injectable({
    providedIn: 'root'
})
export class Poll_Voting_HistoryService {
    dialogData: any;

    constructor(private apiService: APIService) { }


    getDialogData() {
        return this.dialogData;
    }

    getPoll_Voting_History(pageNo: number = 1, pageSize: number = 30, searchKey: string = ""): Promise<any> {
        return new Promise(async (resolve) => {
            if (searchKey.length === 0) {
                const res = await this.apiService.get("Poll_voting_history?pageno=" + pageNo + "&pagesize=" + pageSize);
                resolve(res);
            } else {
                const res = await this.apiService.get("Poll_voting_history?searchKey=" + searchKey + "&pageno=" + pageNo + "&pagesize=" + pageSize);
                resolve(res);
            }
        });
    }

    getOnePoll_Voting_History(id) {
        return new Promise(async (resolve) => {
            const res = await this.apiService.get("Poll_voting_history/"+id);
            resolve(res);
        });
    }

    addPoll_Voting_History(data) {
        return new Promise(async (resolve) => {
            const res = await this.apiService.post("Poll_voting_history", data);
            resolve(res);
        });
    }

    updatePoll_Voting_History(data) {
        return new Promise(async (resolve) => {
            const res = await this.apiService.put("Poll_voting_history", data);
            resolve(res);
        });
    }

    deletePoll_Voting_History(id) {
        return new Promise(async (resolve) => {
            const res = await this.apiService.delete("Poll_voting_history", {id});
            resolve(res);
        });
    }

}

