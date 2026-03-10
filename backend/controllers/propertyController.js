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
    const { title, description, price, location, propertyType, investmentType, images, highlights, amenities, mapLocation, isFeatured } = req.body;

    const property = new Property({
      title,
      description,
      price,
      location,
      propertyType,
      investmentType,
      images,
      highlights,
      amenities,
      mapLocation,
      isFeatured,
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
    const { title, description, price, location, propertyType, investmentType, images, highlights, amenities, mapLocation, isFeatured } = req.body;

    const property = await Property.findById(req.params.id);

    if (property) {
      property.title = title || property.title;
      property.description = description || property.description;
      property.price = price || property.price;
      property.location = location || property.location;
      property.propertyType = propertyType || property.propertyType;
      property.investmentType = investmentType || property.investmentType;
      property.images = images || property.images;
      property.highlights = highlights || property.highlights;
      property.amenities = amenities || property.amenities;
      property.mapLocation = mapLocation || property.mapLocation;
      property.isFeatured = isFeatured !== undefined ? isFeatured : property.isFeatured;

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
