const Brand = require('../models/brand');
const asyncHandler = require('express-async-handler');

const createBrand = asyncHandler(async (req, res) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ success: false, message: 'Missing brand data' });
    }

    const response = await Brand.create(req.body);
    return res.json({
        success: response ? true : false,
        createdBrand: response || 'Cannot create new brand'
    });
});

const getBrands = asyncHandler(async (req, res) => {
    const response = await Brand.find()
    return res.json({
        success: response ? true : false,
        brands: response || 'Cannot get brands'
    });
});

const updateBrand = asyncHandler(async (req, res) => {
    const { bid } = req.params;
    if (!bid) {
        return res.status(400).json({ success: false, message: 'Missing brand ID' });
    }

    const response = await Brand.findByIdAndUpdate(bid, req.body, { new: true });
    return res.json({
        success: response ? true : false,
        updatedBrand: response || 'Cannot update brand'
    });
});

const deleteBrand = asyncHandler(async (req, res) => {
    const { bid } = req.params;
    if (!bid) {
        return res.status(400).json({ success: false, message: 'Missing brand ID' });
    }

    const response = await Brand.findByIdAndDelete(bid);
    return res.json({
        success: response ? true : false,
        deletedBrand: response || 'Cannot delete brand'
    });
});

module.exports = {
    createBrand,
    getBrands,
    updateBrand,
    deleteBrand
};
