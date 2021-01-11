import mongoose from 'mongoose';
const {
    Schema
} = mongoose;

const peliculaSchema = new Schema({
    titulo: String,
    portadaURL: String,
    director: {
        type: mongoose.ObjectId,
        ref: 'Persona'
    },
    actores: [{
        type: mongoose.ObjectId,
        ref: 'Persona'
    }]
});

const Pelicula = mongoose.model('Pelicula', peliculaSchema);


const PeliculaRepository = {

    async findAll() {
        return await Pelicula
            .find()
            .populate('director', 'nombre')
            .populate('actores', 'nombre')
            .exec();
    },

    async findById(id) {


        return await Pelicula
            .findById(id)
            .populate('director')
            .populate('actores')
            .exec();




    },

    // por simplicidad, creamos una película sin actores
    async create(nuevaPelicula) {
        const pelicula = new Pelicula({
            titulo: nuevaPelicula.titulo,
            director: nuevaPelicula.director,
            portadaURL: nuevaPelicula.portadaURL
        });

        const result = await pelicula.save();
        return result;
    },

    async updateById(id, peliculaModificada) {
        const pelicula = await Pelicula.findById(id);

        if (pelicula == null) {
            return undefined;
        } else {
            return await Object.assign(pelicula, peliculaModificada).save();
        }
    },

    async update(peliculaModificada) {
        return await this.updateById(peliculaModificada.id, peliculaModificada);
    },

    async delete(id) {
        await Pelicula.findByIdAndRemove(id).exec();
    }


}


export {
    Pelicula,
    PeliculaRepository
}