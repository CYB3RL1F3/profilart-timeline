
import { Injectable } from '@nestjs/common';
import { config } from 'src/app.config';
import { AuthenticationPayload, AuthenticatedProfile } from 'src/types/profile.type';
import { RedisService } from 'nestjs-redis';

@Injectable()
export class AuthService {
  constructor(private readonly redisService: RedisService) {}

  async authenticate(payload: AuthenticationPayload) {
    const profile = await this.getProfile(payload.id); 
    if (
      profile && profile.uid == payload.id && 
      profile.token === payload.signature && 
      profile.email === payload.email
    ) {
      return profile;
    }
    return null;
  }

  async getProfile(id: string): Promise<AuthenticatedProfile> {
    const redisClient = this.redisService.getClient(config.redis.name);
    const profile = await new Promise<AuthenticatedProfile>(resolve =>
      redisClient.hget(config.redis.collection, id, (err, result) => {
        result && !err ? resolve(JSON.parse(result)) : resolve(null);
      }),
    );
    return profile;
  }
}
