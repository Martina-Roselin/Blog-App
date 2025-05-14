export interface IBlog {
    id?: number;
    title: string;
    description: string;
    image_url: string;
    content: string;
    user_id?: number;
    created_at?: string;
    updated_at?: string;
    isFavourite: boolean;
    isMyBlog: boolean;
    author?: string;
}

export interface IBlogResponse {
    responseData: IBlog[];
}

export interface ILoginRequest {
    email: string;
    password: string;
  }

export interface ILoginResponse {
    responseMessage: string;
    exception: any;
    responseData: {
      token: string;
    }
}

export interface IRegisterRequest {
    email: string;
    username: string;
    password: string;
}

export interface IRegisterResponse {
    responseMessage: string;
    exception: any;
    responseData: {
        error?: boolean;
        id: number;
        email: string;
        username: string;
        password: string;
        created_at: string;
    }
}