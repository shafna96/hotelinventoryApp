import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LoggerService {
  constructor() {}

  Log(msg: string) {
    // console.log(msg);
  }
}
