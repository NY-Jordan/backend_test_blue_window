import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';
import moment, { now } from 'moment';


export const createUserToken = (user : User) : string => {
    const expiration_date = moment().add(1, 'day').toDate();
    const token = jwt.sign(
        { userId: user.id, expiration_date : expiration_date },
        process.env.JWT_SECRET as string, 
        { expiresIn: '1d' } 
      );
    return token 
}