import React from "react";

// Function to get project images based on project ID
const getProjectImages = (projectId) => {
  const projectImages = {
    'awas-imsak': [
      {
        src: "image/awas-imsak-mockup.png",
        alt: "Awas Imsak! Website Preview"
      }
    ],
    'donasikita': [
      {
        src: "image/donasikita-mockup.png",
        alt: "DonasiKita Website Preview"
      }
    ],
    'capres-facts': [
      {
        src: "image/capresfacts-mockup.png",
        alt: "Capres Facts Website Preview"
      }
    ],
    'republik-rempah': [
      {
        src: "image/republik-rempah-mockup.png",
        alt: "Republik Rempah Website Preview"
      }
    ]
  };

  return projectImages[projectId] || [];
};

export default function ProjectImages({ projectId }) {
  const images = getProjectImages(projectId);

  if (images.length === 0) {
    return null;
  }

  return (
    <div className="w-full flex justify-center px-4">
      <div className="w-full md:w-3xl w-5xl">
        {images.map((image, index) => (
          <div key={index} className="mb-4 last:mb-0">
            <img
              src={image.src}
              alt={image.alt}
              className="w-full rounded-2xl object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}