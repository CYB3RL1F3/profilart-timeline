import { Document } from 'mongoose';

export interface Posts extends Document {
    readonly authorId: string;
    readonly title: string;
    readonly illustration: string;
    readonly content: string;
    readonly subtitle: string;
    readonly createdAt: Date;
}