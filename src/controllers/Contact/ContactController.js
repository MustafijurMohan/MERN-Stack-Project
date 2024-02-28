const ContactModel = require("../../models/Contact/ContactModel");

// Create Contact
exports.contact = async (req, res) => {
  try {
    const reqBody = req.body;
    const data = await ContactModel.create(reqBody);
    return res.status(201).json({ status: "Successfull", data: data });
  } catch (error) {
    return res.status(400).json({ status: "Fail", data: error });
  }
};

// Get All Contact Message From Admin Panel
exports.getAllContact = async (req, res) => {
  try {
    const contacts = await ContactModel.find();
    if (!contacts || contacts.length === 0) {
      return res.status(404).json({message: 'No Contacts Found'})
  }
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};


// Delete Contact
exports.contactDeleteByID = async (req, res) => {
  try {
    const id = req.params.id
    const Query = {_id: id}
    const data = await ContactModel.deleteOne(Query)
    res.status(200).json({message: 'Contact Delete Successfull', data})
  } catch (error) {
    next(error)
  }
}
