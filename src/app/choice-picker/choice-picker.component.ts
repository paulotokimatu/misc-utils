import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-choice-picker',
  templateUrl: './choice-picker.component.html',
  styleUrls: ['./choice-picker.component.scss']
})
export class ChoicePickerComponent implements OnInit {
  users = [this.blankUser(), this.blankUser()];
  answers: string[] = [];
  isFinished = false;

  constructor() { }

  ngOnInit() {
  }

  onSendAnswer(user) {
    if(user.answer.trim()) {
      user.status = 'finished';
    } else {
      this.updateInputError(user);
    }
  }

  onReveal() {
    if(!this.areAllFieldsFilled()) {
      return;
    }
    this.formatAnswers();
    this.isFinished = true;
  }

  private areAllFieldsFilled() {
    let isValidForm = true;

    this.users.forEach(user => {
      if(user.status !== 'finished') {
        this.updateInputError(user);
        isValidForm = false;
      }
    });
    return isValidForm;
  }

  private formatAnswers() {
    this.users.forEach(user => {
      this.answers.push(user.answer);
    });
  }

  private updateInputError(user) {
    user.inputError = true;
  }

  onReset() {
    this.users = [this.blankUser(), this.blankUser()];
    this.answers = [];
    this.isFinished = false;
  }

  private blankUser() {
    return {
      answer: '',
      status: 'pending',
      inputError: false
    };
  }
}
