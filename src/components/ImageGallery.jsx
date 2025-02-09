import React, { useState, useEffect } from "react";

// Fungsi untuk mendapatkan gambar berdasarkan id proyek
const getProjectImages = (projectId) => {
  // Mapping proyek ke array gambar
  const projectImages = {
    'awas-imsak': [
      {
        src: "image/awas-imsak-1.png",
        alt: "Awas Imsak! Website",
      },
      {
        src: "image/awas-imsak-2.png",
        alt: "Awas Imsak! Website",
      },
      {
        src: "image/awas-imsak-3.png",
        alt: "Awas Imsak! Website",
      },
    ],
    'donasikita': [
      {
        src: "image/donasikita-1.png",
        alt: "DonasiKita Website",
      },
      {
        src: "image/donasikita-2.png",
        alt: "DonasiKita Website",
      },
      {
        src: "image/donasikita-3.png",
        alt: "DonasiKita Website",
      },
    ],
    'capres-facts': [
      {
        src: "image/capres-facts-1.png",
        alt: "Capres Facts Website",
      },
      {
        src: "image/capres-facts-2.png",
        alt: "Capres Facts Website",
      },
    ],
    'republik-rempah': [
      {
        src: "image/republik-rempah-1.png",
        alt: "Republik Rempah Website",
      },
      {
        src: "image/republik-rempah-2.png",
        alt: "Republik Rempah Website",
      },
    ],
  };

  return projectImages[projectId] || [];
};

export default function ImageGallery({ projectId }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState(0); // -1 untuk prev, 1 untuk next
  
  const images = getProjectImages(projectId);

  const nextSlide = (e) => {
    if (isAnimating) return;
    e.stopPropagation();
    setDirection(1);
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = (e) => {
    if (isAnimating) return;
    e.stopPropagation();
    setDirection(-1);
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 500); // Sesuaikan dengan durasi animasi
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  if (images.length === 0) {
    return null; // Atau tampilkan placeholder
  }

  return (
    <>
      <div className="w-full flex justify-center px-4">
        <div className="w-full md:w-3xl w-5xl">
          <div
            className="relative overflow-hidden rounded-2xl cursor-pointer bg-white"
            onClick={() => setShowModal(true)}
          >
            <div className="w-full relative">
              <div className="relative overflow-hidden">
                <div
                  className={`flex transition-transform duration-500 ease-in-out transform ${
                    isAnimating
                      ? direction > 0
                        ? '-translate-x-full'
                        : 'translate-x-full'
                      : 'translate-x-0'
                  }`}
                >
                  <img
                    src={images[currentIndex].src}
                    alt={images[currentIndex].alt}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
                  aria-label="Previous image"
                >
                  ←
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
                  aria-label="Next image"
                >
                  →
                </button>
              </>
            )}

            {/* Indicators */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setDirection(index > currentIndex ? 1 : -1);
                      setIsAnimating(true);
                      setCurrentIndex(index);
                    }}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentIndex ? "bg-white" : "bg-white/50"
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative w-full h-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              className="text-white hover:text-gray-300 mb-4"
            >
              Close
            </button>
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={images[currentIndex].src}
                alt={images[currentIndex].alt}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}