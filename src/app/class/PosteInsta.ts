export class PosteInsta {
  id: number;
  message: string;
  date: Date;
  likes: number;
  clicked: boolean;
  location?: string;
  textColor: string;
  image: string;
  likeColor: string;
  userImage: string;
  userName: string;
  followers: number;
  likeType: string;
  saveType: string;
  comments: number;

  constructor(id: number, message: string, userName: string, location?: string) {
    this.id = id;
    this.message = makeHashtagsClickable(message);
    this.date = new Date();
    this.likes = Math.floor(Math.random() * 100);
    this.clicked = false;
    this.location = location;
    this.textColor = "black";
    this.image = "https://picsum.photos/450/450?random=" + this.id;
    this.userName = userName;
    this.userImage = "https://source.unsplash.com/50x50/?portrait?random=" + this.id;
    this.likeColor = "#000000";
    this.followers = Math.floor(Math.random() * 1000);
    this.likeType = "pnhskdva";
    this.saveType = "gigfpovs";
    this.comments = Math.floor(Math.random() * 50);
  }
}

function makeHashtagsClickable(text: string): string {
  return text.replace(
    /#(\w+)/g,
    '<span class="hashtags">#$1</span>'
  );
}
