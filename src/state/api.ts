import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface ImagePost {
  id: string;
  name: string;
  url: string;
  id_post: string;
}

export interface User{
  id: string;
  last_login: string;
  is_superuser: string;
  first_name:string;
  last_name : string;
  is_staff: boolean;
  is_active : boolean;
  date_joined: string;
  email : string;
  password: string;
  username : string;
  noms : string;
  photo_url : string,
  phone: string;
  profile: string;
  groups: [];
  user_permissions: [];
}

export interface Post {
  id: string;
  content: string;
  location: boolean;
  adresse: string;
  price: number;
  created_at: string;
  imagepost_set: ImagePost[];
  user : User[];
}

export interface NewPost {
  name: string
  price: number;
  rating?: number;
  stockQuantity: number;
}


export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  reducerPath: "api",
  tagTypes: ["DashboardMetrics", "Posts", "Users", "Expenses"],
  endpoints: (build) => ({

    getPosts: build.query<Post[],void>({
      query: (search) => ({
        url: "/api/posts/",
      }),
      providesTags: ["Posts"],
    }),

  }),
});

export const {
  useGetPostsQuery,

} = api;
