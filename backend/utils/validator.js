export const validateCropInput = (body) => {
    const {
        name,
        category,
        price,
        quantity,
        unit = "kg",
        images,
        dispatchTime,
        isOrganic,
        tags,
        isArchived,
        harvestDate,
        expiryDate,
    } = body;

    if (!name?.trim()) {
        return { valid: false, message: "Crop name is required" };
    }

    if (!category?.trim()) {
        return { valid: false, message: "Category is required" };
    }

    if (isNaN(price) || price <= 0) {
        return { valid: false, message: "Price must be a positive number" };
    }

    if (isNaN(quantity) || quantity <= 0) {
        return { valid: false, message: "Quantity must be a positive number" };
    }

    const allowedUnits = ["kg", "quintal", "tonne", "gram"];
    if (!allowedUnits.includes(unit)) {
        return { valid: false, message: "Invalid unit" };
    }

    if (!Array.isArray(images) || images.length === 0) {
        return { valid: false, message: "At least one image is required" };
    }

    if (dispatchTime < 0) {
        return { valid: false, message: "Dispatch time must be 0 or more" };
    }

    if (typeof isOrganic !== "undefined" && typeof isOrganic !== "boolean") {
        return { valid: false, message: "isOrganic must be a boolean" };
    }

    if (tags && !Array.isArray(tags)) {
        return { valid: false, message: "Tags must be an array" };
    }

    if (typeof isArchived !== "undefined" && typeof isArchived !== "boolean") {
        return { valid: false, message: "isArchived must be a boolean" };
    }

    if (harvestDate && isNaN(new Date(harvestDate).getTime())) {
        return { valid: false, message: "Invalid harvest date" };
    }

    if (expiryDate && isNaN(new Date(expiryDate).getTime())) {
        return { valid: false, message: "Invalid expiry date" };
    }

    return { valid: true };
};

export const validateEquipmentInput = (body) => {
    const {
        name,
        category,
        pricePerDay,
        description,
        images,
        dispatchTime,
        tags,
        isArchived,
        status,
        contactNumber
    } = body;

    if (!name?.trim()) {
        return { valid: false, message: "Equipment name is required" };
    }

    if (!category?.trim()) {
        return { valid: false, message: "Category is required" };
    }

    if (isNaN(pricePerDay) || pricePerDay <= 0) {
        return { valid: false, message: "Price must be a positive number" };
    }

    if (description && typeof description !== "string") {
        return { valid: false, message: "Description must be a string" };
    }

    if (!Array.isArray(images) || images.length === 0) {
        return { valid: false, message: "At least one image is required" };
    }

    if (dispatchTime !== undefined && (isNaN(dispatchTime) || dispatchTime < 0)) {
        return { valid: false, message: "Dispatch time must be 0 or more" };
    }

    if (tags && !Array.isArray(tags)) {
        return { valid: false, message: "Tags must be an array" };
    }

    if (typeof isArchived !== "undefined" && typeof isArchived !== "boolean") {
        return { valid: false, message: "isArchived must be a boolean" };
    }

    const allowedStatus = ["available", "booked"];
    if (status && !allowedStatus.includes(status)) {
        return { valid: false, message: "Status must be either 'available' or 'booked'" };
    }
    if (contactNumber && !/^\d{10}$/.test(contactNumber)) {
        return { valid: false, message: "Contact number must be a 10-digit number" };
    }

    return { valid: true };
};
