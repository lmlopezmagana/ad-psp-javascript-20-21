import { Router } from 'express';
import { PostController } from '../controllers/post';
import { token } from '../services/passport';

const router = Router();


// Aquí sería necesario añadir validación.
// Se deja a cargo del alumno la implementación

router.get('/', PostController.todosLosPosts);

router.get('/:id', PostController.unPostPorId);

router.post('/', 
    token(),
    PostController.crearNuevoPost);


export default router;
