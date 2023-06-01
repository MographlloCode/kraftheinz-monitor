import {
  getAllAnnouncementsService,
  createAnnouncementService,
  updateAnnouncementService,
  countAnnouncements,
  getTopAnnouncementService,
} from "../../services/announcement/announcement.services.js";

export const createAnnouncement = async (req, res) => {
  try {
    const { announcement } = req.body;

    if (!announcement) {
      res.status(400).send({
        erro: "Fill the announcement information",
      });
    }

    const announcementObject = await createAnnouncementService(req.body);

    if (!announcementObject) {
      return res.status(400).send({
        error: "Error creating the announcement!",
      });
    }

    res.status(201).send([
      {
        message: "Announcement created!",
      },
      {
        id: announcementObject._id,
        announcement,
      },
    ]);
  } catch (err) {
    res.status(500).send({ erro: err.message });
  }
};

export const getAllAnnouncements = async (req, res) => {
  try {
    let { limit, offset } = req.query;

    limit = Number(limit);
    offset = Number(offset);

    if (!limit) {
      limit = 5;
    }

    if (!offset) {
      offset = 0;
    }

    const announcements = await getAllAnnouncementsService(offset, limit);
    const totalAnnouncements = await countAnnouncements();
    const currentUrl = req.baseUrl;

    const next = offset + limit;
    const nextUrl =
      next < totalAnnouncements
        ? `${currentUrl}?limit=${limit}&offset=${next}`
        : null;

    const previous = offset - limit < 0 ? null : offset - limit;
    const previousUrl =
      previous != null
        ? `${currentUrl}?limit=${limit}&offset=${previous}`
        : null;

    if (announcements.length === 0) {
      return res
        .status(400)
        .send({ message: "There are no announcements registered." });
    }
    console.log(offset);

    res.status(200).send({
      nextUrl,
      previousUrl,
      limit,
      offset,
      totalAnnouncements,
      results: announcements.map((announcement) => ({
        id: announcement._id,
        announcement: announcement.announcement,
        createdAt: announcement.createdAt,
      })),
    });
  } catch (err) {
    res.status(500).send({ erro: err.message });
  }
};

export const getAnnouncement = async (req, res) => {
  try {
    const announcement = req.announcement;
    res.status(200).send(announcement);
  } catch (err) {
    res.status(500).send({ erro: err.message });
  }
};

export const updateAnnouncement = async (req, res) => {
  try {
    const { announcement } = req.body;

    if (!announcement) {
      res.status(400).send({
        erro: "Modify a field to update the announcement",
      });
      return;
    }

    const { id } = req;

    await updateAnnouncementService(id, announcement);

    res.status(200).send([
      {
        message: "Announcement updated successfully!",
      },
    ]);
  } catch (err) {
    res.status(500).send({ erro: err.message });
  }
};

export const topAnnouncement = async (req, res) => {
  try {
    const announcement = await getTopAnnouncementService();

    if (!announcement) {
      return res
        .status(400)
        .send({ message: "There are no Announcements registered." });
    }

    res.send({
      announcement: {
        id: announcement._id,
        announcement: announcement.announcement,
        createdAt: announcement.createdAt,
      },
    });
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
};
