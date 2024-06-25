import React from "react"

const getHeroImage = () => {
  const imagesArray = [
    {
      url: "https://climb-project-production.s3.us-east-2.amazonaws.com/HeroImages/spacv4.jpg",
      name: "SPAC V4 - Great Barrington",
    },
    {
      url: "https://climb-project-production.s3.us-east-2.amazonaws.com/HeroImages/rootsv5.jpg",
      name: "Roots V5 - Smugglers Notch",
    },
    {
      url: "https://climb-project-production.s3.us-east-2.amazonaws.com/HeroImages/lynnhilltraversev8.jpg",
      name: "Lynn Hill Traverse V8 - The Shawangunks",
    },
    {
      url: "https://climb-project-production.s3.us-east-2.amazonaws.com/HeroImages/moneyshotv7.jpg",
      name: "Money Shot V7 - McAfee's Knob",
    },
    {
      url: "https://climb-project-production.s3.us-east-2.amazonaws.com/HeroImages/naturalhighv0.jpg",
      name: "Natural High V0 - Hammond Pond",
    },
    {
      url: "https://climb-project-production.s3.us-east-2.amazonaws.com/HeroImages/hightidev4.jpg",
      name: "High Tide V4 - Nine Corner Lake",
    },
    {
      url: "https://climb-project-production.s3.us-east-2.amazonaws.com/HeroImages/dragonladyv4.jpg",
      name: "Dragon Lady V4 - Little Rock City",
    },
    {
      url: "https://climb-project-production.s3.us-east-2.amazonaws.com/HeroImages/thepearlv8.jpg",
      name: "The Pearl V7 - The Nears",
    },
    {
      url: "https://climb-project-production.s3.us-east-2.amazonaws.com/HeroImages/deceptionv8.jpg",
      name: "Deception V8 - Little Rock City",
    },
    {
      url: "https://climb-project-production.s3.us-east-2.amazonaws.com/HeroImages/thorazinev8.jpg",
      name: "Thorazine V8 - Nine Corner Lake",
    },
  ]

  const randomImageNumber = Math.floor(Math.random() * imagesArray.length)

  return imagesArray[randomImageNumber]
}

export default getHeroImage
