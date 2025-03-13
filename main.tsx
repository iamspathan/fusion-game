import { PluginContext } from "apyf";
import React, { useEffect, useState } from "react";

const fusionApiPlugin = (context: PluginContext) => {
  return {
    onload: () => {
      // const BirdGameWithContext = (props: any) => (
      //   <WordScramble {...props} pluginContext={context} />
      // );
      // const testPanel = {
      //   id: "test-panel",
      //   icon: "gamepad-2",
      //   title: "Test Panel",
      //   content: (
      //     <div className="p-2 space-y-2">
      //       <button
      //         onClick={() => {
      //           context.addTab("main", {
      //             id: "test-panel",
      //             title: "Test Panel",
      //             icon: null,
      //             props: {
      //               content: "coming soon",
      //             },
      //           });
      //         }}
      //         className="rounded bg-green-600 p-2"
      //       >
      //         Play game
      //       </button>
      //     </div>
      //   ),
      // };
      // context.registerSidebarTab("left", testPanel);
      // context.registerPanel("main", {
      //   id: "test-panel",
      //   icon: "heart",
      //   title: "👾 Minigame",
      //   content: WordScramble,
      // });
    },
    onunload: () => {
      console.log("hello plugin unloaded");
    },
  };
};

export default fusionApiPlugin;
