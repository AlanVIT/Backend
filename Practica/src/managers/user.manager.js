import userModel from "../schemas/users.schema"

class userManager{

    userModel = userModel

    async getAllUsers() {
        try {
            const users = await this.userModel.find()
            return users
        } catch (error) {
            
        }
    }
    getaUserById(id){

    }
    createUser(body){

    }
    updateUser(id, body){

    }
    deleteUser(){

    }
}

export default userManager