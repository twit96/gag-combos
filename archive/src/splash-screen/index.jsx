import React from "react";
import { trackColors, gagsData, Gag } from "~/features/gag";
import styles from "./index.module.css";


function parseJSON() {
  let tracks = Object.keys(trackColors);
  let thisTrack;
  let thisGag;

  let gagImages = [];
  tracks.forEach((track, j) => {
    thisTrack = gagsData[track];
    thisTrack.forEach((gag, k) => {
      thisGag = new Gag(track, k+1, false);
      gagImages.push({
        "name": thisGag.name,
        "src":  thisGag.image,
        "bg":   trackColors[thisGag.track]
      });
    })
  })
  return gagImages
}


function shuffle(array) {
  let curr_idx = array.length;
  let rand_idx;
  // while there are elements left to shuffle
  while (curr_idx !== 0) {
    // swap random remaining element with current element
    rand_idx = Math.floor(Math.random() * curr_idx);
    curr_idx--;
    [array[curr_idx], array[rand_idx]] = [array[rand_idx], array[curr_idx]];
  }
  return array;
}


function configureImages() {
  let gagImages = parseJSON();
  let copy = JSON.parse(JSON.stringify(gagImages));
  gagImages = gagImages.concat(copy).concat(copy).concat(copy).concat(copy).concat(copy).concat(copy);
  let shuffledImages = shuffle(gagImages);
  return shuffledImages;
}


/*
  NOTE: This is used to generate Homepage Splash Screen image, but is not used in the actual page.
  I wrote this code to make the image, then screenshotted it for use in the homepage.
*/
export default function Background() {
  const shuffledImages = configureImages();
  return (
    <div className={styles.imageGrid}>
      {
        shuffledImages.map((image, i) => {
          return (
            <div 
              key={i} 
              className={styles.imgWrap} 
              style={{background:image.bg}}
            >
              <img src={image.src} alt={image.name} />
            </div>
          )
        })
      }
    </div>
  );
}