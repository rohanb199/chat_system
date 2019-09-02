export class Conversation {
  id: string;
  conversationType: string;
  conversationName: string;
  createdBy: string;
  createdAt: string;
  participants: string | Participants | any;
}

export class Participants {
  id: string;
  fullName: string;
}
