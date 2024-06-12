import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middle";
import { createProfile } from "../services/profile.service";

interface createProfile {
  id?: string;
  user_id : string,
  title: string;
  legal_name: string;
  gst_number: string;
}
export const createProfileController = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const { id, role_id } = req.user;
    const body: createProfile = req.body;

    if (role_id === "1" || role_id === "2") {
      body.id = crypto.randomUUID();
      body.user_id = id
      const response = await createProfile(body);
      if (response.user) {
        return res
          .status(201)
          .json({ message: "Profile created successfully" });
      }
      if (response.error) {
        return res.status(400).json({ error: response.error });
      }
    } else
      return res.status(401).json({ status: false, message: "Unauthorized" });
  } catch (error) {
    return error;
  }
};
