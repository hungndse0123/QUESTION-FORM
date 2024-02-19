import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private url = environment.question_url;
  constructor(
    private httpClient: HttpClient
  ) { }

  getQuestions() {
    return this.httpClient.get(this.url);
  }

  updateQuestions(data: any) {
    return this.httpClient.post(this.url, data);
  }
}
