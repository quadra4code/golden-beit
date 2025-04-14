// import React from 'react';
// import { Triangle } from 'react-loader-spinner'
// import BarLoader from "react-spinners/BarLoader";
// const Loader = () => {
//   return (
//     <div className="opacity-div">
//       <BarLoader
//         visible={true}
//         // height="80"
//         // width="80"
//         color="#8a725d"
//         ariaLabel="triangle-loading"
//         wrapperStyle={{}}
//         wrapperClass=""
//       />
//     </div>
//   )
// }

// export default Loader
// import React from 'react';
// import loader from '../Images/loaderGif.gif';
// const Loader = () => {
//   return (
//     <div className="opacity-div ">
//       <img src={loader} alt="Loading..."/>
//     </div>
//   );
// };

// export default Loader;

import React from 'react';
import loader from '../Images/loaderGif.gif';
const Loader = () => {
  return (
    <>
      <div class="loaderViewportCover">
        <img src="images/favicon.png" alt="Loading Icon"/>
      </div>
      <div class="loader-wrapper">
        <svg>
          <text x="50%" y="50%" dy=".35em" text-anchor="middle">
            GoldenBeit
          </text>
        </svg>
      </div>
    </>
    // <div className="opacity-div ">
    //   <div class="loaderViewportCover">
    //     <img src="images/favicon.png" alt="Loading Icon"/>
    //   </div>
    //   <div class="loader-wrapper">
    //     <svg>
    //       <text x="50%" y="50%" dy=".35em" text-anchor="middle">
    //         GoldenBeit
    //       </text>
    //     </svg>
    //   </div>
    // </div>
  );
};

export default Loader;
