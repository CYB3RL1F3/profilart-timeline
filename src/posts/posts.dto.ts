export class CreatePostsDTO {
    authorId: string;
    readonly title: string;
    readonly illustration: string;
    readonly content: string;
    readonly substitle: string;
    readonly createdAt: Date;
}
export class UpdatePostDTO {
    readonly title?: string;
    readonly illustration?: string;
    readonly content?: string;
    readonly substitle?: string;
}