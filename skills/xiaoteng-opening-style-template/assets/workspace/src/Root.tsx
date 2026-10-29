import {Composition} from "remotion";
import {Opening} from "./Opening";
import {openingConfig} from "./openingConfig";

export const RemotionRoot = () => {
  return (
    <Composition
      id="Opening"
      component={Opening}
      durationInFrames={openingConfig.durationInFrames}
      fps={openingConfig.fps}
      width={1920}
      height={1080}
    />
  );
};
