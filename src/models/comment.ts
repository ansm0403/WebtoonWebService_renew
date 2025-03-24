
export interface Comment {
    id : string
    author : CommentUser,
    createdAt : Date
    body : string,
    webtoon : CommentWebtoon
}

interface CommentUser {
    id : string
    name : string
    image : string
    username : string
}

interface CommentWebtoon {
    id : string
    title : string
}