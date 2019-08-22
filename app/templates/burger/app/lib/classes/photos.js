export class Photo {
  constructor(obj) {
    this.albumId = obj.albumId;
    this.id = obj.id;
    this.title = obj.title;
    this.url = obj.url;
    this.thumbnailUrl = obj.thumbnailUrl;
  }
}
