import { useEffect, useState } from "react";
import { addPost, updateData } from "../api/Post";
import PropTypes from "prop-types";
import Swal from "sweetalert2"; // Import SweetAlert2

const FormFiled = ({
  data,
  setData,
  updateDataApi,
  setUpdateDataApi,
  addNewPost,
}) => {
  const [addData, setAddData] = useState({
    title: "",
    body: "",
  });

  const isEmpty = Object.keys(updateDataApi).length === 0;

  useEffect(() => {
    updateDataApi &&
      setAddData({
        title: updateDataApi.title || "",
        body: updateDataApi.body || "",
      });
  }, [updateDataApi]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addPostData = async () => {
    if (!addData.title || !addData.body) {
      // Using SweetAlert2 for empty input fields
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Both Title and Post fields are required!",
      });
      return;
    }

    const res = await addPost(addData);
    if (res.status === 201) {
      setData([...data, res.data]);
      setAddData({ title: "", body: "" });

      // SweetAlert2 success message after adding a post
      Swal.fire({
        icon: "success",
        title: "Post Added",
        text: "Your post has been successfully added!",
      });
    }
  };

  const updatePostData = async () => {
    if (!addData.title || !addData.body) {
      // Using SweetAlert2 for empty input fields
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Both Title and Post fields are required!",
      });
      return;
    }

    try {
      const res = await updateData(updateDataApi.id, addData);
      if (res.status === 200) {
        setData((prev) =>
          prev.map((curElem) =>
            curElem.id === res.data.id ? res.data : curElem
          )
        );

        setAddData({ title: "", body: "" });
        setUpdateDataApi({});

        // SweetAlert2 success message after updating a post
        Swal.fire({
          icon: "success",
          title: "Post Updated",
          text: "Your post has been successfully updated!",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.value;
    if (action === "Add") {
      addPostData();
    } else if (action === "Edit") {
      updatePostData();
    }
  };

  return (
    <section className="container mt-5">
      <form onSubmit={handleFormSubmit} className="row">
        <div className="col-md-4 col-6 mb-3">
          <input
            type="text"
            autoComplete="off"
            id="title"
            name="title"
            placeholder="Add Title"
            className="form-control"
            value={addData.title}
            onChange={handleInputChange}
          />
        </div>

        <div className="col-md-4 col-6 col-lg-4 mb-3">
          <input
            type="text"
            autoComplete="off"
            placeholder="Add Post"
            id="body"
            name="body"
            className="form-control"
            value={addData.body}
            onChange={handleInputChange}
          />
        </div>

        <div className="col-md-2 col-4">
          <button
            type="submit"
            className="btn btn-primary w-100"
            value={isEmpty ? "Add" : "Edit"}
          >
            {isEmpty ? "Add" : "Edit"}
          </button>
        </div>
      </form>
    </section>
  );
};

FormFiled.propTypes = {
  data: PropTypes.array.isRequired,
  setData: PropTypes.func.isRequired,
  updateDataApi: PropTypes.object,
  setUpdateDataApi: PropTypes.func,
  addNewPost: PropTypes.func.isRequired,
};

export default FormFiled;
