
export const blogMessages = {
    success : {
        create: "Blog created successfully",
        update: "Blog updated successfully",
        delete: "Blog deleted successfully",
        fetch: "Blogs fetched successfully",
        favourite: "Blog favourited successfully",
        unfavourite: "Blog unfavourited successfully",
    },
    error: {
        create: "Error creating blog",
        update: "Error updating blog",
        delete: "Error deleting blog",
        fetch: "Error fetching blogs",
        favourite: "Error favouriting blog",
        unfavourite: "Error unfavouriting blog",
        internal: "Internal server error",
        not_found: "Blog not found",
        favoutire_not_found: "Favourite not found",
        already_favourited: "Blog already favourited",
    },
    missing: {
        fields: "All fields are required",
        id_required: "Blog ID is required",
    }
}

export const userMessage = {
    success: {
        create: "User registered successfully",
        login: "User logged in successfully",
    },
    error: {
        create: "Error creating user",
        login: "Error logging in user",
        exists: "User already exists",
        not_found: "User not found",
        invalid_credentials: "Invalid credentials",
        internal: "Internal server error",
    },
    missing: {
        fields: "All fields are required",
        id_required: "User ID is required",
    }
}