import mongoose from 'mongoose';

export interface ContactDocument extends mongoose.Document {
    fullName: string;
    contactNumber: string;
    emailAddress:string;
    createdBy: string;
};

const contactSchema = new mongoose.Schema({
    fullName: {type: String, required: true},
    contactNumber: {type: String, required: true},
    emailAddress: {type: String, required: true},
    createdBy: {type: String, required: true},
});

const ContactModel = mongoose.model<ContactDocument>("Contact", contactSchema);

export default ContactModel;