import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { map } from 'rxjs/operators';
import { members } from '../_models/members';
import { AccountService } from '../_services/account.service';
import { MembersService } from '../_services/members.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
member : members;   
galleryOptions: NgxGalleryOptions[];
galleryImages: NgxGalleryImage[] = [];

  constructor(private memberService : MembersService , private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.loadMember();
    this.galleryOptions = [
      {
        width: '600px',
        height: '400px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];

    // this.galleryImages = [
    //   {
    //     small: 'https://random.imagecdn.app/500/150',
    //     medium: 'https://random.imagecdn.app/500/150',
    //     big: 'https://random.imagecdn.app/500/150'
    //   },
    //   {
    //     small: 'https://random.imagecdn.app/500/151',
    //     medium: 'https://random.imagecdn.app/500/151',
    //     big: 'https://random.imagecdn.app/500/151'
    //   },
    //   {
    //     small: 'https://random.imagecdn.app/500/152',
    //     medium: 'https://random.imagecdn.app/500/152',
    //     big: 'https://random.imagecdn.app/500/152'
    //   },
    //   {
    //     small: 'https://random.imagecdn.app/500/153',
    //     medium: 'https://random.imagecdn.app/500/153',
    //     big: 'https://random.imagecdn.app/500/153'
    //   },
    //   {
    //     small: 'https://random.imagecdn.app/500/154',
    //     medium: 'https://random.imagecdn.app/500/154',
    //     big: 'https://random.imagecdn.app/500/154'
    //   },
    //   {
    //     small: 'https://random.imagecdn.app/500/155',
    //     medium: 'https://random.imagecdn.app/500/155',
    //     big: 'https://random.imagecdn.app/500/155'
    //   },
    //   {
    //     small: 'https://random.imagecdn.app/500/156',
    //     medium: 'https://random.imagecdn.app/500/156',
    //     big: 'https://random.imagecdn.app/500/156'
    //   },
    //   {
    //     small: 'https://random.imagecdn.app/500/157',
    //     medium: 'https://random.imagecdn.app/500/157',
    //     big: 'https://random.imagecdn.app/500/157'
    //   },
    //   {
    //     small: 'https://random.imagecdn.app/500/158',
    //     medium: 'https://random.imagecdn.app/500/158',
    //     big: 'https://random.imagecdn.app/500/158'
    //   },
    // ];
  
  }
  imageGenrator(){
    
    this.member.photos.forEach(item=>{
      
      this.galleryImages.push({
        small: item.url,
        medium: item.url,
        big: item.url
      })
    })

    
  }
  loadMember(){
    this.memberService.getMember(this.route.snapshot.paramMap.get("username")).subscribe(member =>{
      if(member || member[0].username){
        this.member = member  
        this.imageGenrator();
        console.log(this.member);
      }
      
    })
  }

}
