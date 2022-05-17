import { Request, Response } from "express";
import Contact, { ContactDocument } from "../models/contact.model";
import { UpdateContactInput, CreateContactInput } from "../schema/contact.shema";
import { ContactByUser } from "../schema/user.schema";
import { createContact, deleteContact, findAndUpdateContact, findContact, getContactList } from "../service/contact.service";

export async function getContactListHandler( req: Request<ContactByUser["params"]>, res: Response ) {
    let idQuery = req.query.parameters;

    if (typeof idQuery === "string")
    {
      let id = JSON.parse(idQuery);

      const contactCollection = await getContactList(id.createdBy);

      if (!contactCollection) 
      {
        return res.sendStatus(404);
      }
  
      return res.send(contactCollection);
    } 
  }

  export async function createContactHandler(
    req: Request<{}, {}, CreateContactInput["body"]>,
    res: Response
  ) {
    
    const contact = new Contact({
        fullName: req.body.fullName,
        emailAddress: req.body.emailAddress,
        contactNumber: req.body.contactNumber,
        createdBy: req.body.createdBy,
    })
  
    const product = await createContact(contact);
  
    return res.send(product);
  }

  export async function getContactHandler(
    req: Request<UpdateContactInput["params"]>,
    res: Response
  ) {
    const contactId = req.params.id;

    const contact = await findContact( contactId);
  
    if (!contact) {
      return res.sendStatus(404);
    }
  
    return res.send(contact);
  }

  export async function updateContactHandler(
    req: Request<ContactByUser["params"]>,
    res: Response
  ) {
    let parameters = req.query.parameters; 
    // const contactId = req.params.id;
    const update = req.body;

    if (typeof parameters === "string")
    {
      let params = JSON.parse(parameters);

      const contactId = params.contactId;

      const contact = await findContact( contactId );
  
    if (!contact) {
      return res.sendStatus(404);
    }
  
    const updatedContact = await findAndUpdateContact({ _id: contactId }, update, {
      new: true,
    });
  
    return res.send(updatedContact);
    
    } 
    
  }

  export async function deleteContactHandler(
    req: Request<UpdateContactInput["params"]>,
    res: Response
  ) {
    const contactId = req.params.id;
  
    const product = await findContact( contactId );
  
    if (!product) {
      return res.sendStatus(404);
    }
  
    await deleteContact({ _id: contactId });
  
    return res.sendStatus(200);
  }

  