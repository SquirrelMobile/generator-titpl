export class User {
  constructor(obj) {
    this._id = obj._id;
    this.gender = obj.gender;
    this.lastname = obj.lastname;
    this.firstname = obj.firstname;
    this.email = obj.email;
    this.phone = obj.phone;
    this.createdAt = obj.createdAt;
    this.updatedAt = obj.updatedAt;
  }

  getFullName() {
    return this.firstname + " " + this.lastname;
  }

  getAvatar() {
    return this.gender === "f"
      ? "https://www.w3schools.com/howto/img_avatar2.png"
      : "https://www.w3schools.com/howto/img_avatar.png";
  }
}
