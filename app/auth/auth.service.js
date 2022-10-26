import User from "../users/User.js";
import bcrypt from 'bcryptjs';
import Role from "../roles/Role.js";
import {validationResult} from 'express-validator'
import jwt from "jsonwebtoken";

class AuthService {

    async login(userDto){

        const {email, password} = userDto;

        const user = await User.findOne({email}).exec();

        if(!user){
            throw new Error("Неправильные данные")
        }

        if(!await bcrypt.compare(password, user.password)) {
            throw new Error("Неправильный пароль")
        }
        return await jwt.sign({email: user.email},
            process.env.JWT_KEY,
            {
                expiresIn: "1h"
            });
    }
    async registration(userDto){

        const errors = validationResult(userDto)

        if(!errors.isEmpty()) {
            throw new Error("Ошибка при регистрации", errors)
        }

        const {email, password} = userDto;

        const candidate = await User.findOne({email});


        if(candidate){
            throw new Error('Пользователь с таким email уже существует')
        }

        const hashPassword = bcrypt.hashSync(password, 12);

        const userRole = await Role.findOne({value: "USER"});

        const user = new User({email, password: hashPassword, roles: [userRole.value]});
        await user.save()

        return user;
    }

}

export default new AuthService();
