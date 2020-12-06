import 'dotenv/config';
import { User, userRepository } from '../models/users';
import bcrypt from 'bcryptjs';



const AuthController = {

    register: (req, res, next) => {
        // ¿Realmente este método es necesario, o podríamos modificar la petición POST en /users?
        // Mantendremos solamente esta versión, que estará más actualizada
        
        // La comprobación de si el username o el email ya existe la realiza la validación
        // No es necesario hacer nada más aquí.


        let usuarioCreado = userRepository.create(
            new User(req.body.username, req.body.email, 
                        bcrypt.hashSync(req.body.password, parseInt(process.env.BCRYPT_ROUNDS))));

        // Devolvemos todos los datos del usuario menos la contraseña                
        res.status(201).json({
            id: usuarioCreado.id,
            username: usuarioCreado.username,
            email: usuarioCreado.email
        });
    },
    login: (req, res, next) => {

    }


}

export {
    AuthController
}