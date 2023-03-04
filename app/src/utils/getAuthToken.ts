import { user } from "@prisma/client";
import jwt from "jsonwebtoken";
import { NextApiResponse } from "next";

export type jwtUserPayloadType = {
  id: string;
  email: string;
  name: string;
  listing_id: string | null // null for normal users
};


export const getAuthToken = (user: user) => {
  // create auth token
  const jwtPayload: jwtUserPayloadType = {
    id: user.id,
    email: user.email,
    name: user.name,
    listing_id: user.listing_id
  };
  return jwt.sign(jwtPayload, process.env.JSON_WEB_TOKEN_SECRET??"");
};
