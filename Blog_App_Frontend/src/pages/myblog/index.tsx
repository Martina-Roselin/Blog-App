import { api } from "../../configs/axios.config";
import { API_ENDPOINTS } from "../../constants/api.constants";
import { IBlogResponse } from "../../types/app.type";
import { useAuth } from "../../context/auth/auth.context";
import BlogListScreen from "../../component/blog-list";

const MyBlogsScreen = () => {
  const { authState } = useAuth();
  const fetchMyFavorites = async () => {
    const response = await api.get<IBlogResponse>(API_ENDPOINTS.GET_MY_BLOGS, {
      headers: {
        Authorization: `Bearer ${authState.authToken}`,
      },
    });
    return response.data.responseData;
  };

  return <BlogListScreen fetchBlogs={fetchMyFavorites} title="New Blog" />;
};

export default MyBlogsScreen;
