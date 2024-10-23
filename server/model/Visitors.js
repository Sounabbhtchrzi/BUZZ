import mongoose from 'mongoose';

const visitorCountSchema = new mongoose.Schema({
    totalUsers: {
        type: Number,
        required: true,
        default: 0, // This will track unique users
    },
});

const VisitorCount = mongoose.model('VisitorCount', visitorCountSchema);

export default VisitorCount;
