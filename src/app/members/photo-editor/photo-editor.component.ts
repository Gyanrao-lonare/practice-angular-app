import { Component, Input, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { take } from 'rxjs/operators';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css'],
})
export class PhotoEditorComponent implements OnInit {
  @Input() member: any;
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  hasAnotherDropZoneOver: boolean;
  response: string;
  baseUrl = environment.apiUrl;
  user: any;
  urls: any;
  constructor(private accountService: AccountService) {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((user) => (this.user = user));
  }

  ngOnInit(): void {
    this.initializeUploader();
  }
  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/id ',
      authToken: `Bearer` + this.user.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
    });

    this.uploader.onAfterAddingFile = (file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file._file);
      reader.onload = () => {
        this.urls = { url: reader.result };
        console.log(reader.result);
      };
      file.withCredentials = false;
    };
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const photo = JSON.parse(response);
        this.member.photos.push(photo);
      }
    };
  }

  updateMember() {
    if (this.urls) {
      if(this.member.photos){
      this.member.photos.push(this.urls);
      }else{
        this.member["photos"] = [];
        this.member.photos.push(this.urls);
      }
      this.uploader.uploadAll();
    }
    this.accountService.updateUser(this.member).subscribe((responce) => {
      if (responce) {
        this.urls = undefined;
      }
    });
  }
  setProfileImg(img) {
    this.member['photoUrl'] = img;
    this.accountService.setCurrentUser(this.member);
    this.updateMember();
  }
  deleteImage(i) {
    this.member.photos.splice(i, 1);
    this.updateMember();
  }
  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }
}
