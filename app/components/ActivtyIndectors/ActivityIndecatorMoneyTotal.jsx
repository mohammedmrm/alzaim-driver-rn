import React from "react";
import { Platform } from "react-native";
import LottieView from "lottie-react-native";
import Loading from "../../config/loadings";

const ActivityIndecator = (visable = false, style) => {
  const t = Loading.moneyTotal;
  if (!visable || Platform.OS == "web") {
    return null;
  } else {
    return (
      <LottieView
        style={{
          width: 80,
          alignSelf: "center",
        }}
        autoPlay
        loop
        source={t}
      />
    );
  }
};

export default ActivityIndecator;
