import mongoose from 'mongoose';

const busSchema = new mongoose.Schema({
  busNo: String,
  latitude: Number,
  longitude: Number,
  headCount: Number,
  crowdLevel: String,
  status: String,
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Bus', busSchema);
