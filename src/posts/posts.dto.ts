export class CreatePostsDTO {
    authorId: string;
    readonly title: string;
    readonly illustration: string;
    readonly content: string;
    readonly subtitle: string;
    readonly createdAt: Date;
    readonly published: boolean;
}
export class UpdatePostDTO {
    readonly title?: string;
    readonly illustration?: string;
    readonly content?: string;
    readonly subtitle?: string;
    readonly updatedAt: Date;
    readonly published: boolean;
}