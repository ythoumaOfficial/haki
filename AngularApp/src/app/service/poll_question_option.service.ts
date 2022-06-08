import { Injectable } from '@angular/core';
import { APIService } from '../api/api.service';

@Injectable({
    providedIn: 'root'
})
export class Poll_Question_OptionService {
    dialogData: any;

    constructor(private apiService: APIService) { }


    getDialogData() {
        return this.dialogData;
    }

    getPoll_Question_Option(pageNo: number = 1, pageSize: number = 30, searchKey: string = ""): Promise<any> {
        return new Promise(async (resolve) => {
            if (searchKey.length === 0) {
                const res = await this.apiService.get("poll_question_option?pageno=" + pageNo + "&pagesize=" + pageSize);
                resolve(res);
            } else {
                const res = await this.apiService.get("poll_question_option?searchKey=" + searchKey + "&pageno=" + pageNo + "&pagesize=" + pageSize);
                resolve(res);
            }
        });
    }

    getOnePoll_Question_Option(id) {
        return new Promise(async (resolve) => {
            const res = await this.apiService.get("poll_question_option/"+id);
            resolve(res);
        });
    }

    addPoll_Question_Option(data) {
        return new Promise(async (resolve) => {
            const res = await this.apiService.post("poll_question_option", data);
            resolve(res);
        });
    }

    updatePoll_Question_Option(data) {
        return new Promise(async (resolve) => {
            const res = await this.apiService.post("poll_question_option", data);
            resolve(res);
        });
    }

    deletePoll_Question_Option(id) {
        return new Promise(async (resolve) => {
            const res = await this.apiService.delete("poll_question_option", {id});
            resolve(res);
        });
    }

}

