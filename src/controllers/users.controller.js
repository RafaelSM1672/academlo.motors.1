const User = require("../models/users.model");

exports.findUsers = async (req, res) => {
    const time = req.requestTime;

    const users = await User.findAll({
      where: {
        status: "available",
      }
    });

    return res.json({
      requestTime: time,
      results: users.length,
      status: "success",
      message: "Users find",
      users
    });
}

exports.findUser = async (req, res) => {
  try {
    const time = req.requestTime;
    const { id } = req.params;

    const user = await User.findOne({
      where: {
        id,
        status: "available",
      },
    });

    if(!user) {
      return res.status(404).json({
        status: "error",
        message: `The user whith id: ${id} not found!`
      });
    }

    res.json({
      requestTime: time,
      status: "available",
      message: `User #${id} found`,
      user,
    });

  } catch(error) {
    console.log(error);
    return res.status(500).json({
      status: "fail",
      message: "Something went very wrong!",
    });
  }
}

exports.createNewUser = async (req, res) => {

  try {
    //1-Obtener información de la req.body
    const { id, name, email, password, role, status} = req.body;
    const time = req.requestTime;
    //2. Crear el usuario usando el modelo
    const user = await User.create ({
      id,
      name,
      email,
      password,
      role,
      status
    });

    return res.json({
      requestTime: time,
      message: "The user has been created!",
      user,
    });
     
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Something went very wrong!",
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const time = req.requestTime;
    const { id } = req.params;
    const { name, email } = req.body;

    const user = await User.findOne({
      where: {
        id,
      }
    });

    if(!user) {
      return res.status(404).json({
        status: "error",
        message: `User with id: ${id} not found`,
      });
    }

    await user.update({ name, email });

    return res.status(200).json({
      requestTime: time,
      message: "The user has been updated",
      user,
    });

  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Something went very wrong!",
    });
  }
}

exports.deleteUser = async (req, res) => {

  try {
    const time = req.requestTime
    const { id } = req.params;
    const { status } = req.body;

    const user = await User.findOne({
      where: {
        status: "available",
        id,
      }
    })

    if(!user) {
      return res.status(404).json({
        status: "error",
        message: `User with id: ${id} not found`,
      });
    }

    await user.update({ status: "disabled" });

    return res.status(200).json({
      requestTime: time,
      message: "The user has been disabled",
    });

  } catch(error) {
    return res.status(500).json({
      status: "fail",
      message: "Something went very wrong!",
    });
  }
}
