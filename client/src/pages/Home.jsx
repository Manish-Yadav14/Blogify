import React, { useState, useEffect, useCallback } from "react";
import { SquarePlus, ChevronRight, Settings } from "lucide-react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Editor } from "@tinymce/tinymce-react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import debounce from "lodash/debounce";
import Profile from "../components/Profile";

function Home() {
  const [blogs, setBlogs] = useState({});
  const [activeBlogId, setActiveBlogId] = useState(null);
  const [profileClicked, setProfileClicked] = useState(false);

  const getBlogs = async () => {
    try {
      const token = localStorage.getItem('token');
      const tokenRes = await axios.post(`${import.meta.env.VITE_BACKEND}/auth/authenticate`, { token });
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND}/blogs/getBlogs`,
        { email: tokenRes?.data?.email }
      );
      // Prepare a temporary object for blogs
      const fetchedBlogs = {};
      if (data.length > 0) {
        data.forEach((blog) => {
          fetchedBlogs[blog.blogId] = {
            title: blog.title,
            content: blog.content,
          };
        });
      }
      setBlogs(fetchedBlogs); // Set all blogs at once

      if (data.length > 0) {
        setActiveBlogId(data[0].blogId); // Set the first blog as the active one
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleNewBlog = async () => {
    const token = localStorage.getItem('token');
    const tokenRes = await axios.post(`${import.meta.env.VITE_BACKEND}/auth/authenticate`, { token });
    const newBlogId = uuidv4();
    const res = await axios.post(`${import.meta.env.VITE_BACKEND}/blogs/updateBlog`, {
      email: tokenRes?.data?.email,
      blogId: newBlogId,
      title: "New Note",
      content: " ",
    });

    if (res.status === 200) {
      setBlogs({ ...blogs, [newBlogId]: { title: "New Note", content: " " } }); // Add new blog to state
      setActiveBlogId(newBlogId); // Set the new blog as active
      setProfileClicked(false);
    }
  };

  // Separate out debounced API call
  const debouncedSave = useCallback(
    debounce(async (content, blogId, title) => {
      const token = localStorage.getItem('token');
      const tokenRes = await axios.post(`${import.meta.env.VITE_BACKEND}/auth/authenticate`, { token });
      await axios.post(`${import.meta.env.VITE_BACKEND}/blogs/updateBlog`, {
        email: tokenRes?.data?.email,
        blogId,
        title,
        content,
      });
    }, 500),
    []
  );

  // Handle content changes in the editor
  const handleEditorChange = (content) => {
    const title = content.split("\n")[0] || blogs[activeBlogId].title;

    // Update editor state immediately
    setBlogs({ ...blogs, [activeBlogId]: { title, content } });

    // Debounce the save to the backend
    debouncedSave(content, activeBlogId, title);
  };

  // Switch between different blogs
  const switchBlog = (blogId) => {
    console.log(`Switching to blog ${blogId}`);
    setActiveBlogId(blogId); // Switch to the selected blog
    setProfileClicked(false)
  };

  const TrimmedTitle = (title) => {
    const startIndex = title.indexOf(">") + 1; // +1 to include '>'
    const trimmedFromStart =
      startIndex > 0 ? title.substring(startIndex) : title;

    // Trim from the end till the last occurrence of '<'
    const endIndex = trimmedFromStart.lastIndexOf("<"); // Get the last index of '<'
    const trimmedTitle =
      endIndex > -1
        ? trimmedFromStart.substring(0, endIndex)
        : trimmedFromStart;

    // Limit the title to 20 characters
    const displayTitle =
      trimmedTitle.length > 20
        ? trimmedTitle.substring(0, 20) + "..."
        : trimmedTitle;
    return displayTitle;
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <div className="flex">
      {/* Side Bar */}
      <aside className="w-1/5 h-[100vh] border border-r-black flex flex-col items-start justify-between">
        <div>
          {/* search bar */}
          <div className="max-w-xs min-w-[20px] m-2 p-1 flex">
            <div className="relative flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="absolute w-4 h-4 top-2 left-2.5 text-black"
              >
                <path
                  fillRule="evenodd"
                  d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                  clipRule="evenodd"
                />
              </svg>

              <input
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border-2 border-slate-200 rounded-md pl-8 pr-2 py-1 transition duration-300 ease focus:outline-none focus:border-indigo-600 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Search"
              />
            </div>

            <button onClick={handleNewBlog} className="m-1">
              <SquarePlus />
            </button>
          </div>

          {/* Drafts bar */}
          <Disclosure>
            <DisclosureButton className="m-2 p-2 my-4 flex justify-center items-center">
              {" "}
              <ChevronRight />
              <p className="font-bold">Your Blogs</p>
            </DisclosureButton>
            <DisclosurePanel className="">
              <div className="max-h-[300px] overscroll-y-auto overflow-y-auto">
                {Object.keys(blogs).map((blogId) => (
                  <div
                    key={blogId}
                    onClick={() => switchBlog(blogId)}
                    className={`text-gray-500 m-1 p-2 mx-8 cursor-pointer w-auto 
                    ${
                      activeBlogId === blogId
                        ? "border-2 border-l-blue-500"
                        : ""
                    }`}
                  >
                    {TrimmedTitle(blogs[blogId].title)}
                  </div>
                ))}
              </div>
            </DisclosurePanel>
          </Disclosure>
        </div>

        <button
          onClick={() => setProfileClicked(true)}
          className="m-2 p-2 flex justify-center items-center"
        >
          <Settings />
          <p className="p-2 text-lg font-bold">Settings</p>
        </button>
      </aside>

      {profileClicked ? (
        <Profile/>
      ) : (
        <div className="w-4/5 h-[100vh] flex flex-col">
          <div className="h-[50px] border border-b-black flex justify-end">
            <button className="bg-blue-600 text-white p-1 m-2 mr-6 rounded-md">
              Publish
            </button>
          </div>

          <Editor
            value={blogs[activeBlogId]?.content} // Controlled value to update the editor
            onEditorChange={handleEditorChange} // Handle content change
            apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
            init={{
              highlight_on_focus: false,
              menubar: false,
              height: "580",
              plugins: [
                // Core editing features
                "anchor",
                "autolink",
                "charmap",
                "codesample",
                "emoticons",
                "image",
                "link",
                "lists",
                "media",
                "searchreplace",
                "table",
                "visualblocks",
                "wordcount",
                // Your account includes a free trial of TinyMCE premium features
                // Try the most popular premium features until Oct 29, 2024:
                "checklist",
                "mediaembed",
                "casechange",
                "export",
                "formatpainter",
                "pageembed",
                "a11ychecker",
                "tinymcespellchecker",
                "permanentpen",
                "powerpaste",
                "advtable",
                "advcode",
                "editimage",
                "advtemplate",
                "mentions",
                "tinycomments",
                "tableofcontents",
                "footnotes",
                "mergetags",
                "autocorrect",
                "typography",
                "inlinecss",
                "markdown",
              ],
              toolbar:
                "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
              tinycomments_mode: "embedded",
              tinycomments_author: "Author name",
            }}
          />
        </div>
      )}
    </div>
  );
}

export default Home;
