import { PersonaRepository} from '../models/persona';

const PersonaController = {

    todasLasPersonas: async (req, res) => {
        const data = await PersonaRepository.findAll();
        if (Array.isArray(data) && data.length > 0) 
            res.json(data);
        else
            res.sendStatus(404);
    },

    personaPorId: async (req, res) => {
        let persona = await PersonaRepository.findById(req.params.id);
        if (persona != undefined)
            res.json(persona);
        else
            res.sendStatus(404);
    },

    nuevaPersona: async (req, res) => {
        let persona = await PersonaRepository.create({
            nombre: req.body.nombre,
            urlFoto: req.body.urlFoto
        });
        res.status(201).json(persona);
    },

    editarPersona: async (req, res) => {
        let persona = await PersonaRepository
                        .updateById(req.params.id, {
                            nombre: req.body.nombre,
                            urlFoto: req.body.urlFoto
                        });
        if (persona != undefined) {
            res.json(persona);
        } else {
            res.sendStatus(404);
        }
    },

    eliminarPersona: async (req, res) => {
        await PersonaRepository.delete(req.params.id);
        res.sendStatus(204);
    }


}

export {
    PersonaController
}