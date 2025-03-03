import { Request, Response } from "express";
import { compare } from "../config/bcrypt";
import { generateToken } from "../config/jwt";
import User from "../models/schema";
import { hash } from "../config/bcrypt";
import axios from "axios";
import { envConfigs } from "../config/envconfig";

export default class UserController {

  static create = async (req: Request, res: Response) => {
    try {
      const userData = req.body;
      userData.password = await hash(userData.password);
      const existingUser = await User.findOne({ email:userData.email });
      if (existingUser) throw new Error("User already exists");
      const newUser: any = await User.create(userData);
      const token = generateToken({ userId: newUser._id });
      res.status(201).send({ message: "User created successfully", user: newUser, token });
    } catch (error: any) {
      res.status(500).send({ message: `Error creating user: ${error.message}` });
    }
  };

  static login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user:any = await User.findOne({ email });
      if (!user) throw new Error("User not found, please register");
      if (user.password === null) throw new Error("Password is null");
      const isPasswordMatch = await compare(password, user.password);
      console.log(isPasswordMatch,"isPasswordMatch")
      if (!isPasswordMatch) throw new Error("Invalid password");
      const token = generateToken({ userId: user._id });
      res.status(200).send({ message: "User logged in successfully", token });
    } catch (error: any) {
      res.status(500).send({ message: `Error logging in: ${error.message}` });
    }
  }
  
  static UserDetails = async (req: Request, res: Response) => {
    try {
      const userId = req.user.userId;
      if (!userId) throw new Error("Authentication failed");
      const user = await User.findById(userId);
      if (!user) throw new Error("User not found");
      res.status(200).send({ message: "User details fetched successfully", user });
    } catch (error: any) {
      res.status(500).send({ message: `Error fetching user details: ${error.message}` });
    }
  }

  static getUserByTitle = async (req: Request, res: Response) => {
    try {
      const apiKey = "31a30c4d"
      console.log(apiKey,"apiKey")
      const title = req.params.title;
      const response = await axios.get(`https://www.omdbapi.com/?apikey=${apiKey}&t=${title}`);
      res.status(200).send({ message: "User details fetched successfully", data:response.data });
    } catch (error: any) {
      res.status(500).send({ message: `Error fetching user details: ${error.message}` });
    }
  }

  static getSearchTerm = async (req: Request, res: Response) => {
    try {
      const apiKey = "31a30c4d";
      const search = req.params.search;
      const response = await axios.get(`https://www.omdbapi.com/?apikey=${apiKey}&s=${search}`);
      res.status(200).send({ message: "Search term fetched successfully", data:response.data });
    } catch (error: any) {
      res.status(500).send({ message: `Error fetching user details: ${error.message}` });
    }
  }
}
