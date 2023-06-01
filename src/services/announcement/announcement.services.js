import { Announcement } from "../../models/Announcement.js";

// GET
export const getAnnouncementService = (id) => Announcement.findById(id);
export const getAllAnnouncementsService = (offset, limit) =>
  Announcement.find().sort({ _id: -1 }).skip(offset).limit(limit);
export const countAnnouncements = () => Announcement.countDocuments();
export const getTopAnnouncementService = () =>
  Announcement.findOne().sort({ _id: -1 });

// POST
export const createAnnouncementService = (body) => Announcement.create(body);

// PATCH
export const updateAnnouncementService = (id, announcement) =>
  Announcement.findOneAndUpdate(
    { _id: id },
    {
      announcement,
    }
  );
