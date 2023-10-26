class userDto {
  _id;
  name;
  email;
  constructor(user) {
    this.id = user._id;
    this.name = user.name;
    this.email = user.email;
  }
}
export default userDto;
