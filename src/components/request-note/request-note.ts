import { Component, Output, Input, EventEmitter } from '@angular/core';

/**
 * Generated class for the RequestNoteComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'request-note',
  templateUrl: 'request-note.html'
})
export class RequestNoteComponent {
  @Input() isPickupRequested:boolean;
  @Input() isNoteSent:boolean;
  @Output() newNote : EventEmitter<any> = new EventEmitter();
  public enteredNote:string;
  public enteredPhone:string;

  constructor() {
    this.enteredNote = "";
    this.enteredPhone = "";
  }

  onSubmit() {
    console.log(this.checkValidPhone(this.enteredPhone) )
    if(this.checkValidPhone(this.enteredPhone) && this.enteredNote != "") {
      this.newNote.next({note: this.enteredNote, phone: this.enteredPhone});
    }
  }

  private checkValidPhone(phone:string) {
    let regExp = /^[0-9]{9}$/;
    if (!regExp.test(phone)) {
      return true
    }
    return false;
  }
}
