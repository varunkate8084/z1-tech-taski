import {z} from "zod"

export class userValidators{

  static register = z.object({
    body: z.object({
      username: z.string().min(1, "Username is required").trim(),
      password: z.string().min(6, "Password must be at least 6 characters long"),
      email: z.string().email("Invalid email format").toLowerCase(),
      fullName: z.string().min(1, "Full name is required").trim(),
      dateOfBirth: z.coerce.date().optional(),
      country: z.string().optional(),
      gender: z.enum(["male", "female"]).optional(),
    }).strict(),
    params: z.object({}).strict(),
    query: z.object({}).strict(),
  });

  static Login = z.object({
    body: z.object({
      email: z.string().email("Invalid email format"),
      password: z.string().min(6, "Password must be at least 6 characters long"),
    }).strict(),
    params: z.object({}).strict(),
    query: z.object({}).strict(),
  });

  static getUserDetails = z.object({
    body: z.object({}).strict(),
    params: z.object({}).strict(),
    query: z.object({}).strict(),
  });


  static getUserByTitle = z.object({
    body: z.object({}).strict(),
    params: z.object({
      title: z.string().min(1, "Title is required").trim(),
    }).strict(),
    query: z.object({}).strict(),
  });
  
  static getSearchTerm = z.object({
    body: z.object({}).strict(),
    params: z.object({
      search: z.string().min(1, "Search term is required").trim(),
    }).strict(),
    query: z.object({}).strict(),
  });

}

