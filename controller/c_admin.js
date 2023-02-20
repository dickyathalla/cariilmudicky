const adminModels = require("../models/admin.js");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const crypto = require("crypto");

exports.daftar_admin = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const nameadmin = await adminModels.findOne({ nameAdmin: name });
    const emailadmin = await adminModels.findOne({ emailAdmin: email });
    if (nameadmin) {
      return res
        .status(404)
        .json({ status: false, message: "adminname telah tersedia" });
    }
    if (emailadmin) {
      return res
        .status(404)
        .json({ status: false, message: "Email telah tersedia" });
    }
    const saltKey = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, saltKey);
    const dataadmin = new adminModels({
      nameAdmin: name,
      emailAdmin: email,
      passwordAdmin: passwordHash,
    });
    dataadmin.save();
    return res
      .status(200)
      .json({ status: true, message: "Berhasil", payload: dataadmin });
  } catch (error) {
    return res.status(400).json({ status: false, message: error });
  }
};
exports.login_admin = async (req, res) => {
  const { name, password } = req.body;
  const token_key = await crypto.randomBytes(64).toString("hex");
  const nameadmin = await adminModels.findOne({ nameAdmin: name });
  // console.log(nameadmin)
  if (nameadmin) {
    const passwordadmin = await bcrypt.compare(
      password,
      nameadmin.passwordAdmin
    );
    if (passwordadmin == true) {
      const data_admin = {
        id: nameadmin._id,
      };
      const token = await jsonwebtoken.sign(data_admin, token_key);
      return res.status(200).json({
        payload: token,
        data: nameadmin,
      });
    } else {
      return res.status(404).json({
        status: false,
        message: "Periksa kembali password anda",
      });
    }
  } else {
    return res.status(404).json({
      status: false,
      message: "adminname dan password tidak tersedia",
    });
  }
};
exports.get_admin = async (req, res) => {
  const alladmin = await adminModels.find();
  res.render('pages/index',{
    mascots:alladmin
  })
  return res.status(200).json(alladmin);
};
exports.edit_admin = async (req, res) => {
  try {
    const editadmin = await adminModels.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    return res.status(200).json(editadmin);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
exports.get_admin_by_id = async (req, res) => {
  try {
    const getadminById = await adminModels.findById(req.params.id);
    return res.status(200).json({
      message: true,
      payload: getadminById,
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};
exports.hapus_admin = async (req, res) => {
  try {
    const deleteadmin = await adminModels.deleteOne({ _id: req.params.id });
    return res.status(200).json({
      message: "Data berhasil dihapus",
      payload: deleteadmin,
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};
