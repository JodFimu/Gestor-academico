import fs from "fs";
import path from "path";    
import User from "../user/user.model.js";

import { dirname,} from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const deleteProfilePicture = async (req, res, next) => {
    try {
        const { uid } = req.params;

        const user = await User.findById(uid);

        if (!user || !user.profilePicture) {
            return next();
        }

        const filePath = path.join(__dirname, '../../public/uploads/profile-pictures', user.profilePicture);

        fs.unlink(filePath, (err) => {
            if (err) {
        return res.status(500).json({
            success: false,
            message: "Error deleting profile picture",
                    error: err.message
                });
            }
            next();
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error deleting profile picture",
            error: error.message
        });
            }
    };