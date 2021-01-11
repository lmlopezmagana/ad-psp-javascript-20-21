import mongoose from 'mongoose';
const { Schema } = mongoose;

const personaSchema = new Schema({
    nombre: String,
    urlFoto: String
});

const Persona = mongoose.model('Persona', personaSchema);


const PersonaRepository = {

    async findAll() {
        return await Persona.find().exec();
    },

    async findById(id) {
        const result = await Persona.findById(id).exec();
        return result != null ? result : undefined;
    },

    async create(nuevaPersona) {
        const persona = new Persona({
            nombre: nuevaPersona.nombre,
            urlFoto: nuevaPersona.urlFoto
        });
        const result = await persona.save();
        return result;
    },

    async updateById(id, personaModificada) {
        const persona = await Persona.findById(id);

        if (persona == null) {
            return undefined;
        } else {
            return await Object.assign(persona, personaModificada).save();
        }
    },

    async update(personaModificada) {
        return await this.updateById(personaModificada.id, personaModificada);
    },

    async delete(id) {
        await Persona.findByIdAndRemove(id).exec();
    }



}

export {
    Persona,
    PersonaRepository
}