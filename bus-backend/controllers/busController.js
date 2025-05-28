import Bus from '../models/Bus.js';

export const getBuses = async (req, res) => {
  try {
    const buses = await Bus.find();
    const now = new Date();
    const offlineThresholdMinutes = 2;
    
    // Loop over all buses
    for (const bus of buses) {
      const diffInMinutes = (now - new Date(bus.updatedAt)) / 1000 / 60;
      const shouldBeOffline = diffInMinutes > offlineThresholdMinutes;

      if (shouldBeOffline && bus.status !== 'offline') {
        // Update status in DB if it’s not already offline
        await Bus.updateOne({ _id: bus._id }, { $set: { status: 'offline' } });
      }
    }

    // Re-fetch updated list
    const updatedBuses = await Bus.find();
    res.json(updatedBuses);
  } catch (err) {
    console.error("Error fetching buses:", err);
    res.status(500).json({ error: 'Server error' });
  }
};



export const updateBusData = async (req, res) => {
  const { busNo, latitude, longitude, headCount, status } = req.body;

  console.log("Incoming bus data:", req.body);  // 👈 Useful debug log

  if (!busNo || latitude === undefined || longitude === undefined || headCount === undefined) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  let crowdLevel = 'Low';
  if (headCount >=5 && headCount <= 10) crowdLevel = 'Moderate';
  else if (headCount > 10) crowdLevel = 'High';

  try {
    const bus = await Bus.findOneAndUpdate(
      { busNo },
      { latitude, longitude, headCount, crowdLevel, status, updatedAt: new Date() },
      { upsert: true, new: true }
    );
    console.log("✅ Bus saved to DB:", bus);

    const io = req.app.get('io');
    io.emit('bus-update', bus);

    res.json(bus);
  } catch (err) {
    res.status(500).json({ error: 'Update failed' });
  }
};
