import 'dotenv/config';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { User, userRepository } from '../../models/users';
import bcrypt from 'bcryptjs';


passport.use('password', new LocalStrategy({
    usernameField: "username",
    passwordField: "password",
    session: false
},(username, password, done)=> {
    const user = userRepository.findByUsername(username);
    if (user == undefined)
        return done(null, false); // El usuario no existe
    else if (!bcrypt.compareSync(password, user.password))
        return done(null, false); // No coincide la contraseña
    else
        return done(null, user);

}));

/** config de estrategia jwt de passport ******/
let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;
opts.algorithms = [process.env.JWT_ALGORITHM];

passport.use('token', new JwtStrategy(opts, (jwt_payload, done)=>{

    // Extraemos el id del campo sub del payload
    const user_id = jwt_payload.sub;

    // Buscamos el usuario por ID
    const user = userRepository.findById(user_id);
    if (user == undefined)
        return done(null, false); // No existe el usuario
    else
        return done(null, user);

}));


export default passport;