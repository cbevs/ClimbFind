import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ImageUpdate = ({ changePane, userProfile, setUserProfile }) => {
  const [image, setImage] = useState({
    profileImage: {},
    profileImageURL: ""
  })
  const [errors, setErrors] = useState("")
  const allowedTypes = ['image/jpeg', "image/png"]
  let imagePreview
  let addEditButton
  let errorPane

  const submitProfilePhoto = async () => {
    const newPhotoBody = new FormData()
    newPhotoBody.append("profileImage", image.profileImage)
    try {
      document.body.classList.add("wait")
      const response = await fetch(`/api/v1/users/profile-image`, {
        method: "PATCH",
        headers: new Headers({ "Accept": "image/jpeg" }),
        body: newPhotoBody
      })
      if (!response.ok) {
        document.body.classList.remove("wait")
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const responseBody = await response.json()
      setUserProfile({
        ...userProfile, profileImage: responseBody.user.profileImage
      })
      URL.revokeObjectURL(image.profileImageURL)
      document.body.classList.remove("wait")
      changePane()
    } catch(error) {
      console.error(error)
    }
  }

  const handleProfileImageUpload = (acceptedImage) => {
    if(allowedTypes.includes(acceptedImage[0].type)){
      setImage({
        ...image,
        profileImage: acceptedImage[0],
        profileImageURL: URL.createObjectURL(acceptedImage[0])
      })
      setErrors("")
    } else {
      setImage({
        profileImage: "",
        profileImageURL: "",
      })
      setErrors(" Profile picture must be a JPG or PNG!")
    }
  }

  if (Object.keys(image.profileImage).length !== 0) {
    imagePreview = <div className="new-image-wrapper">
      <img src={image.profileImageURL} alt="profile image preview" className="image-preview"></img>
      <FontAwesomeIcon icon="fa-solid fa-floppy-disk" className="add-image-icon save-icon" onClick={submitProfilePhoto} /> 
      </div>
  }
  
  if (Object.keys(image.profileImage).length === 0) {
    addEditButton = <FontAwesomeIcon icon="fa-solid fa-plus" title="Upload image" className="add-image-icon" />
  } else {
    addEditButton = <FontAwesomeIcon icon="fa-solid fa-rotate-right" title="Choose different image" className="add-image-icon" />
  }

  if (Object.keys(errors).length !== 0) {
    addEditButton = <FontAwesomeIcon icon="fa-solid fa-rotate-right" title="Choose different image" className="add-image-icon" />
    errorPane = (
      <p className="image-errors">
        <FontAwesomeIcon icon="fa-solid fa-triangle-exclamation" />
        {errors}
      </p>
    )
  } else {
    errorPane = ""
  }


  return (
    <div className="modal-wrapper">
      <FontAwesomeIcon icon="fa-regular fa-circle-xmark" title="Close" className="modal-icon" onClick={changePane} />
      <div className="image-modal-div">
        <Dropzone onDrop={handleProfileImageUpload}>
          {({ getRootProps, getInputProps }) => (
            // <section className="update-image-dnd">
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                {addEditButton}
              </div>
            // </section>
          )}
        </Dropzone>
        {imagePreview}
        {errorPane}
      </div>
    </div>
  )
}

export default ImageUpdate