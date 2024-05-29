import React from "react";

const HeroImage = () => {
  const imagesArray = [
    <>
      <img className="front-page-image" src="https://climb-project-production.s3.us-east-2.amazonaws.com/IMG_1200.jpeg" alt="Rock climb SPAC V4"></img>
      <p className="hero-image-text">SPAC V4 - Great Barrington</p>
    </>,
    <> 
      <img className="front-page-image" src="https://climb-project-production.s3.us-east-2.amazonaws.com/IMG_0215.jpeg" alt="Rock climb The Roots V5"></img>
      <p className="hero-image-text">The Roots V5 - Smugglers Notch</p>
    </>,
    <> 
      <img className="front-page-image" src="https://climb-project-production.s3.us-east-2.amazonaws.com/IMG_0459.jpeg" alt="Rock climb Lynn Hill Traverse V8"></img>
      <p className="hero-image-text">Lynn Hill Traverse V8 - The Shawangunks</p>
    </>,
    <> 
      <img className="front-page-image" src="https://climb-project-production.s3.us-east-2.amazonaws.com/IMG_0407.jpeg" alt="Rock climb Waiting for the Messiah V7"></img>
      <p className="hero-image-text">Waiting for the Messiah V7 - The Shawangunks</p>
    </>,
    <> 
      <img className="front-page-image" src="https://climb-project-production.s3.us-east-2.amazonaws.com/IMG_0321.jpeg" alt="Rock climb Dragon Lady V4"></img>
      <p className="hero-image-text">Dragon Lady V4 - Stone Fort</p>
    </>,
    <>
       <img className="front-page-image" src="https://climb-project-production.s3.us-east-2.amazonaws.com/FB_IMG_1496783705378.jpeg" alt="Rock climb Filet of Finger V8"></img>
       <p className="hero-image-text">Filet of Finger V8 - Smugglers Notch</p>
    </>,
    <>
    <img className="front-page-image" src="https://climb-project-production.s3.us-east-2.amazonaws.com/IMG_3489.jpeg" alt="Rock climb Deception V7"></img>
    <p className="hero-image-text">Deception V7 - Stone Fort</p>
    </>
  ]

  const randomImageNumber = Math.floor(Math.random() * imagesArray.length)

    return (
      <div className="front-page-image-container">
        {imagesArray[randomImageNumber]}
      </div>
      
    )
}

export default HeroImage