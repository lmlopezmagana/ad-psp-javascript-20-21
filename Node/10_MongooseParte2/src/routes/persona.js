import { Router } from 'express';
import { PersonaController } from '../controllers/persona';

const router = Router();

router.get('/', PersonaController.todasLasPersonas);

router.get('/:id', PersonaController.personaPorId);

router.post('/', PersonaController.nuevaPersona);

router.put('/:id', PersonaController.editarPersona);

router.delete('/:id', PersonaController.eliminarPersona);

export default router;