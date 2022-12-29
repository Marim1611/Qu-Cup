import {mongoose} from 'mongoose'
import {Reservation} from './Reservation.js'


const matchSchema = mongoose.Schema({
    teamOne : {
        type : String,
        required : true
    },
    teamTwo : {
        type : String,
        required : true
    },
    matchVenue : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'Stadium'
    },
    date : {
        type : Date,
        required : true,
    },
    mainReferee : {
        type : String,
        required : true
    },
    lineMan1 : {
        type : String,
        required : true
    },
    lineMan2 : {
        type : String,
        required : true
    }
},{
    strict:false,
    timestamps: true,
    toJSON: {virtuals: true}
})

matchSchema.virtual('reservations', {
    ref : 'Reservation',
    localField : '_id',
    foreignField : 'match'
})

matchSchema.pre('remove', async function(next) {
    const match = this
    await Reservation.deleteMany({match : match._id})
    next()
})

const Match = mongoose.model('Match', matchSchema)

export {Match}

