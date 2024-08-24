import React, { useEffect, useRef, useState } from "react";
import "./Magnifier.css";
import noImg from "../../assets/no-image.png";

interface MagnifierProps {
  imgSrc: string;
  zoom?: number;
}

const Magnifier: React.FC<MagnifierProps> = ({ imgSrc, zoom = 10 }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const glassRef = useRef<HTMLDivElement>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    e.currentTarget.src = noImg;
  };

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  useEffect(() => {
    const img = imgRef.current;
    const glass = glassRef.current;

    if (!isImageLoaded || !img || !glass) return;

    const magnify = (
      img: HTMLImageElement,
      glass: HTMLDivElement,
      zoom: number
    ) => {
      let w, h, bw;
      glass.style.backgroundImage = `url('${img.src}')`;
      glass.style.backgroundRepeat = "no-repeat";
      glass.style.backgroundSize = `${img.width * zoom}px ${
        img.height * zoom
      }px`;
      bw = 3;
      w = glass.offsetWidth / 2;
      h = glass.offsetHeight / 2;

      const moveMagnifier = (e: MouseEvent | TouchEvent) => {
        e.preventDefault();
        const pos = getCursorPos(e);
        let x = pos.x;
        let y = pos.y;
        if (x > img.width - w / zoom) {
          x = img.width - w / zoom;
        }
        if (x < w / zoom) {
          x = w / zoom;
        }
        if (y > img.height - h / zoom) {
          y = img.height - h / zoom;
        }
        if (y < h / zoom) {
          y = h / zoom;
        }
        glass.style.left = `${x - w}px`;
        glass.style.top = `${y - h}px`;
        glass.style.backgroundPosition = `-${x * zoom - w + bw}px -${
          y * zoom - h + bw
        }px`;
      };

      const getCursorPos = (e: MouseEvent | TouchEvent) => {
        let a,
          x = 0,
          y = 0;
        e = e || window.event;
        const event =
          (e as MouseEvent).pageX !== undefined
            ? (e as MouseEvent)
            : (e as TouchEvent).touches[0];
        a = img.getBoundingClientRect();
        x = event.pageX - a.left;
        y = event.pageY - a.top;
        x = x - window.pageXOffset;
        y = y - window.pageYOffset;
        return { x, y };
      };

      glass.addEventListener("mousemove", moveMagnifier);
      img.addEventListener("mousemove", moveMagnifier);
      glass.addEventListener("touchmove", moveMagnifier);
      img.addEventListener("touchmove", moveMagnifier);

      return () => {
        glass.removeEventListener("mousemove", moveMagnifier);
        img.removeEventListener("mousemove", moveMagnifier);
        glass.removeEventListener("touchmove", moveMagnifier);
        img.removeEventListener("touchmove", moveMagnifier);
      };
    };

    magnify(img, glass, zoom);
  }, [isImageLoaded, zoom]);

  return (
    <div className="img-magnifier-container h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
      <img
        ref={imgRef}
        src={imgSrc}
        onError={handleImageError}
        onLoad={handleImageLoad}
        alt="Magnifier"
        width="600"
        height="400"
        className="w-full h-full object-cover"
      />
      <div ref={glassRef} className="img-magnifier-glass"></div>
    </div>
  );
};

export default Magnifier;
