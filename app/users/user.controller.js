import userService from "./user.service.js";
import jwt from "jsonwebtoken";

class UserController {

    async create(req, res){
        try {
            const user = await userService.create(req.body)
            res.json(user)
        } catch(e){
            res.status(500).json(e)
        }
    }

    async getAll(req, res){
        try {
            const user = await userService.getAll()
            res.json(user)
        } catch (e){
            res.status(500).json(e);
        }
    }
	
    async getOne(req, res){
        try{
            const token = jwt.decode(req.headers['x-access-token'])
            const user = await userService.getOne(token.email)
            if(!user){
                throw new Error('User not found');
            }
            res.json(user)
        } catch (e){
            res.status(500).json(e);
        }
    }
    
    async update(req, res){
        try{
            const user = await userService.update( req.params.id, req.body)
            res.json(user)
        } catch (e){
            res.status(500).json(e);
        }
    }

    async delete(req, res){
        try{
            const user = await userService.delete(req.params.id)
            res.json(user)
        } catch (e){
            res.status(500).json(e);
        }
    }

    async deleteAll(req, res){
        try{
            const user = await userService.deleteAll()
            res.json(user)
        } catch (e){
            res.status(500).json(e);
        }
    }
}

export default new UserController()
