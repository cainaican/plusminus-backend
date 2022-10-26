import User from "./User.js";
import jwt from "jsonwebtoken";

class UserService {

    async create(userDto){
        const user = await User.create(userDto);
        return user;
    }

    async getAll(){
        const user = await User.find();
        return user;
    }
	
    async getOne(email){
        const user = await User.findOne({email});
        return user;
    }
    
    async update(id, userDto){
        const user = await User.findByIdAndUpdate(id, userDto, {new: true});
        return user;
    }

    async delete(id){
        const user = await User.findByIdAndDelete(id);
        return user;
    }

    async deleteAll(){
        const user = await User.deleteMany({email: /m*/});
        return user;
    }
}

export default new UserService()
