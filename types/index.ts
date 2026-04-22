export interface User {
  id: string
  username: string
  email: string
  firstName: string
  lastName: string
  bio?: string
  profilePicture?: string
  coverPicture?: string
  followers: string[]
  following: string[]
  createdAt: string
  updatedAt: string
}

export interface AuthResponse {
  accessToken: string
  refreshToken: string
  user: User
}

export interface Post {
  id: string
  userId: string
  user: User
  content: string
  image?: string
  likes: string[]
  comments: Comment[]
  createdAt: string
  updatedAt: string
}

export interface Comment {
  id: string
  postId: string
  userId: string
  user: User
  text: string
  likes: string[]
  createdAt: string
  updatedAt: string
}

export interface Message {
  id: string
  conversationId: string
  senderId: string
  sender: User
  text: string
  image?: string
  readBy: string[]
  createdAt: string
  updatedAt: string
}

export interface Conversation {
  id: string
  participants: User[]
  messages: Message[]
  lastMessage?: Message
  lastMessageTime?: string
  unreadCount: number
  createdAt: string
  updatedAt: string
}

export interface APIResponse<T> {
  success: boolean
  data: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  cursor: string
  hasMore: boolean
  total: number
}

export interface AuthState {
  user: User | null
  accessToken: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}

export interface PostState {
  posts: Post[]
  cursor: string | null
  hasMore: boolean
  loading: boolean
  error: string | null
  selectedPost: Post | null
}

export interface ChatState {
  conversations: Conversation[]
  activeConversation: Conversation | null
  messages: Message[]
  onlineUsers: string[]
  typing: Record<string, boolean>
  loading: boolean
  error: string | null
}

export interface UIState {
  sidebarOpen: boolean
  createPostModalOpen: boolean
  searchQuery: string
  notifications: Notification[]
}

export interface Notification {
  id: string
  type: 'success' | 'error' | 'info' | 'warning'
  message: string
  duration?: number
  timestamp: number
}

export interface SocketEvents {
  'user:online': { userId: string }
  'user:offline': { userId: string }
  'message:new': Message
  'message:read': { messageId: string; userId: string }
  'typing:start': { conversationId: string; userId: string }
  'typing:stop': { conversationId: string; userId: string }
  'post:like': { postId: string; userId: string }
  'post:new': Post
  'post:delete': { postId: string }
}
