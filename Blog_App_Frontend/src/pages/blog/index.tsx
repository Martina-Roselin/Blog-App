import { use, useEffect, useState } from "react";
import styles from "./index.module.css";
import { api } from "../../configs/axios.config";
import { useAuth } from "../../context/auth/auth.context";
import { API_ENDPOINTS } from "../../constants/api.constants";
import { IBlog } from "../../types/app.type";
import { useLocation, useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../constants/route.constant";

const BlogScreen = () => {
  const { authState } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [image_url, setimage_url] = useState("");
  const [errors, setErrors] = useState<{ title?: string; description?: string; content?: string; image_url?: string }>({});
  const navigate = useNavigate()
  const location = useLocation();
  const { mode:viewMode, id: blogId, title: blogTitle, description: blogDescription, content: blogContent, image_url: blogImageUrl } = location.state || {};

  useEffect(() => {
    if (blogTitle && blogDescription && blogContent && blogImageUrl) {
      setTitle(blogTitle);
      setDescription(blogDescription);
      setContent(blogContent);
      setimage_url(blogImageUrl);
    }
  }, [blogTitle, blogDescription, blogContent, blogImageUrl])

  const handleSubmit = async () => {
    const newErrors: { title?: string; description?: string; content?: string; image_url?: string } = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (!content.trim()) newErrors.content = "Content is required";
    if (!image_url.trim()) newErrors.image_url = "Image URL is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear previous errors
    setErrors({});
    const blogData: IBlog = {
      title,
      description,
      content,
      image_url,
    };
    if (location.state) {
      const updateBlog = await api.put<IBlog, IBlog>(API_ENDPOINTS.PUBLISH_BLOG+"/"+blogId, blogData, {
        headers: {
          Authorization: `Bearer ${authState.authToken}`,
        }
      })
      navigate(APP_ROUTES.HOME)
      return
    }
    const publishBlog = await api.post<IBlog, IBlog>(API_ENDPOINTS.PUBLISH_BLOG, blogData, {
      headers: {
        Authorization: `Bearer ${authState.authToken}`,
      }
    })
    navigate(APP_ROUTES.HOME)
  };

  return (
    <div className={styles.blogWrapper}>
      <h1 className={styles.heading}>{viewMode != "view" ? (location.state ? "Make Changes to your Blog...." : "Write a New Blog") : "Viewing "+blogTitle}</h1>
      <div className={styles.form}>
        <div className={styles.inputGroup}>
          <label>Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter title" disabled={viewMode != "view" ? false : true}/>
          <div>{errors.title && <span className={styles.errorText}>{errors.title}</span>}</div>
        </div>
        <div className={styles.inputGroup}>
          <label>Description</label>
          <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Short description" disabled={viewMode != "view" ? false : true} />
          <div>{errors.description && <span className={styles.errorText}>{errors.description}</span>}</div>
        </div>
        <div className={styles.inputGroup}>
          <label>Content</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write your blog content..." rows={8} disabled={viewMode != "view" ? false : true} />
            <div>{errors.content && <span className={styles.errorText}>{errors.content}</span>}</div>
        </div>
        <div className={styles.inputGroup}>
          <label>Image URL</label>
          <input value={image_url} onChange={(e) => setimage_url(e.target.value)} placeholder="https://example.com/image.jpg" disabled={viewMode != "view" ? false : true} />
          <div>{errors.image_url && <span className={styles.errorText}>{errors.image_url}</span>}</div>
        </div>
        {viewMode != "view" && <button className={styles.submitButton} onClick={handleSubmit}>{location.state ? "Save Changes" : "Publish"}</button>}
      </div>
    </div>
  );
};

export default BlogScreen;
