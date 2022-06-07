// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-modal-control',
//   templateUrl: './modal-control.component.html',
//   styleUrls: ['./modal-control.component.css']
// })
// export class ModalControlComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
import { ChangeDetectorRef, Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { combineLatest, Subscription } from 'rxjs';
 
 @Component({
   selector: 'app-modal-control',
   templateUrl: './modal-control.component.html',
   styleUrls: ['./modal-control.component.css']
 })
 export class ModalControlComponent implements OnInit {
  modalRef?: BsModalRef;
  subscriptions: Subscription[] = [];
  messages: string[] = [];
 @ViewChild("") appUserAddComponent:HTMLElement;
  constructor(private modalService: BsModalService, private changeDetection: ChangeDetectorRef) {
  }
   ngOnInit(): void {
   }
 
  openModal(template: TemplateRef<any>) {
    this.messages = [];
 
    this.modalRef = this.modalService.show(template);
    let _combine;
    if (this.modalRef?.onHide && this.modalRef?.onHidden) {
        _combine = combineLatest(
        this.modalRef.onHide,
        this.modalRef.onHidden
      ).subscribe(() => this.changeDetection.markForCheck());
    }
 
      if (this.modalRef?.onHide) {
        this.subscriptions.push(
          this.modalRef.onHide.subscribe((reason: string | any) => {
            if (typeof reason !== 'string') {
              reason = `onHide(), modalId is : ${reason.id}`;
            }
            const _reason = reason ? `, dismissed by ${reason}` : '';
            this.messages.push(`onHide event has been fired${_reason}`);
          })
        );
      }
 
      if  (this.modalRef?.onHidden) {
        this.subscriptions.push(
          this.modalRef.onHidden.subscribe((reason: string | any) => {
            if (typeof reason !== 'string') {
              reason = `onHide(), modalId is : ${reason.id}`;
            }
            const _reason = reason ? `, dismissed by ${reason}` : '';
            this.messages.push(`onHidden event has been fired${_reason}`);
            this.unsubscribe();
          })
        );
      }
 
      if (_combine) {
        this.subscriptions.push(_combine);
      }
  }
 
  unsubscribe() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
    this.subscriptions = [];
  }
}