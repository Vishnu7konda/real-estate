import prisma from '../prismaClient.js';
import { supabase } from '../supabaseClient.js';

// @desc    Fetch all properties
// @route   GET /api/properties
// @access  Public
export const getProperties = async (req, res) => {
  try {
    const properties = await prisma.property.findMany({
      orderBy: { createdAt: 'desc' }
    });
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
    const property = await prisma.property.findUnique({
      where: { id: req.params.id }
    });
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
      const uploadPromises = req.files.map(async (file) => {
        const fileName = `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`;
        const { data, error } = await supabase.storage
          .from('properties')
          .upload(fileName, file.buffer, {
            contentType: file.mimetype,
            upsert: false
          });

        if (error) {
           console.error('Supabase upload error:', error);
           throw new Error('Failed to upload image to Supabase');
        }

        const { data: publicUrlData } = supabase.storage
          .from('properties')
          .getPublicUrl(fileName);

        return publicUrlData.publicUrl;
      });

      const fileUrls = await Promise.all(uploadPromises);
      parsedImages = [...parsedImages, ...fileUrls];
    }

    let parsedAmenities = [];
    if (req.body.amenities) {
      parsedAmenities = Array.isArray(req.body.amenities) ? req.body.amenities : req.body.amenities.split(',').map(a => a.trim()).filter(a => a);
    }

    const propertyData = {
      title,
      description,
      price: Number(price),
      location,
      propertyType,
      investmentType,
      images: parsedImages,
      highlights: highlights || [],
      amenities: parsedAmenities,
      mapLocation,
      isFeatured: isFeatured === 'true' || isFeatured === true,
    };

    const createdProperty = await prisma.property.create({
      data: propertyData
    });
    
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

    const property = await prisma.property.findUnique({
      where: { id: req.params.id }
    });

    if (property) {
      let parsedImages = property.images;
      if (req.body.imageUrls) {
         const incomingImages = Array.isArray(req.body.imageUrls) ? req.body.imageUrls : req.body.imageUrls.split(',').map(i => i.trim()).filter(i => i);
         parsedImages = [...parsedImages, ...incomingImages];
      }
      if (req.files && req.files.length > 0) {
        const uploadPromises = req.files.map(async (file) => {
          const fileName = `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`;
          const { data, error } = await supabase.storage
            .from('properties')
            .upload(fileName, file.buffer, {
              contentType: file.mimetype,
              upsert: false
            });

          if (error) {
             console.error('Supabase upload error:', error);
             throw new Error('Failed to upload image to Supabase');
          }

          const { data: publicUrlData } = supabase.storage
            .from('properties')
            .getPublicUrl(fileName);

          return publicUrlData.publicUrl;
        });

        const fileUrls = await Promise.all(uploadPromises);
        parsedImages = [...parsedImages, ...fileUrls];
      }

      let parsedAmenities = property.amenities;
      if (req.body.amenities) {
        parsedAmenities = Array.isArray(req.body.amenities) ? req.body.amenities : req.body.amenities.split(',').map(a => a.trim()).filter(a => a);
      }

      const updatedProperty = await prisma.property.update({
        where: { id: req.params.id },
        data: {
          title: title || property.title,
          description: description || property.description,
          price: price ? Number(price) : property.price,
          location: location || property.location,
          propertyType: propertyType || property.propertyType,
          investmentType: investmentType || property.investmentType,
          images: parsedImages,
          highlights: highlights || property.highlights,
          amenities: parsedAmenities,
          mapLocation: mapLocation || property.mapLocation,
          isFeatured: isFeatured !== undefined ? (isFeatured === 'true' || isFeatured === true) : property.isFeatured,
        }
      });

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
    const property = await prisma.property.findUnique({
      where: { id: req.params.id }
    });

    if (property) {
      await prisma.property.delete({
        where: { id: req.params.id }
      });
      res.json({ message: 'Property removed' });
    } else {
      res.status(404).json({ message: 'Property not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
