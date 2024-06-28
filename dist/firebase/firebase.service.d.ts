import admin from 'firebase-admin';
import { MulticastMessage } from 'firebase-admin/lib/messaging/messaging-api';
export declare class FirebaseService {
    private admin;
    constructor();
    sendNotification(multicastMessage: MulticastMessage): Promise<void>;
    verifyToken(idToken: string): Promise<admin.auth.DecodedIdToken>;
}
