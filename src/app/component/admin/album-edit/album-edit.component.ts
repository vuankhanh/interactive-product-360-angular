import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FileDragAndDropComponent } from '../../../shared/component/file-drag-and-drop/file-drag-and-drop.component';
import { IRequestParamsWithFiles } from '../../../shared/interface/request.interface';
import { AlbumService, DetailParams } from '../../../shared/service/api/admin/album.service';
import { TAlbumModel, TMediaModel } from '../../../shared/interface/album.interface';
import { map, Observable, of, Subscription, switchMap } from 'rxjs';
import { GalleryCustomThumbsComponent } from '../../../shared/component/gallery-custom-thumbs/gallery-custom-thumbs.component';
import { GalleryItemTemporarilyDeletedComponent } from '../../../shared/component/gallery-item-temporarily-deleted/gallery-item-temporarily-deleted.component';
import { MaterialModule } from '../../../shared/module/material';
import { SetBaseUrlPipe } from '../../../shared/pipe/set-base-url.pipe';
import { ActivatedRoute, Router } from '@angular/router';
import { IGalleryItem } from '../../../shared/interface/gallery.interface';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-album-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,

    FileDragAndDropComponent,
    GalleryCustomThumbsComponent,
    GalleryItemTemporarilyDeletedComponent,

    MaterialModule,
    SetBaseUrlPipe
  ],
  providers: [SetBaseUrlPipe],
  templateUrl: './album-edit.component.html',
  styleUrl: './album-edit.component.scss'
})
export class AlbumEditComponent implements OnInit, OnDestroy {
  @ViewChild(FileDragAndDropComponent) childComponentRef!: FileDragAndDropComponent;
  albumDetail?: TAlbumModel;

  mediaMIMETypes: Array<string> = ['image/png', 'image/jpeg', 'image/jpg', 'video/mp4'];
  galleryItems: IGalleryItem[] = [];
  galleryItemTemporarilyDeleted: IGalleryItem[] = [];
  galleryItemIndexChanged: Array<string> = [];

  nameControl: FormControl = new FormControl('', Validators.required);
  files: Array<File> = [];

  private subscription: Subscription = new Subscription();
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private albumService: AlbumService,
    private setBaseUrlPipe: SetBaseUrlPipe
  ) { }

  ngOnInit() {
    this.subscription.add(
      this.activatedRoute.queryParamMap.pipe(
        map(params => {
          const customerRoute = params.get('route');
          return customerRoute;
        }),
        switchMap(route => {
          if (!route) {
            return of(null);
          }
          const detailParams: DetailParams = { route: route as string };
          return this.albumService.getDetail(detailParams)
        })
      ).subscribe({
        next: res => {
          if (res) {
            this.albumDetail = res;
            console.log(this.albumDetail);
            
            this.initImages(this.albumDetail.media);
            this.nameControl.setValue(this.albumDetail.name);
          }
        },
        error: error => {
          this.goBackAlbumDetail();
        }
      })
    )
  }

  private initImages(medias: Array<TMediaModel>): Array<IGalleryItem> {
    this.galleryItems = medias.map(media => {
      const src = this.setBaseUrlPipe.transform(media.url);
      const thumbSrc = this.setBaseUrlPipe.transform(media.thumbnailUrl);
      const galleryItem: IGalleryItem = {
        _id: media._id!,
        src,
        thumbSrc,
        alt: media.alternateName,
        description: media.description,
        video: media.type === 'video' ? true : false
      }
      return galleryItem;
    });

    return this.galleryItems;
  }

  handleFilesUploaded(files: Array<File>): void {
    let api$: Observable<TAlbumModel>;
    if (this.albumDetail) {
      api$ = this.addNewFiles$(this.albumDetail.route, files);
    } else {
      this.nameControl.markAsTouched();
      if (this.nameControl.invalid) {
        return;
      }
      const name = this.nameControl.value;
      const params: IRequestParamsWithFiles = { name, files };
      api$ = this.create$(params);
    }

    this.subscription.add(
      api$.subscribe(res => {
        this.childComponentRef.resetForm();
        this.albumDetail = res;
        this.initImages(this.albumDetail.media);
        this.router.navigate(['admin/album-edit'], {
          queryParams: { route: this.albumDetail.route }
        });
      })
    )
  }

  private create$(params: IRequestParamsWithFiles) {
    return this.albumService.create(params.name, params.files);
  }

  private addNewFiles$(route: string, files: Array<File>) {
    return this.albumService.addNewFiles(route, files);
  }

  handleItemTemporaryDeletion(index: number): void {
    const item = this.galleryItems[index];
    this.galleryItemTemporarilyDeleted.push(item);
    this.galleryItems.splice(index, 1);
    this.galleryItems = [...this.galleryItems];
  }

  handleitemIndexChanged(galleryItems: Array<IGalleryItem>): void {
    this.galleryItemIndexChanged = galleryItems.map((item) => item._id)
  }

  onGalleryItemRestore(item: IGalleryItem): void {
    this.galleryItems = [...this.galleryItems, item];
  }

  update() {
    const filesWillRemove = this.galleryItemTemporarilyDeleted.map(item => item._id);
    const galleryItemIndexChanged = this.galleryItemIndexChanged;
    this.subscription.add(
      this.updateRequest(filesWillRemove, galleryItemIndexChanged).subscribe((mediaMetaData) => {
        this.albumDetail = mediaMetaData;
        this.galleryItemTemporarilyDeleted = [];
        this.galleryItemIndexChanged = [];
      })
    )

  }

  private updateRequest(filesWillRemove: Array<string>, galleryItemIndexChanged: Array<string>) {
    if (filesWillRemove.length > 0 && galleryItemIndexChanged.length > 0) {
      return this.updateRemoveFilesRequest(filesWillRemove).pipe(
        switchMap(() => this.updateItemIndexChangeRequest(galleryItemIndexChanged))
      )
    } else {
      if (filesWillRemove.length > 0) {
        return this.updateRemoveFilesRequest(filesWillRemove);
      }
      if (galleryItemIndexChanged.length > 0) {
        return this.updateItemIndexChangeRequest(galleryItemIndexChanged);
      }
      return new Observable<TAlbumModel>();
    }
  }

  private updateRemoveFilesRequest(filesWillRemove: Array<string>) {
    return this.albumService.removeFiles(this.albumDetail!.route, filesWillRemove);
  }

  private updateItemIndexChangeRequest(galleryItemIndexChanged: Array<string>) {
    return this.albumService.itemIndexChange(this.albumDetail!.route, galleryItemIndexChanged)
  }

  goBackAlbumDetail() {
    const commands = this.albumDetail ? ['admin/album', this.albumDetail.route] : ['admin/album'];
    this.router.navigate(commands);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
