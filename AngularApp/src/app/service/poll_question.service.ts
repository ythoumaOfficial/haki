import { Injectable } from '@angular/core';
import { APIService } from '../api/api.service';

@Injectable({
    providedIn: 'root'
})
export class Poll_QuestionService {
    dialogData: any;

    constructor(private apiService: APIService) { }


    getDialogData() {
        return this.dialogData;
    }

    getPoll_Question(pageNo: number = 1, pageSize: number = 30, searchKey: string = ""): Promise<any> {
        return new Promise(async (resolve) => {
            if (searchKey.length === 0) {
                const res = await this.apiService.get("poll_question?pageno=" + pageNo + "&pagesize=" + pageSize);
                resolve(res);
            } else {
                const res = await this.apiService.get("poll_question?searchKey=" + searchKey + "&pageno=" + pageNo + "&pagesize=" + pageSize);
                resolve(res);
            }
        });
    }

    getOnePoll_Question(id) {
        return new Promise(async (resolve) => {
            const res = await this.apiService.get("poll_question/"+id);
            resolve(res);
        });
    }

    addPoll_Question(data) {
        return new Promise(async (resolve) => {
            const res = await this.apiService.post("poll_question", data);
            resolve(res);
        });
    }

    updatePoll_Question(data) {
        return new Promise(async (resolve) => {
            const res = await this.apiService.post("poll_question", data);
            resolve(res);
        });
    }

    deletePoll_Question(id) {
        return new Promise(async (resolve) => {
            const res = await this.apiService.delete("poll_question", {id});
            resolve(res);
        });
    }

}

