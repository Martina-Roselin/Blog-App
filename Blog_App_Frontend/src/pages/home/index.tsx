// src/pages/HomeScreen.tsx
import BlogListScreen from "../../component/blog-list";
import { api } from "../../configs/axios.config";
import { API_ENDPOINTS } from "../../constants/api.constants";
import { useAuth } from "../../context/auth/auth.context";
import { IBlogResponse } from "../../types/app.type";

const HomeScreen = () => {
  const { authState } = useAuth();
  const fetchAllBlogs = async () => {
    const response = await api.get<IBlogResponse>(API_ENDPOINTS.GET_ALL_BLOGS, {
      headers: {
        Authorization: `Bearer ${authState.authToken}`,
      },
    });
    return response.data.responseData;
  };

  return <BlogListScreen fetchBlogs={fetchAllBlogs} />;
};

export default HomeScreen;
