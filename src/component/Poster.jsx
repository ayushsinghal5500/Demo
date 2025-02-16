import { useEffect, useState } from "react";
import { getPost, deletePost } from "../api/Post";
import FormFiled from "../component/FormFeild";

const Poster = () => {
  const [data, setData] = useState([]);
  const [updateDataApi, setUpdateDataApi] = useState({});
  
  // State to track expanded content
  const [expandedId, setExpandedId] = useState(null);

  // Fetch posts from the server
  const getPostData = async () => {
    try {
      const res = await getPost();
      setData(res.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    getPostData();
  }, []);

  // Handle delete action
  const handleDelete = async (id) => {
    try {
      await deletePost(id);
      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  // Handle Update action
  const handleUpdatePost = (curElem) => setUpdateDataApi(curElem);

  // Toggle the expanded state for the post body
  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <>
      <section className="section-form">
        <FormFiled
          data={data}
          setData={setData}
          updateDataApi={updateDataApi}
          setUpdateDataApi={setUpdateDataApi}
        />
      </section>

      <section>
        <div className="container mx-auto">
          <div className="row">
            {data.map((curElm) => {
              const { id, body, title } = curElm;
              const isExpanded = expandedId === id;
              const truncatedBody = body.length > 100 ? body.substring(0, 100) + "..." : body;
              const truncatedTitle = title.length > 30 ? title.substring(0, 30) + "..." : title;

              return (
                <div key={id} className="col-12 col-sm-6 col-md-4 mb-4">
                  <div className="card border p-4 rounded shadow-sm">
                    <h3 className="h5 font-weight-bold">{truncatedTitle}</h3>
                    <p className="mt-2">
                      {isExpanded ? body : truncatedBody}
                      {body.length > 100 && (
                        <button
                          className="btn btn-link"
                          onClick={() => toggleExpand(id)}
                        >
                          {isExpanded ? "See Less" : "See More"}
                        </button>
                      )}
                    </p>
                    <div className="d-flex justify-between mt-4">
                      <button
                        className="btn btn-primary btn-md button-gap"
                        onClick={() => handleUpdatePost(curElm)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-md button-gap"
                        onClick={() => handleDelete(id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Poster;
