import {
    PeliculaRepository
} from '../models/pelicula';
import {
    PersonaRepository
} from '../models/persona';

const PeliculaController = {

    todasLasPeliculas: async (req, res) => {
        const data = await PeliculaRepository.findAll();
        if (Array.isArray(data) && data.length > 0)
            res.json(data);
        else
            res.sendStatus(404);
    },

    peliculaPorId: async (req, res) => {
        let pelicula = await PeliculaRepository.findById(req.params.id);
        if (pelicula != undefined)
            res.json(pelicula);
        else
            res.sendStatus(404);
    },

    nuevaPelicula: async (req, res) => {
        let pelicula = await PeliculaRepository.create({
            titulo: req.body.titulo,
            portadaURL: req.body.portadaURL,
            director: req.body.director
        });
        res.status(201).json(pelicula);
    },

    editarPelicula: async (req, res) => {
        let pelicula = await PeliculaRepository
            .updateById(req.params.id, {
                titulo: req.body.titulo,
                portadaURL: req.body.portadaURL,
                director: req.body.director
            });
        if (pelicula != undefined) {
            res.json(pelicula);
        } else {
            res.sendStatus(404);
        }
    },

    eliminarPelicula: async (req, res) => {
        await PeliculaRepository.delete(req.params.id);
        res.sendStatus(204);
    },

    // Se comprueba antes que el actor existe
    addActorPelicula: async (req, res) => {

        let actor = await PersonaRepository.findById(req.params.id_actor);
        if (actor != undefined) {
            let pelicula = await PeliculaRepository.findById(req.params.id_pelicula);
            if (pelicula != undefined) {
                pelicula.actores.push(actor._id);
                await pelicula.save();
                // Volvemos a rescatar la película para aplicar los diferentes `populate`
                // Seguramente este código se podría refactorizar y mejorar
                res.json(await PeliculaRepository.findById(pelicula._id));
            } else {
                res.status(400).json({
                    mensaje: `La película con ID: ${req.params.id_pelicula} no está registrada en la base de datos`
                });
            }
        } else {
            // Este manejo de error podría unificarse
            // para una mejor gestión a través de un 
            // middleware común
            res.status(400).json({
                mensaje: `El actor con ID: ${req.params.id_actor} no está registrado en la base de datos`
            });
        }

    },

    delActorPelicula: async (req, res) => {
        let pelicula = await PeliculaRepository.findById(req.params.id_pelicula);
        if (pelicula != undefined) {
            pelicula.actores.pull(req.params.id_actor);
            await pelicula.save();
            // Volvemos a rescatar la película para aplicar los diferentes `populate`
            // Seguramente este código se podría refactorizar y mejorar
            res.json(await PeliculaRepository.findById(pelicula._id));
        } else {
            res.status(400).json({
                mensaje: `La película con ID: ${req.params.id_pelicula} no está registrada en la base de datos`
            });
        }
    }



}

export {
    PeliculaController
}