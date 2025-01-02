import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../shared/module/material';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AlbumService, DetailParams } from '../../../shared/service/api/admin/album.service';
import { filter, map, Observable, Subscription, switchMap, tap } from 'rxjs';
import { GalleryCustomThumbsComponent } from '../../../shared/component/gallery-custom-thumbs/gallery-custom-thumbs.component';
import { GalleryItemTemporarilyDeletedComponent } from '../../../shared/component/gallery-item-temporarily-deleted/gallery-item-temporarily-deleted.component';
import { ConfirmComponent } from '../../../shared/component/dialog/confirm/confirm.component';
import { FileDragAndDropComponent } from '../../../shared/component/file-drag-and-drop/file-drag-and-drop.component';
import { GalleryComponent } from '@daelmaak/ngx-gallery';
import { SetBaseUrlPipe } from '../../../shared/pipe/set-base-url.pipe';
import { TAlbumModel, TMediaModel } from '../../../shared/interface/album.interface';
import { IGalleryItem } from '../../../shared/interface/gallery.interface';
import { TConfirmDialogData } from '../../../shared/interface/confirm_dialog.interface';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-album-detail',
  standalone: true,
  imports: [
    CommonModule,

    GalleryComponent,

    MaterialModule,
    SetBaseUrlPipe
  ],
  providers: [SetBaseUrlPipe],
  templateUrl: './album-detail.component.html',
  styleUrl: './album-detail.component.scss'
})
export class AlbumDetailComponent implements OnInit, OnDestroy {
  @ViewChild(FileDragAndDropComponent) childComponentRef!: FileDragAndDropComponent;
  albumDetail?: TAlbumModel;
  galleryItems: IGalleryItem[] = [];

  private subscription: Subscription = new Subscription();
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private albumService: AlbumService,
    private setBaseUrlPipe: SetBaseUrlPipe
  ) {

  }

  ngOnInit() {
    let albumDetail$ = this.activatedRoute.params.pipe(
      map(params => {
        const detailParams: DetailParams = {route: params['route'] as string};
        return detailParams
      }),
      switchMap(detailParams => this.albumService.getDetail(detailParams))
    );

    this.subscription.add(
      albumDetail$.subscribe({
        next: res => {
          this.albumDetail = res;
          this.initImages(this.albumDetail.media)
        },
        error: error => {
          this.goBackAlbumList();
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

  edit(){
    this.router.navigate(['admin/album-edit'], {
      queryParams: {
        route: this.albumDetail?.route
      }
    });
  }

  remove(){
    const dialogData: TConfirmDialogData = {
      title: 'Xóa Album',
      message: 'Bạn có chắc chắn muốn xóa album này?',
      confirmText: 'Xóa',
      cancelText: 'Hủy',
    }

    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: dialogData
    });

    dialogRef.afterClosed().pipe(
      filter(result => result),
      switchMap(() => this.albumService.delete(this.albumDetail!._id))
    ).subscribe({
      next: res => {
        this.goBackAlbumList();
      },
      error: error => {
        console.error(error);
      }
    });
  }

  downloadGif(){
    this.subscription.add(
      this.albumService.getGif(this.albumDetail!._id).subscribe(res=>{
        console.log(res);
        
        const buffer = new Uint8Array(res.metaData.data);
        const data = new Blob([buffer]);
        saveAs(data, `${this.albumDetail?.name}.gif`);
        
      })
    )
  }

  goBackAlbumList() {
    this.router.navigate(['admin/album']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
