import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import * as process from 'process';
import { AppConfigService } from '../config/app/config.service';
@Injectable()
export class UtilsService {
  private algorithm = process.env.ALGORITHM_ENCRYPTION;
  private key = process.env.ALGORITHM_KEY; // Replace with your secret key
  private iv = crypto.randomBytes(16);
  constructor(private readonly appService: AppConfigService) {}

  public encrypt(data: number): string {
    const dataString = data.toString();
    const cipher = crypto.createCipheriv(
      this.algorithm,
      Buffer.from(this.key),
      this.iv,
    );
    let encrypted = cipher.update(dataString, 'utf-8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }

  /**
   *
   * @param encryptedData
   */
  public decrypt(encryptedData: string): number {
    const decipher = crypto.createDecipheriv(
      this.algorithm,
      Buffer.from(this.key),
      this.iv,
    );
    let decrypted = decipher.update(encryptedData, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    return parseInt(decrypted, 10);
  }

  /**
   *
   * @param passwordToBeHashed
   */
  public async hashPassword(passwordToBeHashed: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.appService.saltOrRounds); // this enables unique salt per User
    return await bcrypt.hash(passwordToBeHashed, salt);
  }

  /**
   *
   * @param pwd
   * @param hashedPwd
   */
  async compareHashedValue(pwd: string, hashedPwd: string): Promise<boolean> {
    return await bcrypt.compare(pwd, hashedPwd);
  }

  /**
   *
   * @param length
   */
  generateRandomString(length: number = 20): string {
    let result = '';
    const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz123456789';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  generateNumber(totalNumber: number = 4): string {
    // Declare a digits variable
    // which stores all digits
    const digits = '0123456789';
    let number = '';

    for (let i = 0; i < totalNumber; i++ ) {
      number += digits[Math.floor(Math.random() * 10)];
    }

    return number;
  }
}
