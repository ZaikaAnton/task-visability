// import React from "react";
// import { useEffect } from "react";
// import { useDocumentVisibility } from "../../node_modules/anton-usedocumentvisibility/useDocumentVisibility1/useDocumentVisibility";
// import Example from "./Example";
// import SecondExample from "./SecondExample";

// const App: React.FC = () => {
//   const { count, visible, onVisibilityChange } = useDocumentVisibility();

//   useEffect(() => {
//     onVisibilityChange((isVisible) => {
//       console.log("first handler", isVisible);
//     });

//     const unsubscribeSecondHandler = onVisibilityChange((isVisible) => {
//       console.log("second handler", isVisible);
//     });

//     setTimeout(() => unsubscribeSecondHandler(), 5000); // отписываемся от 'second handler' через 5 секунд
//   }, [onVisibilityChange]);

//   return (
//     <>
//       <div>
//         <span>
//           Вы покинули страницу: {count} раз <br />
//           Вкладка активна? {visible ? "да" : "нет"}
//         </span>
//       </div>
//       <Example />
//       <SecondExample />
//     </>
//   );
// };

// export default App;
