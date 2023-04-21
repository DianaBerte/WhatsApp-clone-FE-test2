export interface IChats {
  _id: string;
  members: {
    _id: string;
    username: string;
    email: string;
    avatar: string;
  }[];
  messages: {
    _id: string;
    createdAt: string;
    sender: string;
    content: {
      text: string;
      media: string;
    };
  }[];
}
