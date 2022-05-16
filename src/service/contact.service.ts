import Contact, { ContactDocument } from '../models/contact.model';
import express, { Request, Response, NextFunction } from 'express';
import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import { databaseResponseTimeHistogram } from '../utils/metrics';

export async function getContactList(id: string){
    return Contact.find({$or: [{createdBy: id}, {createdBy: "111"}]});
}

export async function createContact(input: ContactDocument) {
    const metricsLabels = {
      operation: "createContact",
    };
  
    const timer = databaseResponseTimeHistogram.startTimer();
    try {
      const result = await Contact.create(input);
      timer({ ...metricsLabels, success: "true" });
      return result;
    } catch (e) {
      timer({ ...metricsLabels, success: "false" });
      throw e;
    }
  }

export async function findContact(query: string, options: QueryOptions = { lean: true }) {
    const metricsLabels = {
      operation: "findContact",
    };
  
    const timer = databaseResponseTimeHistogram.startTimer();
    try {
      const result = await Contact.findById(query, {}, options);
      timer({ ...metricsLabels, success: "true" });
      return result;
    } catch (e) {
      timer({ ...metricsLabels, success: "false" });
  
      throw e;
    }
}

export async function findAndUpdateContact(
    query: FilterQuery<ContactDocument>,
    update: UpdateQuery<ContactDocument>,
    options: QueryOptions
  ) {
    return Contact.findOneAndUpdate(query, update, options);
}
  
export async function deleteContact(query: FilterQuery<ContactDocument>) {
    return Contact.deleteOne(query);
}