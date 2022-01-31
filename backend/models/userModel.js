import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false, 
        required: true
    },
    avatar: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
})

// function to check of passwords are matching
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

// encrypt password before saving
userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) {
        return next();
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})


const User = mongoose.model('User', userSchema);

export default User;