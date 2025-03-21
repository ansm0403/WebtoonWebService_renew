import NextAuth, { DefaultSession } from 'next-auth';
import { OAuthUser } from './user';

declare module 'next-auth' {
    interface Session {
        user : OAuthUser
    }
}