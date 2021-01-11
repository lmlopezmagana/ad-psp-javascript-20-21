import { Router } from 'express';
import { PeliculaController } from '../controllers/pelicula';

const router = Router();

router.get('/', PeliculaController.todasLasPeliculas);

router.get('/:id', PeliculaController.peliculaPorId);

router.post('/', PeliculaController.nuevaPelicula);

router.put('/:id', PeliculaController.editarPelicula);

router.delete('/:id', PeliculaController.eliminarPelicula);

router.post('/:id_pelicula/actor/:id_actor', PeliculaController.addActorPelicula);

router.delete('/:id_pelicula/actor/:id_actor', PeliculaController.delActorPelicula);

export default router;