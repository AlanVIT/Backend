import usersModel from "../../dao/models/users.model.js";

export default class UsersManager {
    usersModel;

    constructor() {
        this.usersModel = usersModel;
    }

    async getAllUsers() {
        try {
            const users = await this.usersModel.find({});

            return users;
        } catch (error) {
            console.log(
                "🚀 ~ file: users.manager.js:18 ~ UsersManager ~ getAllUsers ~ error:",
                error
            );
        }
    }

    async getUserByEmail(email) {
        try {
            const userData = await this.usersModel.findOne({ email });

            return userData;
        } catch (error) {
            console.log(
                "🚀 ~ file: users.manager.js:30 ~ UsersManager ~ getUserByEmail ~ error:",
                error
            );
        }
    }

    async getUserById(id) {
        try {
            const userData = await this.usersModel.findOne({ _id: id });

            return userData;
        } catch (error) {
            console.log(
                "🚀 ~ file: users.manager.js:30 ~ UsersManager ~ getUserById ~ error:",
                error
            );
        }
    }

    async toggleUserRole(user) {
        try {
            const newRole = user.role === "premium" ? "user" : "premium";
            return await user.updateOne({ role: newRole });
        } catch (error) {
            console.log(
                "🚀 ~ file: users.manager.js:44 ~ UsersManager ~ toggleUserRole ~ error:",
                error
            );
        }
    }

    async setLastConnection(user) {
        try {
            return await user.updateOne({ last_connection: new Date() });
        } catch (error) {
            console.log(
                "🚀 ~ file: users.manager.js:44 ~ UsersManager ~ toggleUserRole ~ error:",
                error
            );
        }
    }
    async DosDias(fecha) {
        var fechaActual = new Date();
        var last_connection = new Date(fecha);
        last_connection.setDate(last_connection.getDate() + 2);
        if (fechaActual >= fechaDosDiasDespues) {
          return true
        } else {
          return false
        }
      }
    async deleteUsers() {
        try {
            const users = await this.usersModel.find({});
            return users.forEach(user=>{
                if(this.DosDias(user.last_connection)){
                    this.usersModel.deleteOne(user)
                }
            });
        } catch (error) {
            console.log(
                "🚀 ~ file: users.manager.js:44 ~ UsersManager ~ toggleUserRole ~ error:",
                error
            );
        }
    }
}