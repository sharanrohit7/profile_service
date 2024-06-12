import { NextFunction, Request, Response } from "express";
import axios from "axios";

export const testToken = async () => {
  const baseUrl: string = process.env.TOKEN_URL || "localhost:3000";

  const url: string = `${baseUrl}/hello`;
  const response = await axios.get(url, {});

  if (response.status === 200) {
    console.log("Token Service Connected");
  } else console.log("Error connecting to Token Service");
};

export const testAuth = async () => {
    const baseUrl: string = process.env.AUTH_URL || "localhost:8080";
  
    const url: string = `${baseUrl}/ping`;
    const response = await axios.get(url, {});
  
    if (response.status === 200) {
      console.log("Auth Service Connected");
    } else console.log("Error connecting to Auth Service");
  };
