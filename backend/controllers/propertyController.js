import Property from '../models/Property.js';

// @desc    Fetch all properties
// @route   GET /api/properties
// @access  Public
export const getProperties = async (req, res) => {
  try {
    const properties = await Property.find({});
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Fetch single property
// @route   GET /api/properties/:id
// @access  Public
export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (property) {
      res.json(property);
    } else {
      res.status(404).json({ message: 'Property not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Create a property
// @route   POST /api/properties
// @access  Private
export const createProperty = async (req, res) => {
  try {
    const { title, description, price, location, propertyType, investmentType, highlights, mapLocation, isFeatured } = req.body;

    let parsedImages = [];
    if (req.body.imageUrls) {
      if (Array.isArray(req.body.imageUrls)) {
        parsedImages = req.body.imageUrls;
      } else {
        parsedImages = typeof req.body.imageUrls === 'string' ? req.body.imageUrls.split(',').map(i => i.trim()).filter(i => i) : [];
      }
    }
    
    if (req.files && req.files.length > 0) {
      const fileUrls = req.files.map(file => `${req.protocol}://${req.get('host')}/uploads/${file.filename}`);
      parsedImages = [...parsedImages, ...fileUrls];
    }

    let parsedAmenities = [];
    if (req.body.amenities) {
      parsedAmenities = Array.isArray(req.body.amenities) ? req.body.amenities : req.body.amenities.split(',').map(a => a.trim()).filter(a => a);
    }

    const property = new Property({
      title,
      description,
      price: Number(price),
      location,
      propertyType,
      investmentType,
      images: parsedImages,
      highlights,
      amenities: parsedAmenities,
      mapLocation,
      isFeatured: isFeatured === 'true' || isFeatured === true,
    });

    const createdProperty = await property.save();
    res.status(201).json(createdProperty);
  } catch (error) {
    res.status(400).json({ message: 'Invalid property data', error: error.message });
  }
};

// @desc    Update a property
// @route   PUT /api/properties/:id
// @access  Private
export const updateProperty = async (req, res) => {
  try {
    const { title, description, price, location, propertyType, investmentType, highlights, mapLocation, isFeatured } = req.body;

    const property = await Property.findById(req.params.id);

    if (property) {
      let parsedImages = property.images;
      if (req.body.imageUrls) {
         const incomingImages = Array.isArray(req.body.imageUrls) ? req.body.imageUrls : req.body.imageUrls.split(',').map(i => i.trim()).filter(i => i);
         parsedImages = [...parsedImages, ...incomingImages];
      }
      if (req.files && req.files.length > 0) {
        const fileUrls = req.files.map(file => `${req.protocol}://${req.get('host')}/uploads/${file.filename}`);
        parsedImages = [...parsedImages, ...fileUrls];
      }

      let parsedAmenities = property.amenities;
      if (req.body.amenities) {
        parsedAmenities = Array.isArray(req.body.amenities) ? req.body.amenities : req.body.amenities.split(',').map(a => a.trim()).filter(a => a);
      }

      property.title = title || property.title;
      property.description = description || property.description;
      property.price = price ? Number(price) : property.price;
      property.location = location || property.location;
      property.propertyType = propertyType || property.propertyType;
      property.investmentType = investmentType || property.investmentType;
      property.images = parsedImages;
      property.highlights = highlights || property.highlights;
      property.amenities = parsedAmenities;
      property.mapLocation = mapLocation || property.mapLocation;
      if (isFeatured !== undefined) {
         property.isFeatured = isFeatured === 'true' || isFeatured === true;
      }

      const updatedProperty = await property.save();
      res.json(updatedProperty);
    } else {
      res.status(404).json({ message: 'Property not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid property data', error: error.message });
  }
};

// @desc    Delete a property
// @route   DELETE /api/properties/:id
// @access  Private
export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (property) {
      await property.deleteOne();
      res.json({ message: 'Property removed' });
    } else {
      res.status(404).json({ message: 'Property not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
