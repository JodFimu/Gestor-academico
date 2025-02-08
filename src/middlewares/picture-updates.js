import fs from "fs";
import path from "path";    

export const deleteProfilePicture = (req, res, next) => {
    try {
        const { picture } = req.body;

        if (!picture) {
            return next();
        }

        const filePath = path.join(__dirname, '../../public/uploads/profile-pictures', picture);

        fs.unlink(filePath);

        return res.status(200).json({
            success: true,
            message: "Profile picture deleted"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error deleting profile picture",
            error: error.message
        });
        
    }
    
};