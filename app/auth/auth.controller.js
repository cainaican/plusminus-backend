import authService from "./auth.service.js";

class AuthController {
    async login(req, res){
        try{
            const token = await authService.login(req.body)
            if(!token){
                throw new Error('User not found')
            }

            res.cookie("jwt", token, {httpOnly: true}).json(token)
        } catch (e){
            res.status(400).json({message: e.message});
        }
    }

    async registration(req, res){
        try{
            const user = await authService.registration(req.body)
            res.json(user)
        } catch (e){
            res.status(400).json({message: e.message});
        }
    }
}

export default new AuthController()
