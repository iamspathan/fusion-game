import { PluginContext } from "apyf";
import React, { useEffect, useState } from "react";

const fusionApiPlugin = (context: PluginContext) => {
  return {
    onload: () => {

      console.log("hello plugin loaded by sohail");
     
    },
    onunload: () => {
      console.log("hello plugin unloaded");
    },
  };
};

export default fusionApiPlugin;
