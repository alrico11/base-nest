import { Injectable } from '@nestjs/common';
import admin from 'firebase-admin';
import { MulticastMessage } from 'firebase-admin/lib/messaging/messaging-api';

@Injectable()
export class FirebaseService {
  private admin: admin.app.App
  constructor() {
    this.admin = admin.initializeApp({ credential: admin.credential.cert(`${process.cwd()}/serviceAccount.json`) });
  }
  async sendNotification(multicastMessage: MulticastMessage) {
    const { tokens, android, data, notification } = multicastMessage
    const message: MulticastMessage = {
      tokens,
      notification,
      data,
      android: { priority: 'high', ...android }
    }
    await this.admin.messaging().sendEachForMulticast(message)
  }
  async verifyToken(idToken: string): Promise<admin.auth.DecodedIdToken> {
    const decodedToken = await this.admin.auth().verifyIdToken(idToken);
    return decodedToken;
  }
}
