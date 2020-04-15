import { Document } from 'mongoose';

export interface Posts extends Document {
    readonly author_id: string;
    readonly title: string;
    readonly illustration: string;
    readonly content: string;
    readonly substitle: string;
    readonly created_at: Date;
}