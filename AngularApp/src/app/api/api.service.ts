import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import axios, { AxiosError } from 'axios';
import { environment } from '../../environments/environment';
@Injectable({
    providedIn: 'root'
})
export class APIService {

    constructor(private authService: AuthService) { }
    api() {
        return axios.create({
            baseURL: environment.serverURL + 'api/',
            headers: this.authService.getHeaders(),
        })
    }
    apiUpload() {
        return axios.create({
            baseURL: environment.serverURL + 'api/',
            headers: this.authService.getHeadersUpload(),
        })
    }
    get(url: string) {
        return new Promise(async (resolve) => {
            this.api().get(url).then((res: any) => {
                resolve(res.data);
            }).catch((error) => {
                if (axios.isAxiosError(error)) {
                    resolve((error as AxiosError).response.data);
                } else {
                    resolve({ code: 0, message: 'Some error occured' });
                }
            });
        });
    }
    post(url: string, data: any) {
        return new Promise(async (resolve) => {
            this.api().post(url, data).then((res: any) => {
                resolve(res.data);
            }).catch((error) => {
                if (axios.isAxiosError(error)) {
                    resolve((error as AxiosError).response.data);
                } else {
                    resolve({ code: 0, message: 'Some error occured' });
                }
            });
        });
    }
    upload(url: string, data: any) {
        return new Promise(async (resolve) => {
            this.apiUpload().post(url, data).then((res: any) => {
                resolve(res.data);
            }).catch((error) => {
                if (axios.isAxiosError(error)) {
                    resolve((error as AxiosError).response.data);
                } else {
                    resolve({ code: 0, message: 'Some error occured' });
                }
            });
        });
    }
    put(url: string, data: any) {
        return new Promise(async (resolve) => {
            this.api().put(url + "/" + data.id, data).then((res: any) => {
                resolve(res.data);
            }).catch((error) => {
                if (axios.isAxiosError(error)) {
                    resolve((error as AxiosError).response.data);
                } else {
                    resolve({ code: 0, message: 'Some error occured' });
                }
            });
        });
    }
    delete(url: string, data: any) {
        return new Promise(async (resolve) => {
            this.api().delete(url + "/" + data.id, data).then((res: any) => {
                resolve(res.data);
            }).catch((error) => {
                if (axios.isAxiosError(error)) {
                    resolve((error as AxiosError).response.data);
                } else {
                    resolve({ code: 0, message: 'Some error occured' });
                }
            });
        });
    }
}


