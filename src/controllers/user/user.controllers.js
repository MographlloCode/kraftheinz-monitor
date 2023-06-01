import {
  getAllUsersService,
  createUserService,
  updateUserService,
  countUsers,
  getTopUserService,
} from "../../services/user/user.services.js";

export const createUser = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      res.status(400).send({
        erro: "Fill the user information",
      });
    }

    const user = await createUserService(req.body);

    if (!user) {
      return res.status(400).send({
        error: "Error creating the user!",
      });
    }

    res.status(201).send([
      {
        message: "user created!",
      },
      {
        id: user._id,
        name,
      },
    ]);
  } catch (err) {
    res.status(500).send({ erro: err.message });
  }
};

export const getAllUsers = async (req, res) => {
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

    const users = await getAllUsersService(offset, limit);
    const totalUsers = await countUsers();
    const currentUrl = req.baseUrl;

    const next = offset + limit;
    const nextUrl =
      next < totalUsers ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

    const previous = offset - limit < 0 ? null : offset - limit;
    const previousUrl =
      previous != null
        ? `${currentUrl}?limit=${limit}&offset=${previous}`
        : null;

    if (users.length === 0) {
      return res
        .status(400)
        .send({ message: "There are no users registered." });
    }
    console.log(offset);

    res.status(200).send({
      nextUrl,
      previousUrl,
      limit,
      offset,
      totalUsers,
      results: users.map((user) => ({
        id: user._id,
        name: user.name,
        createdAt: user.createdAt,
      })),
    });
  } catch (err) {
    res.status(500).send({ erro: err.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send({ erro: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      res.status(400).send({
        erro: "Modify a field to update the user",
      });
      return;
    }

    const { id } = req;

    await updateUserService(id, name);

    res.status(200).send([
      {
        message: "user updated successfully!",
      },
    ]);
  } catch (err) {
    res.status(500).send({ erro: err.message });
  }
};

export const topUser = async (req, res) => {
  try {
    const user = await getTopUserService();

    if (!user) {
      return res
        .status(400)
        .send({ message: "There are no factories registered." });
    }

    res.send({
      user: {
        id: user._id,
        name: user.name,
        createdAt: user.createdAt,
      },
    });
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
};
