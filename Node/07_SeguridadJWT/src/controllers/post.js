import { Post, postRepository } from '../models/posts';


export const PostController = {

    todosLosPosts: (req, res) => res.json(postRepository.findAll()),

    unPostPorId: (req, res) => {
        let post = postRepository.findById(req.params.id);
        if (post != undefined)
            res.json(post);
        else
            res.sendStatus(404);
    },


    crearNuevoPost: (req, res) => {
        // No hace falta que nos proporcionen el ID del usuario.
        // Lo tomamos directamente de la autenticación vía JWT
        let postCreado = postRepository.create(new Post(req.user.id, req.body.title, req.body.text));
        res.status(201).json(postCreado);
    }

}

