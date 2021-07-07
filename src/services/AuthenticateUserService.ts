import { getCustomRepository } from "typeorm";

import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { UsersRepositories } from '../repositories/UsersRepositories';

interface IAuthRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {


    async execute({email, password}: IAuthRequest) {
        const usersRepositories = getCustomRepository(UsersRepositories)

        const user = await usersRepositories.findOne({
            email
        });

        if(!user) {
            throw new Error("Email/Password Incorrect")
        }

        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch) {
            throw new Error("Email/Password Incorrect")
        }

        const token = sign({
            email: user.email
        }, "e1ca2ccd37b03a57259695f780d9e90c", {
            subject: user.id,
            expiresIn: "1d",
        });

        return token;
    }
}

export { AuthenticateUserService };