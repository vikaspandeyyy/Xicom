import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { sub } from "date-fns/fp";

const Registration = () => {
  const [address, setAddress] = useState();
  const [street, setStreet] = useState();
  const [pOne, setPOne] = useState();
  const [pTwo, setPTwo] = useState();

  const validationSchema = Yup.object().shape({
    dob: Yup.date()
      .required()
      .max(sub({ years: 18 }, new Date()), "User must be over 18 years old"),
    email: Yup.string().email().required(),
    doctype: Yup.string().required(),
    firstname: Yup.string().required(),
    streetTwo: Yup.string().required(),
    streetOne: Yup.string().required(),
    lastName: Yup.string().required(),
    file: Yup.mixed()
      .required("File is required")
      .test("Filesize", "required ", (value) => {
        return value && value[2];
      }),
    select: Yup.string().required(),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm(formOptions);

  const onSubmit = (data) => console.log(data);

  const [inputList, setInputList] = useState([
    { fileName: "", select: "", doc: "" },
  ]);

  const handleAddClick = () => {
    setInputList([...inputList, { fileName: "", select: "", doc: "" }]);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  const handleDelete = (index) => {
    const list = [...inputList];
    // list.splice(index,1)
    // setInputList(list)
    let dt = list.filter((x, sindex) => index !== sindex);
    setInputList(dt);
  };

  const handleClick = (e) => {
    if (e.target.checked) {
      console.log("true");
      setPOne(address);
      setPTwo(street);
    } else {
      console.log("false");
      setPOne();
      setPTwo();
    }
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    setAddress(e.target.value);
  };

  const changeValue = (e) => {
    console.log(e.target.value);
    setStreet(e.target.value);
  };

  return (
    <div className="mt-5 container">
      <form className="container" onSubmit={handleSubmit(onSubmit)}>
        <div className="row container">
          <div className="col-md-6">
            <label for="" className="form-label">
              First Name <span style={{ color: "red" }}>*</span>
            </label>
            <input
              name="firstname"
              type="text"
              {...register("firstname")}
              className={`form-control ${errors.firstname ? "is-invalid" : ""}`}
            />
            <small className="invalid-feedback">
              {errors.firstname?.message}
            </small>
          </div>
          <div className="col-md-6">
            <label for="" className="form-label">
              Last Name <span style={{ color: "red" }}>*</span>
            </label>
            <input
              name="lastName"
              type="text"
              {...register("lastName")}
              className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
            />
            <small className="invalid-feedback">
              {errors.lastName?.message}
            </small>
          </div>
          <div className="col-md-6 mt-3">
            <label for="" className="form-label">
              Email <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="email"
              className="form-control"
              placeholder="ex: myname@example.com"
              name="email"
              {...register("email", { required: "Email Address is required" })}
            />
            {errors.email?.type === "required" && (
              <small style={{ color: "red" }}>email is required</small>
            )}
          </div>
          <div className="col-md-6 mt-3">
            <label for="" className="form-label">
              Date of Birth <span style={{ color: "red" }}>*</span>
            </label>
            <input
              name="dob"
              type="date"
              {...register("dob")}
              className={`form-control ${errors.dob ? "is-invalid" : ""}`}
            />
            <small className="invalid-feedback">{errors.dob?.message}</small>
          </div>
          <h5 className="mt-5">Residential Address</h5>
          <div className="col-md-6">
            <label for="" className="form-label">
              street 1 <span style={{ color: "red" }}>*</span>
            </label>
            <input
              name="streetOne"
              type="text"
              id="addOne"
              {...register("streetOne")}
              className={`form-control ${errors.streetOne ? "is-invalid" : ""}`}
              onChange={handleChange}
            />
            <small className="invalid-feedback">
              {errors.streetOne?.message}
            </small>
          </div>
          <div className="col-md-6">
            <label for="" className="form-label">
              street 2 <span style={{ color: "red" }}>*</span>
            </label>
            <input
              name="streetTwo"
              type="text"
              {...register("streetTwo")}
              className={`form-control ${errors.streetTwo ? "is-invalid" : ""}`}
              onChange={changeValue}
            />
            <small className="invalid-feedback">
              {errors.streetTwo?.message}
            </small>
          </div>

          <div className="form-check mt-4">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckChecked"
              onClick={handleClick}
            />
            <label className="form-check-label" for="flexCheckChecked">
              Same as Residential Address
            </label>
          </div>

          <h5 className="mt-5">Permanent Address</h5>
          <div className="col-md-6">
            <label for="" className="form-label">
              street 1
            </label>
            <input
              type="text"
              className="form-control"
              placeholder=""
              name="pAddone"
              value={pOne}
            />
          </div>
          <div className="col-md-6">
            <label for="" className="form-label">
              street 2
            </label>
            <input
              type="text"
              className="form-control"
              placeholder=""
              name="pAddtwo"
              value={pTwo}
            />
          </div>

          <h5 className="mt-5">Upload Documents</h5>
          {inputList.map((x, i) => {
            return (
              <div className="row">
                <div className="col-md-3 mt-3">
                  <label for="" className="form-label">
                    File Name <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    name="doctype"
                    type="text"
                    {...register("doctype")}
                    className={`form-control ${
                      errors.doctype ? "is-invalid" : ""
                    }`}
                  />
                  <small className="invalid-feedback">
                    {errors.doctype?.message}
                  </small>
                </div>
                <div className="col-md-4 mt-3">
                  <label for="" className="form-label">
                    Type of File <span style={{ color: "red" }}>*</span>
                  </label>
                  <select
                    name="select"
                    id=""
                    {...register("select")}
                    className={`form-control ${
                      errors.select ? "is-invalid" : ""
                    }`}
                  >
                    <option value="">-select</option>
                    <option value="pdf">pdf</option>
                    <option value="image">image</option>
                  </select>
                  <small className="invalid-feedback">
                    {errors.select?.message}
                  </small>
                </div>
                <div className="col-md-4 mt-3">
                  <label for="" className="form-label">
                    Upload Documents <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    name="file"
                    type="file"
                    {...register("file")}
                    className={`form-control ${
                      errors.file ? "is-invalid" : ""
                    }`}
                  />
                  <small className="invalid-feedback">
                    {errors.file?.message}
                  </small>
                </div>

                <div className="col-md-1 mt-5 d-flex">
                  <div>
                    {inputList.length - 1 === i && (
                      <button
                        type="button"
                        className="btn btn-dark"
                        onClick={handleAddClick}
                      >
                        +
                      </button>
                    )}
                  </div>
                  <div className="ml-3">
                    {inputList.length !== 1 && (
                      <button
                        type="button"
                        className="btn btn-dark"
                        onClick={() => handleDelete(i)}
                      >
                        -
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="d-flex justify-content-center mt-5">
          <button type="submit" className="btn btn-secondary btn-lg">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Registration;
