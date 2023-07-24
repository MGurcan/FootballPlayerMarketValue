import React, { useState } from "react";
import './Eda.css'
import Navbar from "./Navbar";

const Eda = () => {
    const importAll = (r) => {
        return r.keys().map(r);
    };
    const images = importAll(require.context('../Project EDA Sprites', false, /\.(png)$/));

    const imageTitles = [
        "Age distribution",
        "Avg height-market value distribution",
        "Avg market value distribution",
        "Correlation of Attributes",
        "Footedness Distribution",
        "Height Distribution",
        "Played minutes - other distribution",
        "Num of players recorded",
        "Player valuations over time",
        "Position Distribution",
        "Position - market value Distribution",
        "Position - market value Distribution-2",
        "Subposition distribution"
    ]

    const [selectedImage, setSelectedImage] = useState(null);

    const handleClick = (image) => {
        setSelectedImage(image);
    };
    const handleOutsideClick = (e) => {

        if (e.target.tagName === "IMG") {
            e.stopPropagation();
            return;
        }

        setSelectedImage(null);
    };
    return (
        <>
            <Navbar />
            <div className="eda-container" onClick={handleOutsideClick}>
                {images.map((image, index) => {
                    const imageName = image.split('/').pop().replace(/\.\w+$/, ''); // Dosya adından resim adını al
                    return (
                        /*                         <div key={index} className="image-container">
                                                    <img src={image} alt={imageName} />
                                                    <div className="image-title">{imageTitles[index]}</div>
                                                </div> */
                        <div
                            key={index}
                            className={`image-container ${selectedImage === image ? "selected" : ""}`}
                            onClick={() => handleClick(image)}
                        >
                            <img src={image} alt={imageName} />
                            <div className="image-title">{imageTitles[index]}</div> {/* Başlık */}
                        </div>
                    );
                })}
            </div>
        </>
    )
}

export default Eda;