import { useNavigate } from "react-router-dom";
import { Plus } from "@mynaui/icons-react";
import styles from "./index.module.css";
import { API_ENDPOINTS } from "../../constants/api.constants";
import { api } from "../../configs/axios.config";
import { IBlog } from "../../types/app.type";
import { useAuth } from "../../context/auth/auth.context";
import { useEffect, useState } from "react";
import CardList from "../card-list";
import emptyState from "../../assets/emptyState.png";

interface BlogListScreenProps {
  fetchBlogs: () => Promise<IBlog[]>;
  title?: string;
}

const BlogListScreen = ({
  fetchBlogs,
  title = "New Blog",
}: BlogListScreenProps) => {
  const { authState } = useAuth();
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<IBlog[]>([]);
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");

  const loadBlogs = async () => {
    const allBlogs = await fetchBlogs();
    setBlogs(allBlogs);
    setFilteredBlogs(allBlogs);
  };

  const handleFavClick = async (isFavorited: boolean, blogId: number) => {
    if (!isFavorited) {
      await api.delete(API_ENDPOINTS.FAVORITE + `/${blogId}`, {
        headers: { Authorization: `Bearer ${authState.authToken}` },
      });
      return;
    }
    await api.post(
      API_ENDPOINTS.FAVORITE + `/${blogId}`,
      {},
      {
        headers: { Authorization: `Bearer ${authState.authToken}` },
      }
    );
  };

  const handleDeleteClick = async (blogId: number) => {
    await api.delete(API_ENDPOINTS.PUBLISH_BLOG + `/${blogId}`, {
      headers: { Authorization: `Bearer ${authState.authToken}` },
    });
    loadBlogs();
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  useEffect(() => {
    if (!fromDate && !toDate) {
      setFilteredBlogs(blogs);
      return;
    }

    const from = fromDate ? new Date(fromDate).setUTCHours(0, 0, 0, 0) : null;

    const to = toDate ? new Date(toDate).setUTCHours(23, 59, 59, 999) : null;

    const filtered = blogs.filter((blog) => {
      const blogDate = new Date(blog.created_at ?? new Date()).getTime();

      if (from && blogDate < from) return false;
      if (to && blogDate > to) return false;
      return true;
    });

    setFilteredBlogs(filtered);
  }, [fromDate, toDate, blogs]);

  return (
    <div className={styles.homeScreenWrapper}>
      <div className={styles.createBlogButtonContainer}>
        <div className={styles.topBar}>
          <div className={styles.filterControls}>
            <div className={styles.datePickerContainer}>
              <label>From:</label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className={styles.dateInput}
              />
            </div>
            <div className={styles.datePickerContainer}>
              <label>To:</label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className={styles.dateInput}
                min={fromDate}
              />
            </div>
          </div>

          <button
            className={styles.createBlogButton}
            onClick={() => navigate("/blog")}
          >
            <div>{title}</div>
            <Plus size={24} />
          </button>
        </div>
      </div>

      <CardList
        blogs={filteredBlogs}
        onDeleteClick={handleDeleteClick}
        onFavClick={handleFavClick}
        onViewClick={(blog) =>
          navigate("/blog", { state: { ...blog, mode: "view" } })
        }
        onEditClick={(blog) => navigate("/blog", { state: { ...blog } })}
      />
      {filteredBlogs.length === 0 && (
        <div className={styles.emptyState}>
          <div className={styles.emptyStateImageDiv}>
            <img
              className={styles.emptyStateImage}
              src={emptyState}
              alt="login"
            />
          </div>
          <p className={styles.emptyStateText}>
            There is no blog available to show, Hey but you can create one! by
            clicking on the New Blog button.
          </p>
        </div>
      )}
    </div>
  );
};

export default BlogListScreen;
