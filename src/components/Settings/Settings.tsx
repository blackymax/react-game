import React, { ReactElement, useRef } from "react";
import { SCALE_LARGE, SCALE_SMALL, SPEED_SLOW, SPEED_FAST } from "../../constants";

export const Settings = (props: any): ReactElement => {
  const musicSlider: any = useRef();
  const soundSlider: any = useRef();

  const scaleLarge = () => {
    props.handleSizeMode("large");
    props.handleScale(SCALE_LARGE);
  };

  const scaleSmall = () => {
    props.handleSizeMode("small");
    props.handleScale(SCALE_SMALL);
  };

  const setFast = () => {
    props.handleSpeedState("fast");
    props.handleSpeed(SPEED_FAST);
  };

  const setSlow = () => {
    props.handleSpeedState("slow");
    props.handleSpeed(SPEED_SLOW);
  };

  const musicVolumeUpdate = (e: any) => {
    props.handleMusicVolume(e.target.value);
    props.audio.volume = e.target.value;
  };

  const soundVolumeUpdate = (e: any) => {
    props.handleSoundVolume(e.target.value);
    props.sound.volume = e.target.value;
  };

  return (
    <div className={"settings-window"}>
      <h3>Settings</h3>
      <div className={"parameters"}>
        <button
          className={props.stateMus ? "music active" : "music"}
          onClick={props.stateMus ? props.musicPause : props.musicPlay}
        >
          Music
        </button>
        <button className={props.stateSnd ? "sound active" : "sound"} onClick={props.soundHandler}>
          Sounds
        </button>
        <label htmlFor={"music"}>Music volume</label>
        <input
          type={"range"}
          min={"0"}
          max={"1"}
          step={"0.1"}
          id={"music"}
          ref={musicSlider}
          onChange={musicVolumeUpdate}
          value={props.musicVolState}
        />
        <label htmlFor={"music"}>Sound volume</label>
        <input
          type={"range"}
          min={"0"}
          max={"1"}
          id={"sound"}
          step={"0.1"}
          ref={soundSlider}
          onChange={soundVolumeUpdate}
          value={props.soundVolState}
        />
      </div>
      <div className={"toggle-theme"}>
        <h3>Themes</h3>
        <button
          className={props.themeState === "dark" ? "dark-theme active" : "dark-theme"}
          onClick={props.themeDarkHandler}
        >
          dark
        </button>
        <button
          className={props.themeState === "light" ? "light-theme active" : "light-theme"}
          onClick={props.themeLightHandler}
        >
          light
        </button>
      </div>
      <div className={"field-settings"}>
        <h3>field size</h3>
        <button
          className={props.sizeState === "small" ? "field-size-small active" : "field-size-small"}
          onClick={scaleSmall}
        >
          small
        </button>
        <button
          className={props.sizeState === "large" ? "field-large-small active" : "field-size-large"}
          onClick={scaleLarge}
        >
          large
        </button>
        <h3>speed</h3>
        <button className={props.speedState === "slow" ? "slow-speed active" : "slow-speed"} onClick={setSlow}>
          slow
        </button>
        <button className={props.speedState === "fast" ? "fast-speed active" : "fast-speed"} onClick={setFast}>
          fast
        </button>
      </div>
    </div>
  );
};
