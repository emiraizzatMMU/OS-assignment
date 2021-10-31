import { Fade } from "@mui/material";
import React, { Component } from "react";

const Loading = (props) => {
  const { open } = props;
  return (
    <Fade in={open} timeout={{ enter: 0, exit: 300 }}>
      <div className="loadingio-spinner-interwind-8guuv3h61wa">
        <div className="ldio-870l0h013gc">
          <div>
            <div>
              <div>
                <div></div>
              </div>
            </div>
            <div>
              <div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fade>
  );
};

export default Loading;
